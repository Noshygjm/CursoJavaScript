const agregarItemsStorage = (key, data) => {
  let existeDato = JSON.parse(localStorage.getItem(key)) || [];
  existeDato.push(data);
  localStorage.setItem(key, JSON.stringify(existeDato));
}

const grabarDatoStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const recuperarStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
}


const borrarStorage = (key) => {
  localStorage.removeItem(key);
  mostrarDatos();
}

