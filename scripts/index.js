// Clase Cards
class Activity {
  static idNumero = 1;
  constructor(title, imgUrl, description) {
    this.id = Activity.idNumero++;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
  }
}

// Clase Repository
class Repository {
  constructor() {
    this.activities = [];
  }
  //  Método para agregar una nueva instancia de Cards al array
  createActivity(title, imgUrl, description) {
    let nuevaActividad = new Activity(title, imgUrl, description);
    this.activities.push(nuevaActividad);
  }

  // Método para retornar todas las activities
  getAllActivities() {
    return this.activities;
  }

  // Método para filtrar activities por algún criterio (ejemplo: por título)
  filterActivity(criterio) {
    return this.activities.filter((actividad) =>
      actividad.title.includes(criterio)
    );
  }

  // Método para eliminar una activity por ID
  deleteActivity(id) {
    const i = this.activities.findIndex((actividad) => actividad.id === id);

    if (i !== -1) {
      this.activities.splice(i, 1);
      return alert(`La actividad se ha borrado`);
    }
  }
}

const act = new Repository();
function addNewTec() {
  let title = document.getElementById(`nombreTec`).value;
  let imgUrl = document.getElementById(`imageTec`).value;

  act.createActivity(title, imgUrl, "");
  document.getElementById(`sectionTec`).insertAdjacentHTML(
    "beforeend",
    `<article class="card">
      <h3>${title}</h3>
      <img src="${imgUrl}" alt="Logo de ${title}" />
    </article>`
  );

  document.getElementById(`nombreTec`).value = "";
  document.getElementById(`imageTec`).value = "";
}

function addNewAct() {
  let title = document.getElementById(`namAct`).value;
  let imgUrl = document.getElementById(`urlImgAct`).value;
  let description = document.getElementById(`descripAct`).value;
  let text = document.getElementById("textAct");
  const padre = document.getElementById("containerAct");
  act.createActivity(title, imgUrl, description);
  const { id } = act;
  if (text) {
    padre = text.parentNode;
    padre.removeChild(text);
  }
  if (padre.className === "section") padre.className += " container";

  document.getElementById(`containerAct`).insertAdjacentHTML(
    "beforeend",
    `<article class="card">
    <h3>${title}</h3>
    <p> ${description}</p>
    <img src="${imgUrl}" alt="Logo de ${title}" />
    </article>`
  );
  document.getElementById(`selectAct`).removeAttribute(`disabled`);
  document.getElementById(`butonDelete`).removeAttribute(`disabled`);
  document
    .getElementById(`selectAct`)
    .insertAdjacentHTML(`beforeend`, `<option value="${id}">${title}</option>`);
  document.getElementById(`urlImgAct`).value = "";
  document.getElementById(`namAct`).value = "";
  document.getElementById(`descripAct`).value = "";
  console.log(act.getAllActivities());
}

function deleteAct(id) {
  act.deleteActivity(id);
}
// pruebas
// act.createActivity("correr", "https:/", "Salir a la aventura");
// act.createActivity("bailar", "https:/", "danza");
// // console.log(act.filterActivity("bailar"));
// console.log(act.deleteActivity(2));
