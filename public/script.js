function toggleAdvancedOptions() {
    const advOptions = document.getElementById('advancedOptions');
    const advB = document.getElementById('adv_btn');
    advOptions.style.display = advOptions.style.display === 'none' || advOptions.style.display === '' ? 'block' : 'none';
    advB.textContent = advOptions.style.display === 'block' ? 'Más Opciones ⮝' : 'Más Opciones ⮟';
}

function togglePopUp(){
  document.getElementById('popup').style.display = 'none';
}

const warning = document.getElementById('warn');
const warning_msg = document.getElementById('warn_msg');

document.getElementById('formulario').addEventListener('submit', async (event) =>{
    event.preventDefault();
    const A = {};
    let isValid = true;
    const cal_l = parseFloat(document.getElementById('cal_l').value);
    const cal_u = parseFloat(document.getElementById('cal_u').value);
  
    if (cal_l < cal_u) {
      A.cal_l = cal_l;
      A.cal_u = cal_u;
    } else {
      isValid = false;
      warning.innerText = 'Advertencia';
      warning_msg.innerText = "El límite inferior de calorías debe ser inferior al límite superior.";
      document.getElementById('popup').style.display = 'flex';
    }
  
    const grasa_l = parseFloat(document.getElementById('grasa_l').value);
    const grasa_u = parseFloat(document.getElementById('grasa_u').value);
  
    if (grasa_l < grasa_u) {
      A.grasa_l = grasa_l;
      A.grasa_u = grasa_u;
    } else {
      isValid = false;
      warning.innerText = 'Advertencia';
      warning_msg.innerText = "El límite inferior de grasa debe ser inferior al límite superior.";
      document.getElementById('popup').style.display = 'flex';
    }
  
    const protein_l = parseFloat(document.getElementById('protein_l').value);
    const protein_u = parseFloat(document.getElementById('protein_u').value);
  
    if (protein_l < protein_u) {
      A.protein_l = protein_l;
      A.protein_u = protein_u;
    } else {
      isValid = false;
      warning.innerText = 'Advertencia';
      warning_msg.innerText = "El límite inferior de proteínas debe ser inferior al límite superior.";
      document.getElementById('popup').style.display = 'flex';
    }
  
    const carbs_l = parseFloat(document.getElementById('carbs_l').value);
    const carbs_u = parseFloat(document.getElementById('carbs_u').value);
  
    if (carbs_l < carbs_u) {
      A.carbs_l = carbs_l;
      A.carbs_u = carbs_u;
    } else {
      isValid = false;
      warning.innerText = 'Advertencia';
      warning_msg.innerText = "El límite inferior de carbohidratos debe ser inferior al límite superior.";
      document.getElementById('popup').style.display = 'flex';
    }
  
    const na_l = parseFloat(document.getElementById('na_l').value);
    const na_u = parseFloat(document.getElementById('na_u').value);
  
    if (na_l < na_u) {
      A.na_l = na_l/1000;
      A.na_u = na_u/1000;
    } else {
      isValid = false;
      warning.innerText = 'Advertencia';
      warning_msg.innerText = "El límite inferior de sodio debe ser inferior al límite superior.";
      document.getElementById('popup').style.display = 'flex';
    }

    const calc_l = parseFloat(document.getElementById('calc_l').value);
    const calc_u = parseFloat(document.getElementById('calc_u').value);

    if (calc_l < calc_u) {
        A.calc_l = calc_l/1000;
        A.calc_u = calc_u/1000;
      } else {
        isValid = false;
        warning.innerText = 'Advertencia';
        warning_msg.innerText = "El límite inferior de calcio debe ser inferior al límite superior.";
        document.getElementById('popup').style.display = 'flex';
      }

    const Fe_l = parseFloat(document.getElementById('Fe_l').value);
    const Fe_u = parseFloat(document.getElementById('Fe_u').value);
    if (Fe_l < Fe_u) {
        A.Fe_l = Fe_l/1000;
        A.Fe_u = Fe_u/1000;
      } else {
        isValid = false;
        warning.innerText = 'Advertencia';
        warning_msg.innerText = "El límite inferior de hierro debe ser inferior al límite superior.";
        document.getElementById('popup').style.display = 'flex';
      }

    const vitA_l = parseFloat(document.getElementById('vitA_l').value);
    const vitA_u = parseFloat(document.getElementById('vitA_u').value);
    if (vitA_l < vitA_u) {
        A.vitA_l = vitA_l/1000000;
        A.vitA_u = vitA_u/1000000;
      } else {
        isValid = false;
        warning.innerText = 'Advertencia';
        warning_msg.innerText = "El límite inferior de vitamina A debe ser inferior al límite superior.";
        document.getElementById('popup').style.display = 'flex';
      }

    const vitC_l = parseFloat(document.getElementById('vitC_l').value);
    const vitC_u = parseFloat(document.getElementById('vitC_u').value);
    if (vitC_l < vitC_u) {
        A.vitC_l = vitC_l/1000;
        A.vitC_u = vitC_u/1000;
      } else {
        isValid = false;
        warning.innerText = 'Advertencia';
        warning_msg.innerText = "El límite inferior de vitamina C debe ser inferior al límite superior.";
        document.getElementById('popup').style.display = 'flex';
      }

    const zin_l = parseFloat(document.getElementById('zin_l').value);
    const zin_u = parseFloat(document.getElementById('zin_u').value);
    if (zin_l < zin_u) {
        A.zin_l = zin_l/1000;
        A.zin_u = zin_u/1000;
      } else {
        isValid = false;
        warning.innerText = 'Advertencia';
        warning_msg.innerText = "El límite inferior de zinc debe ser inferior al límite superior.";
        document.getElementById('popup').style.display = 'flex';
      }

  
    if(isValid){console.log(A)}else{return;}

    fetch('/solve-LP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: A}),
    })
    .then(R => R.json())
    .then(S =>{
      console.log(S)
      if(S.feasible){
        document.getElementById('results').innerHTML = ``;
        processServerResponse(S);
      }else{
        warning.innerText = 'Advertencia';
        warning_msg.innerText = 'No hay ninguna combinación de variables que cumpla todas las restricciones proporcionadas. Por favor, compruebe sus entradas o restricciones.';
        document.getElementById('popup').style.display = 'flex';
      }
    })
    .catch((error) => {console.error(error)});
});


function renderResultCard({ product, store, location, img, PG, GN}) {
  const results = document.getElementById('results');
  const total = ((GN).toFixed(2)*(PG).toFixed(2)).toFixed(2);

  const cardHTML = `
    <div class="result-card">
      <img src="${img}" alt="${product}" class="result-image">
      <div class="result-details">
        <h3>${product}</h3>
        <p><strong>Tienda:</strong> ${store}</p>
        <p><strong>Ubicación:</strong> ${location}</p>
        <p><strong>Precio por Grs.:</strong> L. ${(PG).toFixed(2)}</p>
        <p><strong>Cantidad (g):</strong> ${(GN).toFixed(2)} gramos</p>
        <p class="result-price">Total: L. ${total}</p>
      </div>
    </div>
  `;
  results.insertAdjacentHTML('beforeend', cardHTML);
}

async function fetchProductDetails(product, store, location) {
  let A = null;
  await fetch('/result-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({product: product, store: store, location: location}),
  })
  .then(R => R.json())
  .then(S =>{
    A = {
      product: S.descripcion,
      store: S.precios[0].tienda.nombre_empresa || 'N/A',
      location: S.precios[0].tienda.ubicacion || 'N/A',
      img: S.img,
      PG: S.precios[0].precio/S.tamaño || 0
    };
  })
  .catch((error) => {
    console.error(error);
  })
  return A;
}

async function processServerResponse(R) {
  const E = Object.entries(R).filter(([key]) => key.includes(' || '));

  for (const [key, GN] of E) {

    const [product, s_info] = await key.split(' || ');
    const [store, location] = await s_info.split(',');
    const p_details = await fetchProductDetails(
      product,
      store.trim(),
      location
    );

    if (p_details) {
      renderResultCard({
        ...p_details,
        GN
      });
    }
  }
}