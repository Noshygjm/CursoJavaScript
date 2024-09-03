/* Funcion que retorna el Signo segun el nacimiento */
const getSigno = (dia, mes) => {
    switch (mes) {
      case 1:
        return dia <= 19 ? "Capricornio" : "Acuario";
        break;
      case 2:
        return dia <= 18 ? "Acuario" : "Piscis";
        break;
      case 3:
        return dia <= 20 ? "Piscis" : "Aries";
        break;
      case 4:
        return dia <= 19 ? "Aries" : "Tauro";
        break;
      case 5:
        return dia <= 20 ? "Tauro" : "Géminis";
        break;
      case 6:
        return dia <= 20 ? "Géminis" : "Cáncer";
        break;
      case 7:
        return dia <= 22 ? "Cáncer" : "Leo";
        break;
      case 8:
        return dia <= 22 ? "Leo" : "Virgo";
        break;
      case 9:
        return dia <= 22 ? "Virgo" : "Libra";
        break;
      case 10:
        return dia <= 22 ? "Libra" : "Escorpio";
        break;
      case 11:
        return dia <= 21 ? "Escorpio" : "Sagitario";
        break;
      case 12:
        return dia <= 21 ? "Sagitario" : "Capricornio";
        break;
      default:
        return "No pude identificar tu Signo";
        break;
    }
};

const getDescripcion = (signo) => {
    let descripcion;

    switch (signo.toLowerCase()) {
        case 'acuario':
            descripcion = "Acuario es independiente, creativo y un pensador libre. Siempre busca la verdad y le encanta innovar.";
            break;
        case 'piscis':
            descripcion = "Piscis es empático, compasivo y muy intuitivo. Su imaginación no tiene límites.";
            break;
        case 'aries':
            descripcion = "Aries es valiente, enérgico y aventurero. Siempre está listo para nuevos desafíos.";
            break;
        case 'tauro':
            descripcion = "Tauro es confiable, paciente y amante de la estabilidad. Su persistencia lo hace destacar.";
            break;
        case 'géminis':
            descripcion = "Géminis es curioso, adaptable y comunicativo. Le encanta aprender y compartir conocimientos.";
            break;
        case 'cáncer':
            descripcion = "Cáncer es emocional, protector y muy familiar. Valora profundamente las conexiones emocionales.";
            break;
        case 'leo':
            descripcion = "Leo es carismático, generoso y líder por naturaleza. Le encanta brillar y ser el centro de atención.";
            break;
        case 'virgo':
            descripcion = "Virgo es analítico, detallista y perfeccionista. Siempre busca la eficiencia y la perfección.";
            break;
        case 'libra':
            descripcion = "Libra es equilibrado, sociable y amante de la armonía. Siempre busca la justicia y el equilibrio en la vida.";
            break;
        case 'escorpio':
            descripcion = "Escorpio es apasionado, decidido y un poco misterioso. Su intensidad y fuerza de voluntad son inigualables.";
            break;
        case 'sagitario':
            descripcion = "Sagitario es optimista, aventurero y filosófico. Ama la libertad y siempre busca la verdad.";
            break;
        case 'capricornio':
            descripcion = "Capricornio es disciplinado, ambicioso y muy trabajador. Su determinación lo lleva al éxito.";
            break;
        default:
            descripcion = "Signo no reconocido. Por favor, introduce un signo del zodiaco válido.";
            break;
    }

    return descripcion;
}  

const showSigno = () => {
    const fechaNac = document.getElementById('fechaNacimiento').value;
    const nombre = document.getElementById('nombre').value;

    const error = document.getElementById('error');
    const zodiaco = document.getElementById('container');

    if (!fechaNac) {
        error.innerText = "<h4>Por favor, ingresa una fecha de nacimiento.</h4>";
        return;
    }

    const fechaNacimiento = new Date(fechaNac);
    /* getMonth() devuelve entre 0 y11, por eso le sumo 1 */
    const mes = fechaNacimiento.getMonth() + 1;  
    const dia = fechaNacimiento.getDate();    

    const signo = getSigno(dia, mes);

    let textZodiaco = `Hola ${nombre}, según tu fecha de nacimiento (${fechaNac}), su sigo del zodiaco es`;
    let textDescripcion = getDescripcion(signo);

    zodiaco.innerHTML = `<h1 class="mt-5 gradient-text text-shadow">Horóscopo para ${nombre}</h1>
    
    <p class="lead mt-3">${textZodiaco}</p>

    <h2 class="mt-5 gradient-text text-shadow">${signo}</h2>

    <p class="lead mt-3">${textDescripcion}</p>
    
    `;

}

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

    grabarStorage(datosFormulario);
    mostrarDatos();
}

const mostrarDatos = () => {
    const datosGuardados = document.getElementById('datosGuardados');
    let existeDatos = recuperarStorage();

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
        <button type="button" class="btn btn-danger mt-3" onclick="borrarStorage()">Borrar Datos Guardados</button>
        </div>`;
        datosGuardados.innerHTML = tabla;
    }
}

function grabarStorage(data) {
    let existeDato = JSON.parse(localStorage.getItem('horoscopo')) || [];
    existeDato.push(data);
    localStorage.setItem('horoscopo', JSON.stringify(existeDato));
}


function recuperarStorage() {
    return JSON.parse(localStorage.getItem('horoscopo')) || [];
}


const borrarStorage = () => {
    localStorage.removeItem("horoscopo");
    mostrarDatos();
}

// Mostramos los datos al cargar la página
window.onload = mostrarDatos;