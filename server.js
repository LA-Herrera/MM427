const express = require('express');
const {createClient} = require('@supabase/supabase-js');
const solver = require('javascript-lp-solver');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const supabase = createClient(process.env.DATABASE_LINK, process.env.DATABASE_KEY);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

const port = 2000;
app.use(cors())
app.use((req, res, next) => {
    req.db = supabase;
    next();
});

app.post('/solve-LP', async (req, res) => {
    const { data: A } = req.body;
    const constraints = {
        "calorias": { "min": A.cal_l, "max": A.cal_u },
        "grasas": { "min": A.grasa_l, "max": A.grasa_u },
        "proteina": { "min": A.protein_l, "max": A.protein_u },
        "carbohidratos": { "min": A.carbs_l, "max": A.carbs_u },
        "sodio": { "min": A.na_l, "max": A.na_u },
        "calcio": {"min": A.calc_l, "max": A.calc_u},
        "hierro": {"min": A.Fe_l, "max": A.Fe_u},
        "vitaminaA": {"min": A.vitA_l, "max": A.vitA_u},
        "vitaminaC": {"min": A.vitC_l, "max": A.vitC_u},
        "zinc": {"min": A.zin_l, "max": A.zin_u}
    };

    const variables = {};
    try {
        const { data: products, error } = await req.db
        .from('producto')
        .select(`prod_id,
            descripcion,
            calorias,
            grasas,
            carb_total,
            proteina,
            sodio,
            tamaño,
            "tamaño-por-porcion",
            precios!precios_prod_id_fkey (
            precio,
            tienda:t_id (
                nombre_empresa,
                ubicacion
                )
            ),
            "min-vit-producto"!min-vit-producto_prod_id_fkey (
                nut_id,
                porcentaje_VD
            )`);
        if (error || !products) throw new Error('Error obteniendo productos/precios');
        const { data: VD_data, error: VD_error } = await req.db
            .from('minerales-vitaminas')
            .select(`
                nombre,
                VD
            `);
        if (VD_error || !VD_data) throw new Error('Error obteniendo valores diarios de nutrientes');

        const VD_D = VD_data.reduce((acc, nutriente) => {
            acc[nutriente.nombre] = nutriente.VD;
            return acc;
        }, {});
        products.forEach((product) => {
            const nutrients = product['min-vit-producto'].reduce((acc, nutrient) => {
                const VD_B = VD_D[nutrient.nut_id] || 0;
                acc[nutrient.nut_id] = (nutrient.porcentaje_VD)*VD_B/product['tamaño-por-porcion'];
                return acc;
            }, {});

            product.precios.forEach((P) => {
                const store = P.tienda.nombre_empresa;
                const location = P.tienda.ubicacion;
                const price = P.precio;
        
                const varName = `${product.descripcion} || ${store},${location}`;
        
                variables[varName] = {
                    precio: price/product.tamaño,
                    calorias: product.calorias/product['tamaño-por-porcion'],
                    grasas: product.grasas/product['tamaño-por-porcion'],
                    proteina: product.proteina/product['tamaño-por-porcion'],
                    carbohidratos: product.carb_total/product['tamaño-por-porcion'],
                    sodio: product.sodio/product['tamaño-por-porcion'],
                    ...nutrients
                };
            });
        });
        const model = {
            "optimize": "precio",
            "opType": "min",
            "constraints": constraints,
            "variables": variables,
        };
        console.time('LPSolver Execution Time');
        const results = solver.Solve(model);
        console.timeEnd('LPSolver Execution Time');
        res.json(results);

    } catch (error) {
        console.error('Error obteniendo data o resolviendo el PL:', error);
        res.status(500).json({ error: 'Fallo al procesar data' });
    }
});

app.post('/result-info', async (req, res) => {
    try {
        const { data, error } = await req.db
            .from('producto')
            .select(`
                descripcion,
                tamaño,
                "tamaño-por-porcion",
                img,
                precios (
                precio,
                tienda:t_id (
                    nombre_empresa,
                    ubicacion
                    )
                )
            `)
            .eq('descripcion', req.body.product)
            .not('precios.tienda', 'is', null)
            .eq('precios.tienda.nombre_empresa', req.body.store)
            .eq('precios.tienda.ubicacion', req.body.location)
            .single();
        
        if (error || !data) {
            console.error(error);
            return null;
        }
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});