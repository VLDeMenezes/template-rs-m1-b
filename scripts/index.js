//Clase de tarjetas, con id statico y propiedades texto, descripcion, url de imagen y tipo (si es tecnologia o actividad)
class Activity {
  static id = 0;
  constructor(title, description, imgUrl, type) {
    this.id = Activity.id++;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.type = type;
  }
}
//clase donde se alojaran las actividades, tiene una propiedad que es un array y varios metodos para agregar, filtrar, mostrar o eliminar las actividades.
class Repository {
  constructor() {
    this.activities = [];
  }
  //metodos de agregar, mostrar, filtrar y eliminar.
  createActivity(title, description, imgUrl, type) {
    const activity = new Activity(title, description, imgUrl, type);
    this.activities.push(activity);
  }
  getAllActivities() {
    return this.activities;
  }
  filterActivity(title) {
    return this.activities.find((activity) => activity.title === title);
  }
  deleteActivity(id) {
    this.activities = this.activities.filter((act) => act.id !== id);
  }
}
//instancia base
const repo = new Repository();
repo.createActivity("HTML", "", "Assets/icons8-html-240.png", 1);
repo.createActivity("CSS", "", "Assets/icons8-css-240.png", 1);
repo.createActivity("JavaScript", "", "Assets/icons8-javascript-240.png", 1);
repo.createActivity("React", "", "Assets/icons8-reaccionar-240.png", 1);
refreshDisplay();

//Funcion para cambiar el texto y el tipo de contenedor de las Actividades
function changeContainer() {
  const text1 = document.getElementById("textAct");
  const contenedor = document.getElementById("buscador");
  text1.innerHTML = "";
  contenedor.classList.remove("disable");
}

//funcion para eliminar tarjeta y actividad
function deleteCard(id) {
  repo.deleteActivity(id);
  // /actualizar las actividades en la pagina
  refreshDisplay();
}
//eventos click en botones
document.getElementById("bttnAgregar").addEventListener("click", () => {
  handler();
});
document.getElementById("deleteBttnAll").addEventListener("click", () => {
  deleteAllActivities();
});
document.getElementById("buscador").addEventListener("keyup", () => {
  search();
});

// Función para crear una nueva tarjeta (div) con los elementos HTML especificados.
function addNewCard(card) {
  //destructurar
  const { title, description, imgUrl, id } = card;
  //Crear elementos y asignar clases
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteBttn";
  deleteButton.innerHTML = "X";
  deleteButton.addEventListener("click", () => deleteCard(id));
  const titleH3 = document.createElement("h3");
  titleH3.innerHTML = title;
  titleH3.style.textAlign = "center";
  const descriptionP = document.createElement("p");
  descriptionP.innerHTML = description;
  const image = document.createElement("img");
  image.src = imgUrl;
  //agregar elementos a la div
  cardDiv.appendChild(deleteButton);
  cardDiv.appendChild(titleH3);
  cardDiv.appendChild(descriptionP);
  cardDiv.appendChild(image);

  // Agregar la tarjeta al contenedor correspondiente según el tipo.
  const containerId = card.type === 1 ? "sectionTec" : "divAct";
  const container = document.getElementById(containerId);
  container.appendChild(cardDiv);
  if (containerId === "divAct") {
    changeContainer();
  }
}

// Función para manejar los inputs del HTML y agregar una nueva actividad al repositorio.
function handler() {
  const title = document.getElementById("titleAct").value;
  const description = document.getElementById("descAct").value;
  const imgUrl = document.getElementById("imgUrAct").value;
  const type = parseInt(document.getElementById("type").value);
  //chequeo de inputs
  if (!title) {
    alert(
      "Faltan ingresar el titulo para la tarjeta, recuerda debe ser un texto"
    );
  } else if (!description) {
    alert("Falta ingresar la descripcion, recuerda debe ser un texto");
  } else if (!imgUrl) {
    alert("Falta ingresar el Url de la imagen, recuerda copiarlo y pegarlo!");
  } else {
    // Si esta correcto se instancia
    repo.createActivity(title, description, imgUrl, type);

    // Limpiar los campos de entrada después de agregar la actividad.
    document.getElementById("titleAct").value = "";
    document.getElementById("descAct").value = "";
    document.getElementById("imgUrAct").value = "";

    // Actualizar la visualización.
    refreshDisplay();
  }
}

// Función para actualizar las secciones correspondientes con las actividades del repositorio.
function refreshDisplay() {
  const tecSection = document.getElementById("sectionTec");
  const divActSection = document.getElementById("divAct");

  // Limpiar las secciones antes de actualizar.
  tecSection.innerHTML = "";
  divActSection.innerHTML = "";

  // Obtener todas las actividades del repositorio.
  const allActivities = repo.getAllActivities();

  // Mapear y agregar cada actividad como una tarjeta a la sección correspondiente.
  const resultado = allActivities.forEach((activity) => addNewCard(activity));
}

// Funcion para borrar todas las tarjetas.
function deleteAllActivities() {
  repo.activities = [];
  refreshDisplay();
  document.getElementById("buscador").classList.add("disable");
  document.getElementById("textAct").innerHTML =
    "Sin actividades por el momento";
}

//Funcion para buscar tarjetas activity
function search() {
  const div = document.getElementById("divAct");
  const title = document.getElementById("buscador").value.trim();
  if (title !== "") {
    // Filtrar las actividades que coincidan con el título
    const resultados = repo
      .getAllActivities()
      .filter((activity) =>
        activity.title.toLowerCase().includes(title.toLowerCase())
      );
    div.innerHTML = "";
    // Mostrar las tarjetas de las actividades que coinciden con la búsqueda
    resultados.forEach((activity) => addNewCard(activity));
  } else {
    // Si no se ingresó ningún título, mostrar todas las actividades
    refreshDisplay();
  }
}

module.exports = {
  activity,
  Repository,
};
