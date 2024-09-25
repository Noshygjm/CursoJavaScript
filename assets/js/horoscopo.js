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
    if (datosLogueo.logueado) {
        document.getElementById('nombre').value = datosLogueo.usuario;
        /* para la siguiente linea, tuve que pedir ayuda a chatgpt, porque no podia hacer
        que me cambiara el value, y chatgpt me agrego .toISOString().split('T')[0]; */
        document.getElementById('fechaNacimiento').value = new Date(datosLogueo.fecha).toISOString().split('T')[0];
    } else {
        document.getElementById('nombre').value = '';
        document.getElementById('fechaNacimiento').value = '';
    }
}

const inicializarWeb = (key) => {
    validarLogueo('logueado');
    mostrarDatos('horoscopo');
}


// Mostramos los datos al cargar la página
window.onload = inicializarWeb('horoscopo');