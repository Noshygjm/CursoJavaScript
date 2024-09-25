const enviarDatos = () => {
  const nombre = document.getElementById('nombre').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const tipoHoroscopo = document.getElementById('tipoHoroscopo').value;
  const error = document.getElementById('error');

  if (!nombre || !fechaNacimiento || !tipoHoroscopo) {
      error.innerHTML = `<h4>Por favor, completa todos los campos.</h4>`;
      return;
  }

   const datosFormulario = {
      nombre: nombre,
      fechaNacimiento: fechaNacimiento,
      tipoHoroscopo: tipoHoroscopo,
  };

  agregarItemsStorage('horoscopo', datosFormulario);
  mostrarDatos('horoscopo');
}

const mostrarDatos = (key) => {
  const datosGuardados = document.getElementById('datosGuardados');
  let existeDatos = recuperarStorage(key);

  // Limpiar la grilla antes de agregar nuevos datos
  datosGuardados.innerHTML = '';

  if (existeDatos.length === 0) {
      datosGuardados.innerHTML = '<p>No hay datos guardados.</p>';
      return;
  }

  if (existeDatos.length > 0) {
      let tabla = `
      <div class="container text-center mt-5">
      <p>Horóscopos solicitados:</p>
      <table class="table table-bordered table-sm mt-4">
          <thead class="thead-dark">
              <tr>
                  <th>Nombre</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Tipo de Horóscopo</th>
              </tr>
          </thead>
          <tbody>`;
      
          existeDatos.forEach(item => {
          tabla += `<tr class="bg-light">
                      <td>${item.nombre}</td>
                      <td>${item.fechaNacimiento}</td>
                      <td>${item.tipoHoroscopo}</td>
                  </tr>`;
      });

      tabla += `</tbody></table>
      <button type="button" class="btn btn-danger mt-3" onclick="borrarStorage('horoscopo')">Borrar Datos Guardados</button>
      </div>`;
      datosGuardados.innerHTML = tabla;
  }
}

const validarLogueo = (key) => {
    let datosLogueo = recuperarStorage(key);
    const menuLogueo = document.getElementById('logueo');
    if (datosLogueo.logueado) {
        document.getElementById('nombre').value = datosLogueo.usuario;
        /* para la siguiente linea, tuve que pedir ayuda a chatgpt, porque no podia hacer
        que me cambiara el value, y chatgpt me agrego .toISOString().split('T')[0]; */
        document.getElementById('fechaNacimiento').value = new Date(datosLogueo.fecha).toISOString().split('T')[0];

        /* esta logueado */
        menuLogueo.innerHTML = `<div class="icon">
        <button onclick="login()">${datosLogueo.usuario} (Salir)</button> 
    </div>
    <div class="icon">
        <span>Créditos: ${datosLogueo.creditos}</span>
    </div>
    <div class="icon">
        <button onclick="formularioCompra()">Comprar Créditos</button>
    </div>`;

    } else {
        document.getElementById('nombre').value = '';
        document.getElementById('fechaNacimiento').value = '';

        /* esta deslogueado */
       menuLogueo.innerHTML = `<div class="icon">
            <button onclick="login()">Ingresar</button> 
        </div>
        <div class="icon">
            <span>Créditos: 0</span>
        </div>
        <div class="icon">
            <button onclick="formularioCompra()">Comprar Créditos</button>
        </div>`;

    }
}

const inicializarWeb = (key) => {
    validarLogueo('logueado');
    mostrarDatos('horoscopo');
}

const login = () => {

    let datosLogueo = recuperarStorage('logueado');

    if (datosLogueo.logueado) {
        borrarStorage('logueado');
        validarLogueo('logueado');
    } else {
        abrirPagina('../pages/horoscopo.html');             
    }
}

const formularioCompra = () => {
    let datosLogueo = recuperarStorage('logueado');
    if (!datosLogueo.logueado) {
        Swal.fire({
            icon: 'warning',  
            title: '¡Debe iniciar sesión!',
            text: 'Antes de comprar créditos debe loguearse.',
            confirmButtonText: 'Aceptar'
        });        
        return;
    }


    Swal.fire({
        title: 'Comprar Créditos',
        text: 'Ingresa la cantidad de créditos que deseas comprar:',
        input: 'number',  
        inputAttributes: {
            min: 1,        
            step: 1       
        },
        showCancelButton: true,  
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        inputPlaceholder: 'Cantidad de créditos',
        preConfirm: (cantidad) => {
            if (!cantidad || cantidad <= 0) {
                Swal.showValidationMessage('Por favor, ingresa la cantidad de créditos acomprar');
            }
            return cantidad;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let auxCreditos = parseInt(datosLogueo.creditos, 10) +  parseInt(result.value, 10);
            datosLogueo.creditos = auxCreditos;
            grabarDatoStorage('logueado', datosLogueo);
            validarLogueo('logueado');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            validarLogueo('logueado');
        }
    });
}

const abrirPagina = (url) => {
    window.location.href = url; 
} 


// Mostramos los datos al cargar la página
window.onload = inicializarWeb('horoscopo');