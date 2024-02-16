// funcion para agregar tecnologias a la seccion, toma los valores introducidos por usuario

function agregarTec() {
  let nombre = document.getElementById("nombreTec").value;
  let imagen = document.getElementById("imagenTec").value;

  document.getElementById("sectionTec").insertAdjacentHTML(
    "beforeend",
    `<article class="card">
      <h3>${nombre}</h3>
      <img src="${imagen}" alt="Logo de ${nombre}" />
    </article>`
  );
  document.getElementById("nombreTec").value = "";
  document.getElementById("imagenTec").value = "";
}

// funcion para agregar actividad a la seccion, toma los valores introducidos por usuario, borra texto default, agrega clase de contenedor grid
function agregarAct() {
  let nombre = document.getElementById("nombreAct").value;
  let descripcion = document.getElementById("descripcionAct").value;
  let url = document.getElementById("urlImgAct").value;
  let text = document.getElementById("textAct");
  let padre = document.getElementById("containerAct");

  if (text) {
    padre = text.parentNode;
    padre.removeChild(text);
  }
  if (padre.className === "section") padre.className += " container";

  document.getElementById("containerAct").insertAdjacentHTML(
    "beforeend",
    `<article class="card ">
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <img src="${url}" alt="Imagen de ${nombre}" />
    </article>`
  );
  document.getElementById("nombreAct").value = "";
  document.getElementById("descripcionAct").value = "";
  document.getElementById("urlImgAct").value = "";
}
