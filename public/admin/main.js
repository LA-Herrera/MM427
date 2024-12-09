const supabaseUrl = 'https://rtwehfexeigemezvmedn.supabase.co'; // URL de la instancia de Supabase
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0d2VoZmV4ZWlnZW1lenZtZWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3NDk2MjUsImV4cCI6MjA0NDMyNTYyNX0.cYVaj4XqJosq26QgKMgpfdgdLebfqSucAavljElxOb4';  // API Key
const supabase = window.supabase.createClient(supabaseUrl, apiKey);
let Y = 'P';
let X = true;
let Z = [
    document.getElementById("item-list"),
    document.getElementById("P"),
    document.getElementById("T"),
    document.getElementById("PR"),
    document.getElementById("F"),
    document.getElementById('u_popup'),
    document.getElementById('MV'),
    document.getElementById('PA')
];
Z[1].addEventListener('click', () => {if(Y !== 'P'){Y = 'P'; fetchData(Y);}})
Z[2].addEventListener('click', () => {if(Y !== 'T'){Y = 'T'; fetchData(Y);}})
Z[3].addEventListener('click', () => {if(Y !== 'PR'){Y = 'PR'; fetchData(Y);}})
Z[6].addEventListener('click', () => {if(Y !== 'MV'){Y = 'MV'; fetchData(Y);}})
Z[7].addEventListener('click', () => {if(Y !== 'PA'){Y = 'PA'; fetchData(Y);}})

const warning = document.getElementById('warn');
const warning_msg = document.getElementById('warn_msg');

let A;

async function fetchData(Y) {
        try {
            let from;
            let select;
            let order;
            if(Y === 'P'){
                from = 'producto';
                select = 'prod_id, descripcion';
                order = 'prod_id';
            }else if(Y === 'T'){
                from = 'tienda';
                select = 't_id, nombre_empresa, ubicacion';
                order = 't_id';
            }else if(Y === 'MV'){
                from = 'minerales-vitaminas';
                select = 'nombre, VD';
                order = 'nombre';
            }else if(Y === 'PA'){
                from = 'min-vit-producto';
                select = 'prod_id, producto: prod_id(descripcion), nut_id, porcentaje_VD';
                order = 'prod_id';
            }else{
                from = 'precios';
                select = 'precio, producto: prod_id(descripcion), prod_id, tienda: t_id(nombre_empresa, ubicacion), t_id';
                order = 'prod_id';
            }
            const {data, error} = await supabase
                .from(from)
                .select(select)
                .order(order, { ascending: true});
    
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                if(Y === 'P'){
                    generateProducts(data);
                }else if(Y === 'T'){
                    generateStores(data);
                }else if(Y === 'MV'){
                    generateNutrients(data);
                }else if(Y === 'PA'){
                    generatePercNutrientperProduct(data);
                }else{
                    generatePrices(data);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
}
fetchData(Y);

function generateProducts(x){
    Z[0].innerHTML = '';
    let a = document.createElement('tr');
    Z[0].appendChild(a);
    let b = document.createElement('th');
    let c = document.createElement('th');
    let d = document.createElement('th');
    b.innerHTML = "ID";
    c.innerHTML = "Descripción";
    d.innerHTML = '<button id="add" onclick="generateAddForm()"><i class="bi bi-file-earmark-plus"></i></button>';
    d.className = 'btns2';
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
    for (let i = 0; i < x.length; i++) {
        let a = document.createElement('tr');
        a.setAttribute('id', x[i].prod_id);
        Z[0].appendChild(a);
        let b = document.createElement('td');
        let c = document.createElement('td');
        let d = document.createElement('td');
        d.className = 'btns';
        b.innerHTML = x[i].prod_id;
        c.innerHTML = x[i].descripcion;
        d.innerHTML = '<button class="del_b"><i class="bi bi-file-earmark-minus del_i"></i></button><button class="up_b"><i class="bi bi-arrow-repeat up_i"></i></button>';
        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(d);
    }
}
function generateStores(x){
    Z[0].innerHTML = '';
    let a = document.createElement('tr');
    Z[0].appendChild(a);
    let b = document.createElement('th');
    let c = document.createElement('th');
    let d = document.createElement('th');
    let e = document.createElement('th');
    b.innerHTML = 'ID';
    c.innerHTML = 'Nombre';
    d.innerHTML = 'Ubicación';
    e.innerHTML = '<button id="add" onclick="generateAddForm()"><i class="bi bi-file-earmark-plus"></i></button>';
    e.className = 'btns2';
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
    a.appendChild(e);
    for(let i = 0; i < x.length; i++){
        let a = document.createElement('tr');
        a.setAttribute('id', x[i].t_id);
        Z[0].appendChild(a);
        let b = document.createElement('td');
        let c = document.createElement('td');
        let d = document.createElement('td');
        let e = document.createElement('td');
        e.className = 'btns';
        b.innerHTML = x[i].t_id;
        c.innerHTML = x[i].nombre_empresa;
        d.innerHTML = x[i].ubicacion;
        e.innerHTML = '<button class="del_b"><i class="bi bi-file-earmark-minus del_i"></i></button><button class="up_b"><i class="bi bi-arrow-repeat up_i"></i></button>';
        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(d);
        a.appendChild(e);
    }
}
function generatePrices(x){
    Z[0].innerHTML = '';
    let a = document.createElement('tr');
    Z[0].appendChild(a);
    let b = document.createElement('th');
    let c = document.createElement('th');
    let d = document.createElement('th');
    let h = document.createElement('th');
    let e = document.createElement('th');
    b.innerHTML = "Producto";
    c.innerHTML = "Empresa";
    h.innerHTML = "Ubicacion";
    d.innerHTML = "Precio";
    e.innerHTML = '<button id="add" onclick="generateAddForm()"><i class="bi bi-file-earmark-plus"></i></button>';
    e.className = 'btns2';
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(h);
    a.appendChild(d);
    a.appendChild(e);
    for (let i = 0; i < x.length; i++) {
        let a = document.createElement('tr');
        Z[0].appendChild(a);
        let b = document.createElement('td');
        let c = document.createElement('td');
        let h = document.createElement('td');
        let d = document.createElement('td');
        let e = document.createElement('td');
        e.className = 'btns';
        b.innerHTML = x[i].producto.descripcion;
        b.setAttribute('id', x[i].prod_id)
        c.innerHTML = x[i].tienda.nombre_empresa;
        c.setAttribute('id', x[i].t_id)
        h.innerHTML = x[i].tienda.ubicacion;
        d.innerHTML = x[i].precio;
        e.innerHTML = '<button class="del_b"><i class="bi bi-file-earmark-minus del_i"></i></button><button class="up_b"><i class="bi bi-arrow-repeat up_i"></i></button>';
        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(h);
        a.appendChild(d);
        a.appendChild(e);
    }
}
function generateNutrients(x){
    Z[0].innerHTML = '';
    let a = document.createElement('tr');
    Z[0].appendChild(a);
    let b = document.createElement('th');
    let c = document.createElement('th');
    let d = document.createElement('th');
    b.innerHTML = "Nutriente";
    c.innerHTML = "Valor Diario";
    d.innerHTML = '<button id="add" onclick="generateAddForm()"><i class="bi bi-file-earmark-plus"></i></button>';
    d.className = 'btns2';
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
    for (let i = 0; i < x.length; i++) {
        let a = document.createElement('tr');
        a.setAttribute('id', x[i].nombre);
        Z[0].appendChild(a);
        let b = document.createElement('td');
        let c = document.createElement('td');
        let d = document.createElement('td');
        d.className = 'btns';
        b.innerHTML = x[i].nombre;
        c.innerHTML = x[i].VD;
        d.innerHTML = '<button class="del_b"><i class="bi bi-file-earmark-minus del_i"></i></button><button class="up_b"><i class="bi bi-arrow-repeat up_i"></i></button>';
        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(d);
    }
}
function generatePercNutrientperProduct(x){
    Z[0].innerHTML = '';
    let a = document.createElement('tr');
    Z[0].appendChild(a);
    let b = document.createElement('th');
    let c = document.createElement('th');
    let d = document.createElement('th');
    let e = document.createElement('th');
    b.innerHTML = "Producto";
    c.innerHTML = "Micronutriente";
    d.innerHTML = "Porcentaje del VD";
    e.innerHTML = '<button id="add" onclick="generateAddForm()"><i class="bi bi-file-earmark-plus"></i></button>';
    e.className = 'btns2';
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
    a.appendChild(e);
    for (let i = 0; i < x.length; i++) {
        let a = document.createElement('tr');
        Z[0].appendChild(a);
        let b = document.createElement('td');
        let c = document.createElement('td');
        let d = document.createElement('td');
        let e = document.createElement('td');
        e.className = 'btns';
        b.innerHTML = x[i].producto.descripcion;
        b.setAttribute('id', x[i].prod_id)
        c.innerHTML = x[i].nut_id;
        c.setAttribute('id', x[i].nut_id)
        d.innerHTML = x[i].porcentaje_VD;
        e.innerHTML = '<button class="del_b"><i class="bi bi-file-earmark-minus del_i"></i></button><button class="up_b"><i class="bi bi-arrow-repeat up_i"></i></button>';
        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(d);
        a.appendChild(e);
    }  
}

function generateAddForm(){
    if(Y === 'P'){
        Z[4].innerHTML = `<button class="add_cbtn" onclick="ClosePopup()">X</button>
                    <h2 style="text-align: center;">Agregar Producto</h2>
                    <form class="add_f">
                        <div>
                            <label for="descripcion">Descripción:</label>
                            <input type="text" id="descripcion" name="descripcion" style="width: 100%; max-width: 100%;" placeholder="Descripción del producto" required>
                        </div>
                        <div class="add_fi2">
                            <div style="grid-column: 1;" class="add_find">
                                <label for="img">Imagen:</label>
                                <input type="url" id="img" name="img" placeholder="url de la imagen" required>
                            </div>
                            <div style="grid-column: 2;" class="add_find">
                                <label for="tamaño">Tamaño:</label>
                                <input  type="number" step="0.000001" id="tamaño" name="tamaño" placeholder="Tamaño por Producto" min="0" required>
                            </div>
                            <div style="grid-column: 3;" class="add_find">
                                <label for="tamaño_por_porcion">Tamaño por Porción:</label>
                                <input  type="number" step="0.000001" id="tamaño_por_porcion" name="tamaño_por_porcion" placeholder="Tamaño por Porcion" min="0" required>
                            </div>
                            </div>
                        <div class="add_fi2">
                            <div style="grid-column: 1;" class="add_find">
                                <label for="calorias">Calorias:</label>
                                <input type="number" step="0.001" id="calorias" name="calorias" placeholder="Calorias(kcal) por Porción" min="0" required>
                            </div>
                            <div style="grid-column: 2;" class="add_find">
                                <label for="grasas">Grasas:</label>
                                <input type="number" step="0.001" id="grasas" name="grasas" placeholder="Grasas(g) por Porción" min="0" required>
                            </div>
                            <div style="grid-column: 3;" class="add_find">
                                <label for="carb_total">Carbohidratos:</label>
                                <input type="number" step="0.001" id="carb_total" name="carb_total" placeholder="Carbohidratos(g) por Porción" min="0" required> 
                            </div>
                            </div>
                        <div class="add_fi2">
                            <div style="grid-column: 1;" class="add_find">
                                <label for="proteina">Proteina:</label>
                                <input type="number" step="0.001" id="proteina" name="proteina" placeholder="Proteina(g) por Porción" min="0" required>
                            </div>
                            <div style="grid-column: 2;" class="add_find">
                                <label for="sodio">Sodio:</label>
                                <input type="number" step="0.00001" id="sodio" name="sodio" placeholder="Sodio(g) por Porción" min="0">
                            </div>
                        </div>
                        <button type="submit" class="add_btn" onclick="AddItem()">Agregar</button>
                    </form>`;
    }else if(Y === 'T'){
        Z[4].innerHTML = `<button class="add_cbtn" onclick="ClosePopup()">X</button>
                    <h2 style="text-align: center;">Agregar Tienda</h2>
                    <form class="add_f">
                        <div>
                            <label for="nombre_empresa">Empresa:</label>
                            <input type="text" id="nombre_empresa" name="nombre_empresa" placeholder="Nombre de la Empresa" required>
                        </div>
                        <div>
                            <label for="ubicacion">Ubicación:</label>
                            <input type="text" id="ubicacion" name="ubicacion" placeholder="Ubicación del Local" required>
                        </div>
                        <button type="submit" class="add_btn" onclick="AddItem()">Agregar</button>
                    </form>`;
    }else if(Y === 'MV'){
        Z[4].innerHTML = `<button class="add_cbtn" onclick="ClosePopup()">X</button>
                    <h2 style="text-align: center;">Agregar Micronutriente</h2>
                    <form class="add_f">
                        <div>
                            <label for="min_vit">Mineral o Vitamina:</label>
                            <input type="text" id="min_vit" name="min_vit" placeholder="Mineral/Vitamina" required>
                        </div>
                        <div>
                            <label for="VD">Valor Diario (g):</label>
                            <input type="number" step="0.000000000001" id="VD" name="VD" placeholder="Valor Diario" min="0" required>
                        </div>
                        <button type="submit" class="add_btn" onclick="AddItem()">Agregar</button>
                    </form>`
    }else if(Y === 'PA'){
        Z[4].innerHTML = `<button class="add_cbtn" onclick="ClosePopup()">X</button>
                    <h2 style="text-align: center;">Agregar Micronutriente</h2>
                    <form class="add_f">
                        <div>
                            <label for="producto">Producto:</label>
                                <select id="s_prod" required>
                                    <option value="">Escoja un Producto</option>
                                </select>
                        </div>
                        <div>
                            <label for="micronutriente">Micronutriente:</label>
                                <select id="s_n" required>
                                    <option value="">Escoja un Nutriente</option>
                                </select>
                        </div>
                        <div>
                            <label for="VD">VD:</label>
                            <input type="number" id="VD" name="VD" step="0.00001" placeholder="% del Valor Diario(en decimales)" min="0" required>
                        <div>
                        <button type="submit" class="add_btn" onclick="AddItem()">Agregar</button>
                    </form>`;
        DropdownProductos();
        DropdownNutrientes();
    }else{
        Z[4].innerHTML = `<button class="add_cbtn" onclick="ClosePopup()">X</button>
                    <h2 style="text-align: center;">Agregar Precio</h2>
                    <form class="add_f">
                        <div>
                            <label for="producto">Producto:</label>
                                <select id="s_prod" required>
                                    <option value="">Escoja un Producto</option>
                                </select>
                        </div>
                        <div>
                            <label for="tienda">Tienda:</label>
                                <select id="s_t" required>
                                    <option value="">Escoja una Tienda</option>
                                </select>
                        </div>
                        <div>
                            <label for="precio">Precio:</label>
                            <input type="number" id="precio" name="precio" step="0.01" placeholder="Precio del Producto" min="0" required>
                        </div>
                        <button type="submit" class="add_btn" onclick="AddItem()">Agregar</button>
                    </form>`;
DropdownProductos();
DropdownTiendas();
    }
    document.getElementById('popup').style.display = 'flex';
};

//Agregar_old
Z[4].addEventListener('submit', async function (event) {
    console.log('call')
    event.preventDefault();
});

//Agregar
function AddItem(){
    if(Y === 'P'){
        AddProduct();
    }else if(Y === 'T'){
        AddStore();
    }else if(Y === 'MV'){
        AddNutrient();
    }else if(Y === 'PA'){
        AddNutrientperProduct();
    }else{
        AddPrice();
    }
}

Z[0].addEventListener('click', async function (event) {
    //Eliminar
    if (event.target.classList.contains('del_i')){
        if(Y === 'P'){
            const row = event.target.closest('tr');  // Obtener la fila donde esta
            const Prod_id = row.getAttribute('id');  // Obtener la id
            const nombre_prod = row.querySelectorAll('td')[1].textContent;  //Obtener la descripcion
            
            document.getElementById('d_popup').style.display = 'flex';
            document.getElementById('del_msg').textContent = `¿Desea eliminar el producto ${nombre_prod}?`;
            
            const confirmed = await waitClick1();
            if (confirmed) {
                try {
                    const { data, error } = await supabase
                        .from('producto')
                        .delete()
                        .eq('prod_id', Prod_id);
                
                    if (error) {
                        console.error('Error eliminando el producto:', error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error eliminando el producto. Por favor, inténtelo de nuevo.';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        row.remove();
                        console.log("Producto Eliminado:", data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrió un error al eliminar el producto.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }            
            }
        } else if(Y === 'T'){
            const row = event.target.closest('tr');
            const T_id = row.getAttribute('id');
            const nombre_empresa = row.querySelectorAll('td')[1].textContent;
            const ubicacion = row.querySelectorAll('td')[2].textContent;

            document.getElementById('d_popup').style.display = 'flex';
            document.getElementById('del_msg').textContent = `¿Desea eliminar la tienda ${nombre_empresa} encontrada en ${ubicacion}?`;

            const confirmed = await waitClick1();
            if (confirmed) {
                try {
                    const { data, error } = await supabase
                        .from('tienda')
                        .delete()
                        .eq('t_id', T_id);
                
                    if (error) {
                        console.error('Error eliminando la tienda:', error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error eliminando la tienda. Por favor, inténtelo de nuevo.';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        row.remove();
                        console.log("Tienda Eliminada:", data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrió un error al eliminar la tienda.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }
        }else if(Y === 'MV'){
            const row = event.target.closest('tr');
            const nombre = row.getAttribute('id');
            const nombre_nutriente = row.querySelectorAll('td')[0].textContent;

            document.getElementById('d_popup').style.display = 'flex';
            document.getElementById('del_msg').textContent = `¿Desea eliminar el micronutriente ${nombre_nutriente}?`;

            const confirmed = await waitClick1();
            if (confirmed) {
                try {
                    const { data, error } = await supabase
                        .from('minerales-vitaminas')
                        .delete()
                        .eq('nombre', nombre);
                
                    if (error) {
                        console.error('Error eliminando la nutriente:', error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error eliminando el nutriente. Por favor, inténtelo de nuevo.';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        row.remove();
                        console.log("Nutriente Eliminado:", data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrió un error al eliminar el nutriente.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }
        } else if(Y === 'PA'){
            const row = event.target.closest('tr');
            const Prod_id = row.querySelectorAll('td')[0].getAttribute('id');
            const Nut_id = row.querySelectorAll('td')[1].getAttribute('id');
            const producto = row.querySelectorAll('td')[0].textContent;
            const nutriente = row.querySelectorAll('td')[1].textContent;

            document.getElementById('d_popup').style.display = 'flex';
            document.getElementById('del_msg').textContent = `¿Desea eliminar el nutriente ${nutriente} del producto ${producto}?`;
            
            const confirmed = await waitClick1();
            if (confirmed) {
                try {
                    const { data, error } = await supabase
                        .from('min-vit-producto')
                        .delete()
                        .eq('nut_id', Nut_id)
                        .eq('prod_id', Prod_id);
                
                    if (error) {
                        console.error(error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error eliminando. Por favor, inténtelo de nuevo.';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        row.remove();
                        console.log(":", data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrió un error al eliminar.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }
        } else {
            const row = event.target.closest('tr');
            const Prod_id = row.querySelectorAll('td')[0].getAttribute('id');
            const T_id = row.querySelectorAll('td')[1].getAttribute('id');
            const producto = row.querySelectorAll('td')[0].textContent;
            const nombre_empresa = row.querySelectorAll('td')[1].textContent;
            const ubicacion = row.querySelectorAll('td')[2].textContent;

            document.getElementById('d_popup').style.display = 'flex';
            document.getElementById('del_msg').textContent = `¿Desea eliminar el producto ${producto} de la tienda ${nombre_empresa} localizada en ${ubicacion}?`;
            
            const confirmed = await waitClick1();
            if (confirmed) {
                try {
                    const { data, error } = await supabase
                        .from('precios')
                        .delete()
                        .eq('prod_id', Prod_id)
                        .eq('t_id', T_id);
                
                    if (error) {
                        console.error('Error eliminando:', error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error eliminando. Por favor, inténtelo de nuevo.';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        row.remove();
                        console.log("Precio Eliminado:", data);
                    }
                } catch (error) {
                    console.error(error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Error al intentar eliminar el precio.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }
        }
    }
    //Actualizar
    if(event.target.classList.contains('up_i')){
        if(Y === 'P'){
            const row = event.target.closest('tr');  // Obtener la fila donde esta
            const Prod_id = row.getAttribute('id');  // Obtener la id
            
            document.getElementById('F-U').innerHTML = `<button class="add_cbtn" id="t1">X</button>
                <h2 style="text-align: center;">Actualizar Producto</h2>
                <form class="add_f">
                    <div class="add_fi2">
                        <div style="grid-column: 1;" class="add_find">
                            <label for="u_img">Imagen:</label>
                            <input type="url" id="u_img" name="u_img" placeholder="url de la imagen">
                        </div>
                        <div style="grid-column: 2;" class="add_find">
                            <label for="u_tamaño_por_porcion">Tamaño por Porción:</label>
                            <input  type="number" step="0.000001" id="u_tamaño_por_porcion" name="u_tamaño_por_porcion" placeholder="Tamaño por Porció">
                        </div>
                        <div style="grid-column: 3;" class="add_find">
                            <label for="u_calorias">Calorias:</label>
                            <input type="number" step="0.001" id="u_calorias" name="u_calorias" placeholder="Calorias(kcal) por Porción">
                        </div>
                    </div>
                    <div class="add_fi2">
                        <div style="grid-column: 1;" class="add_find">
                            <label for="u_grasas">Grasas:</label>
                            <input type="number" step="0.001" id="u_grasas" name="u_grasas" placeholder="Grasas(g) por Porción">
                        </div>
                        <div style="grid-column: 2;" class="add_find">
                            <label for="u_carb_total">Carbohidratos:</label>
                            <input type="number" step="0.001" id="u_carb_total" name="u_carb_total" placeholder="Carbohidratos(g) por Porción"> 
                        </div>
                        <div style="grid-column: 3;" class="add_find">
                            <label for="u_proteina">Proteina:</label>
                            <input type="number" step="0.001" id="u_proteina" name="u_proteina" placeholder="Proteina(g) por Porción">
                        </div>
                    </div>
                    <div class="add_fi2">
                        <div style="grid-column: 1;" class="add_find">
                            <label for="u_sodio">Sodio:</label>
                            <input type="number" step="0.0000000001" id="u_sodio" name="u_sodio" placeholder="Sodio(g) por Porción">
                        </div>
                    </div>
                    <button type="submit" class="up_btn" id="upd">Actualizar</button>
                </form>`;
            
            const {data: data1, error: error1} = await supabase
                .from('producto')
                .select('img, sodio, proteina, carb_total, grasas, calorias, tamaño, tamaño-por-porcion')
                .eq('prod_id', Prod_id);
            if(error1){console.error(error1)}
            document.getElementById('u_img').value = data1[0].img;
            document.getElementById('u_tamaño_por_porcion').value = data1[0]['tamaño-por-porcion'];
            document.getElementById('u_calorias').value = data1[0].tamaño;
            document.getElementById('u_grasas').value = data1[0].grasas;
            document.getElementById('u_carb_total').value = data1[0].carb_total;
            document.getElementById('u_proteina').value = data1[0].proteina;
            document.getElementById('u_sodio').value = data1[0].sodio;
            
            document.getElementById('u_popup').style.display = 'flex';
            
            const confirmed = await waitClick2();
            if(confirmed){
                const img = document.getElementById('u_img').value;
                const tamaño_por_porcion = document.getElementById('u_tamaño_por_porcion').value;
                const calorias = document.getElementById('u_calorias').value;
                const grasas = document.getElementById('u_grasas').value;
                const carb_total = document.getElementById('u_carb_total').value;
                const proteina = document.getElementById('u_proteina').value;
                const sodio = document.getElementById('u_sodio').value;
    
                const u_prod = { }; //Solo toma en cuenta los datos no vacios
                if (tamaño_por_porcion) u_prod["tamaño-por-porcion"] = parseFloat(tamaño_por_porcion);
                if (calorias) u_prod.calorias = parseFloat(calorias);
                if (grasas) u_prod.grasas = parseFloat(grasas);
                if (carb_total) u_prod.carb_total = parseFloat(carb_total);
                if (proteina) u_prod.proteina = parseFloat(proteina);
                if (sodio) u_prod.sodio = parseFloat(sodio);
                if (img) u_prod.img = img;
    
                if (Object.keys(u_prod).length === 0) {
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'No se han llenado los campos.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                    return;
                }
    
                try {
                    const { data, error } = await supabase
                        .from('producto')
                        .update(u_prod)
                        .eq('prod_id', Prod_id);
                
                    if (error) {
                        console.error(error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error actualizando el producto. Intente denuevo';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        console.log('Producto Actualizado:', data);
                        fetchData('P');  // Refrescar los datos
                    }
                } catch (error) {
                    console.error(error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrio un error';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }  
        } else if(Y === 'T'){
            const row = event.target.closest('tr');
            const T_id = row.getAttribute('id');

            document.getElementById('F-U').innerHTML = `<button class="add_cbtn" id="t1">X</button>
                <h2 style="text-align: center;">Actualizar Tienda</h2>
                <form class="add_f">
                    <div>
                        <label for="nombre_empresa">Empresa:</label>
                        <input type="text" id="u_nombre_empresa" name="nombre_empresa" placeholder="Nombre de la Empresa" required>
                    </div>
                    <div>
                        <label for="ubicacion">Ubicación:</label>
                        <input type="text" id="u_ubicacion" name="ubicacion" placeholder="Ubicación del Local" required>
                    </div>
                    <button type="submit" class="up_btn" id="upd">Actualizar</button>
                </form>`;
            document.getElementById('u_popup').style.display = 'flex';

            const confirmed = await waitClick2();
            if(confirmed){
                const nombre_empresa = document.getElementById('u_nombre_empresa').value;
                const ubicacion = document.getElementById('u_ubicacion').value;
    
                const u_t = { }; //Solo toma en cuenta los datos no vacios
                if (nombre_empresa) u_t.nombre_empresa = nombre_empresa;
                if (ubicacion) u_t.ubicacion = ubicacion;
    
                if (Object.keys(u_t).length === 0) {
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'No se han llenado los campos.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                    return;
                }
    
                try {
                    const { data, error } = await supabase
                        .from('tienda')
                        .update(u_t)
                        .eq('t_id', T_id);
                
                    if (error) {
                        console.error('Error actualizando tienda:', error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error actualizando tienda. Intente denuevo';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        console.log('Tienda Actualizada:', data);
                        fetchData('T');  // Refrescar los datos
                        document.querySelector('.add_f').reset();  // Limpiar el formulario
                    }
                } catch (error) {
                    console.error(error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrio un error.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }
        }else if(Y === 'MV'){
            const row = event.target.closest('tr');
            const N_id = row.getAttribute('id');

            document.getElementById('F-U').innerHTML = `<button class="add_cbtn" id="t1">X</button>
                <h2 style="text-align: center;">Actualizar Micronutriente</h2>
                <form class="add_f">
                    <div>
                        <label for="u_min_vit">Mineral o Vitamina:</label>
                        <input type="text" id="u_min_vit" name="u_min_vit" placeholder="Mineral/Vitamina" required>
                    </div>
                    <div>
                        <label for="u_VD">Valor Diario(g):</label>
                        <input type="number" step="0.00000000001" id="u_VD" name="u_VD" placeholder="Valor Diario" min="0" required>
                    </div>
                    <button type="submit" class="up_btn" id="upd">Actualizar</button>
                </form>`;
            document.getElementById('u_popup').style.display = 'flex';

            const confirmed = await waitClick2();
            if(confirmed){
                const nombre = document.getElementById('u_min_vit').value;
                const VD = document.getElementById('u_VD').value;
    
                const u_n = { }; //Solo toma en cuenta los datos no vacios
                if (nombre) u_n.nombre = nombre;
                if (VD) u_n.VD = parseFloat(VD);
    
                if (Object.keys(u_n).length === 0) {
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'No se han llenado los campos.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                    return;
                }
    
                try {
                    const { data, error } = await supabase
                        .from('minerales-vitaminas')
                        .update(u_n)
                        .eq('nombre', N_id);
                
                    if (error) {
                        console.error(error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error actualizando nutriente. Intente denuevo';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        console.log('Nutriente Actualizado:', data);
                        fetchData('MV');  // Refrescar los datos
                        document.querySelector('.add_f').reset();  // Limpiar el formulario
                    }
                } catch (error) {
                    console.error(error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrio un error.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }
        } else if(Y === 'PA'){
            const row = event.target.closest('tr');
            const Prod_id = row.querySelectorAll('td')[0].getAttribute('id');
            const Nut_id = row.querySelectorAll('td')[1].getAttribute('id');

            document.getElementById('F-U').innerHTML = `<button class="add_cbtn" id="t1">X</button>
                <h2 style="text-align: center;">Actualizar Porcentaje de Valor Diario</h2>
                <form class="add_f">
                    <div>
                        <label for="u_VD">Porcentaje de Valor Diario(en decimal):</label>
                        <input type="number" id="u_VD" name="u_VD" step="0.00000001" placeholder="Porcentaje del VD del producto" min="0" required>
                    </div>
                    <button type="submit" class="up_btn" id="upd">Actualizar</button>
                </form>`;
            document.getElementById('u_popup').style.display = 'flex';
            const confirmed = await waitClick2();
            if(confirmed){
                const VD = document.getElementById('u_VD').value;
    
                const u_VD = { }; //Solo toma en cuenta los datos no vacios
                if (VD) u_VD.porcentaje_VD = parseFloat(VD);
    
                if (Object.keys(u_VD).length === 0) {
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'No se han llenado los campos.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                    return;
                }
    
                try {
                    const { data, error } = await supabase
                        .from('min-vit-producto')
                        .update(u_VD)
                        .eq('nut_id', Nut_id)
                        .eq('prod_id', Prod_id);
                
                    if (error) {
                        console.error(error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error actualizando. Intente denuevo';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        console.log('NPC actualizado:', data);
                        fetchData('PA');  // Refrescar los datos
                        document.querySelector('.add_f').reset();  // Limpiar el formulario
                    }
                } catch (error) {
                    console.error(error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrio un error.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }  
        } else {
            const row = event.target.closest('tr');
            const Prod_id = row.querySelectorAll('td')[0].getAttribute('id');
            const T_id = row.querySelectorAll('td')[1].getAttribute('id');

            document.getElementById('F-U').innerHTML = `<button class="add_cbtn" id="t1">X</button>
                <h2 style="text-align: center;">Actualizar Precio</h2>
                <form class="add_f">
                    <div>
                        <label for="u_precio">Precio:</label>
                        <input type="number" id="u_precio" name="u_precio" step="0.01" placeholder="Precio del Producto" min="0" required>
                    </div>
                    <button type="submit" class="up_btn" id="upd">Actualizar</button>
                </form>`;
            document.getElementById('u_popup').style.display = 'flex';
            const confirmed = await waitClick2();
            if(confirmed){
                const precio = document.getElementById('u_precio').value;
    
                const u_precio = { }; //Solo toma en cuenta los datos no vacios
                if (precio) u_precio.precio = precio;
    
                if (Object.keys(u_precio).length === 0) {
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'No se han llenado los campos.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                    return;
                }
    
                try {
                    const { data, error } = await supabase
                        .from('precios')
                        .update(u_precio)
                        .eq('prod_id', Prod_id)
                        .eq('t_id', T_id);
                
                    if (error) {
                        console.error(error);
                        warning.innerText = 'Advertencia';
                        warning_msg.innerText = 'Error actualizando precio. Intente denuevo';
                        document.getElementById('popup').style.display = 'none'; 
                        document.getElementById('popup_error').style.display = 'flex';
                    } else {
                        console.log('Precio Actualizado:', data);
                        fetchData('PR');  // Refrescar los datos
                        document.querySelector('.add_f').reset();  // Limpiar el formulario
                    }
                } catch (error) {
                    console.error(error);
                    warning.innerText = 'Advertencia';
                    warning_msg.innerText = 'Ocurrio un error.';
                    document.getElementById('popup').style.display = 'none'; 
                    document.getElementById('popup_error').style.display = 'flex';
                }
            }  
        }
    }

});

async function AddProduct(){
    // Guardar los valores
    const descripcion = document.getElementById('descripcion').value;
    const img = document.getElementById('img').value;
    const tamaño = document.getElementById('tamaño').value;
    const tamaño_por_porcion = document.getElementById('tamaño_por_porcion').value;
    const calorias = document.getElementById('calorias').value;
    const grasas = document.getElementById('grasas').value;
    const carb_total = document.getElementById('carb_total').value;
    const proteina = document.getElementById('proteina').value;
    const sodio = document.getElementById('sodio').value;

    //armate una estructuraa
    const n_prod = {
        tamaño: parseFloat(tamaño),
        "tamaño-por-porcion": parseFloat(tamaño_por_porcion),
        descripcion,
        calorias: parseFloat(calorias),  
        grasas: parseFloat(grasas),      
        carb_total: parseFloat(carb_total), 
        proteina: parseFloat(proteina),  
        sodio: parseFloat(sodio),        
        img
    };

    try {
        const { data, error } = await supabase
            .from('producto')
            .insert([n_prod]);
    
        if (error) {
            console.error(error);
            warning.innerText = 'Advertencia';
            warning_msg.innerText = 'Error agregando producto.';
            document.getElementById('popup_error').style.display = 'flex';
            document.getElementById('popup').style.display = 'none'; 
        } else {
            document.querySelector('.add_f').reset();  // Limpiar el formulario
            document.getElementById('popup').style.display = 'none';  // Ocultar el popup
            fetchData('P');  // Refrescar los datos
            console.log("Producto Agregado:", data); //objeto o pastel
        }
    } catch (error) {
        console.error(error);
        warning.innerText = 'Advertencia';
        warning_msg.innerText = 'Error ocurrio al agregar el producto.';
        document.getElementById('popup_error').style.display = 'flex';
        document.getElementById('popup').style.display = 'none'; 
    }
}
async function AddStore(){
    const nombre_empresa = document.getElementById('nombre_empresa').value;
    const ubicacion = document.getElementById('ubicacion').value;
    
    const n_tienda = {
        nombre_empresa,
        ubicacion
    };

    try {
        const { data, error} = await supabase
            .from('tienda')
            .insert([n_tienda]);
        if (error) {
            console.error(error);
            warning.innerText = 'Advertencia';
            warning_msg.innerText = 'Error agregando tienda.';
            document.getElementById('popup').style.display = 'none'; 
            document.getElementById('popup_error').style.display = 'flex';
        } else {
            document.querySelector('.add_f').reset();  // Limpiar el formulario
            document.getElementById('popup').style.display = 'none';  // Ocultar el popup
            fetchData('T');  // Refrescar los datos
            console.log("Tienda Agregada:", data); //objeto o pastel
        } 
    } catch (error) {
        console.error(error);
    }
}
async function AddPrice(){
    const prod_id = document.getElementById('s_prod').value;
    const t_id = document.getElementById('s_t').value;
    const precio = document.getElementById('precio').value;

    const n_precio = {
        prod_id,
        t_id,
        precio: parseFloat(precio)
    };

    try {
        const { data, error } = await supabase
            .from('precios')
            .insert([n_precio]);
    
        if (error) {
            console.error(error);
            warning.innerText = 'Advertencia';
            warning_msg.innerText = "Error agregando el precio.";
            document.getElementById('popup').style.display = 'none'; 
            document.getElementById('popup_error').style.display = 'flex';
        } else {
            document.querySelector('.add_f').reset();
            document.getElementById('popup').style.display = 'none';
            fetchData('PR');
            console.log("Precio Agregado:", data);
        }
    } catch (error) {
        console.error(error);
    }
}
async function AddNutrient(){
    const nombre = document.getElementById('min_vit').value;
    const VD = document.getElementById('VD').value;
    
    const n_nut = {
        nombre: nombre,
        VD: parseFloat(VD)
    };

    try {
        const { data, error} = await supabase
            .from('minerales-vitaminas')
            .insert([n_nut]);
        if (error) {
            console.error(error);
            warning.innerText = 'Advertencia';
            warning_msg.innerText = 'Error agregando micronutriente.';
            document.getElementById('popup').style.display = 'none'; 
            document.getElementById('popup_error').style.display = 'flex';
        } else {
            document.querySelector('.add_f').reset();  // Limpiar el formulario
            document.getElementById('popup').style.display = 'none';  // Ocultar el popup
            fetchData('MV');  // Refrescar los datos
            console.log("Nutriente Agregado:", data); //objeto o pastel
        } 
    } catch (error) {
        console.error(error);
    }
}
async function AddNutrientperProduct(){
    const prod_id = document.getElementById('s_prod').value;
    const nut_id = document.getElementById('s_n').value;
    const VD = document.getElementById('VD').value;

    const n_npc = {
        nut_id,
        prod_id,
        porcentaje_VD: parseFloat(VD)
    };

    try {
        const { data, error } = await supabase
            .from('min-vit-producto')
            .insert([n_npc]);
    
        if (error) {
            console.error(error);
            warning.innerText = 'Advertencia';
            warning_msg.innerText = "Error al agregar valor diario de micronutriente correspondiente al producto.";
            document.getElementById('popup').style.display = 'none'; 
            document.getElementById('popup_error').style.display = 'flex';
        } else {
            document.querySelector('.add_f').reset();
            document.getElementById('popup').style.display = 'none';
            fetchData('PA');
            console.log("NPC Agregado:", data);
        }
    } catch (error) {
        console.error(error);
    }
}

function waitClick1() {
    return new Promise((resolve) => {
        document.getElementById('delet').addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('d_popup').style.display = 'none';
            resolve(true);
        });

        document.getElementById('t').addEventListener('click', () => {
            document.getElementById('d_popup').style.display = 'none';
            resolve(false);
        });
    });
}

function waitClick2() {
    return new Promise((resolve) => {
        document.getElementById('upd').addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('u_popup').style.display = 'none';
            resolve(true);
        });

        document.getElementById('t1').addEventListener('click', () => {
            document.getElementById('u_popup').style.display = 'none';
            resolve(false);
        });
    });
}

const GetProductos = async () => {
    const { data: products, error } = await supabase
        .from('producto')
        .select('prod_id, descripcion');
    
    if (error) {
        console.error(error);
        return;
    }
    return products;
};
const GetTiendas = async () => {
    const { data: stores, error } = await supabase
        .from('tienda')
        .select('t_id, nombre_empresa, ubicacion');
    if (error) {
        console.error(error);
        return;
    }
    return stores;
};
const GetNutrientes = async () => {
    const { data: nutrients, error } = await supabase
    .from('minerales-vitaminas')
    .select('nombre');
if (error) {
    console.error(error);
    return;
}
return nutrients;
}

async function DropdownProductos(){
    const products = await GetProductos();
    const productSelect = document.getElementById('s_prod');

    products.forEach((product) => {
        const option = document.createElement('option');
        option.value = product.prod_id;
        option.textContent = product.descripcion;
        productSelect.appendChild(option);
    });
};
async function DropdownTiendas(){
    const stores = await GetTiendas();
    const storeSelect = document.getElementById('s_t');

    stores.forEach((store) => {
        const option = document.createElement('option');
        option.value = store.t_id;
        option.textContent = `${store.nombre_empresa} (${store.ubicacion})`;
        storeSelect.appendChild(option);
    });
};
async function DropdownNutrientes(){
    const products = await GetNutrientes();
    const productSelect = document.getElementById('s_n');

    products.forEach((product) => {
        const option = document.createElement('option');
        option.value = product.nombre;
        option.textContent = product.nombre;
        productSelect.appendChild(option);
    });
};

async function search(ST) {
    try {
        switch(Y){
            case 'P':
                const {data: data1, error: error1} = await supabase
                    .from('producto')
                    .select('prod_id, descripcion')
                    .ilike('descripcion', `%${ST}%`)
                    .order('prod_id', {ascending: true});
                if(error1){console.error(error1)}else if(!data1){console.error("Error obteniendo data"); fetchData(Y)}else{generateProducts(data1);}
                break;
            case 'T':
                const {data: data2, error: error2} = await supabase
                    .from('tienda')
                    .select('t_id, nombre_empresa, ubicacion')
                    .or(`nombre_empresa.ilike.%${ST}%,ubicacion.ilike.%${ST}%`)
                    .order('t_id', {ascending: true});
                if(error2){console.error(error2)}else{generateStores(data2);}
                break;
            case 'MV':
                const {data: data3, error: error3} = await supabase
                    .from('minerales-vitaminas')
                    .select('nombre, VD')
                    .ilike('nombre', `%${ST}%`)
                    .order('nombre', {ascending: true});
                if(error3){console.error(error3)}else{generateNutrients(data3);}
                break;
            case 'PA':
                const {data: data4, error: error4} = await supabase
                    .from('min-vit-producto')
                    .select('prod_id, producto: prod_id(descripcion), nut_id, porcentaje_VD')
                    .ilike('producto.descripcion', `%${ST}%`)
                    .order('prod_id', {ascending: true});
                if(error4){console.error(error4); return;}
                const {data: data6, error: error6} = await supabase
                    .from('min-vit-producto')
                    .select('prod_id, producto: prod_id(descripcion), nut_id, porcentaje_VD')
                    .ilike('nut_id', `%${ST}%`)
                    .order('nut_id', {ascending: true});
                if(error6){console.error(error6)}else{generatePercNutrientperProduct([...data4.filter(item => item.producto !== null), ...data6]);}
                break;
            default:
                const {data: data5, error: error5} = await supabase
                    .from('precios')
                    .select('precio, producto: prod_id(descripcion), prod_id, tienda: t_id(nombre_empresa, ubicacion), t_id')
                    .ilike(`producto.descripcion`,`%${ST}%`)
                    .order('prod_id', {ascending: true});
                if(error5){console.error(error5); return;}
                const {data: data7, error: error7} = await supabase
                    .from('precios')
                    .select('precio, producto: prod_id(descripcion), prod_id, tienda: t_id(nombre_empresa, ubicacion), t_id')
                    .ilike(`tienda.nombre_empresa`, `%${ST}%`)
                    .order('t_id', {ascending: true});
                if(error7){console.error(error7);}
                const {data: data8, error: error8} = await supabase
                    .from('precios')
                    .select('precio, producto: prod_id(descripcion), prod_id, tienda: t_id(nombre_empresa, ubicacion), t_id')
                    .ilike(`tienda.ubicacion`, `%${ST}%`)
                    .order('t_id', {ascending: true});
                if(error8){console.error(error8);}else{generatePrices([...data5.filter(item => item.producto !== null), ...data7.filter(item => item.tienda !== null), ...data8.filter(item => item.tienda !== null)])}
                break;
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('search').addEventListener('submit', (event) => {
    event.preventDefault();
    search(document.getElementById('query').value);
});

function Search_Query(){
    search(document.getElementById('query').value);
}