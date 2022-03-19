let convertGetUCTDay = [
  6, 0, 1, 2, 3, 4, 5,
]; /* Nuestras semanas empiezan en lunes */
let totalDiasXMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function abrirDetalleDia(e) {
  let popup = document.querySelector("#detalleDia");
  let dia = document.querySelector("#detalleDia H1");
  let tituloMes = document.querySelector("thead th[colspan='5'  ]");
  let anyo = document.querySelector("#anyoAgenda");

  dia.innerHTML = `${this.innerHTML}/${
    Number(meses.indexOf(tituloMes.innerText)) + 1
  }/${anyo.innerText}`;

  popup.style.display = "block";
}

function onClickClose(e) {
  let popup = document.querySelector("#detalleDia");
  popup.style.display = "none";
}

const obtenerPrimerDiaMes = (mes, anyo) => {
  let primeroMes = new Date();
  primeroMes.setDate(1);
  primeroMes.setUTCFullYear(anyo);
  primeroMes.setMonth(mes);

  return primeroMes;
};

const generarMes = (mes, anyo) => {
  const tablaAgenda = document.querySelector("table");
  const bodyAgenda = tablaAgenda.querySelector("tbody");

  tablaAgenda.removeAttribute("x-data-index");
  tablaAgenda.setAttribute("x-data-index", anyo);

  let diasMesGenerados = 0;
  const primeroMes = obtenerPrimerDiaMes(mes, anyo);

  const eliminarMesHtml = () => {
    bodyAgenda.textContent = "";
  };

  const generarPrimeraSemana = () => {
    const primerDiaSemana = convertGetUCTDay[primeroMes.getUTCDay()];
    let primeraSemana = document.createElement("tr");
    let diaActual = 1;
    for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
      if (diaSemana < primerDiaSemana) {
        let nuevoDia = document.createElement("td");
        primeraSemana.appendChild(nuevoDia);
      } else {
        let nuevoDia = document.createElement("td");
        let nuevoDiaDiv = document.createElement("div");
        nuevoDiaDiv.innerText = diaActual++;
        nuevoDia.appendChild(nuevoDiaDiv);
        primeraSemana.appendChild(nuevoDia);
        diasMesGenerados++;
      }
    }
    return primeraSemana;
  };

  // const generarRestoMes = () => {
  //   let diasEnSemana = 0;
  //   let semana;
  //   for (
  //     let diaActual = diasMesGenerados + 1;
  //     diaActual <= totalDiasXMes[mes];
  //     diaActual++
  //   ) {
  //     if (diasEnSemana === 0) {
  //       semana = document.createElement("tr");
  //     }
  //     let nuevoDia = document.createElement("td");
  //     let nuevoDiaDiv = document.createElement("div");
  //     nuevoDiaDiv.innerText = diaActual;
  //     nuevoDia.appendChild(nuevoDiaDiv);
  //     semana.appendChild(nuevoDia);
  //     diasEnSemana++;
  //     if (diasEnSemana >= 7 || diaActual === totalDiasXMes[mes]) {
  //       diasEnSemana = 0;
  //       bodyAgenda.appendChild(semana);
  //     }
  //   }
  // };

  const generarRestoMes = () => {
    let diasEnSemana = 0;
    let semana;
    let semanas = [];
    for (
      let diaActual = diasMesGenerados + 1;
      diaActual <= totalDiasXMes[mes];
      diaActual++
    ) {
      if (diasEnSemana === 0) {
        semana = document.createElement("tr");
      }
      let nuevoDia = document.createElement("td");
      let nuevoDiaDiv = document.createElement("div");
      nuevoDiaDiv.innerText = diaActual;
      nuevoDia.appendChild(nuevoDiaDiv);
      semana.appendChild(nuevoDia);
      diasEnSemana++;
      if (diasEnSemana >= 7 || diaActual === totalDiasXMes[mes]) {
        diasEnSemana = 0;
        semanas.push(semana);
      }
    }
    return semanas;
  };

  eliminarMesHtml();
  let tituloMes = tablaAgenda.querySelector("thead th[colspan='5'  ]");
  tituloMes.innerText = meses[mes];

  bodyAgenda.appendChild(generarPrimeraSemana());
  generarRestoMes().map((semana) => bodyAgenda.appendChild(semana));

  // Evento click de cada uno de los dias de la agenda
  let dias = [...document.querySelectorAll("td div")];

  dias.map((elem) => {
    elem.addEventListener("click", abrirDetalleDia);
  });
};

function cambiarMes(sentido) {
  const tablaAgenda = document.querySelector("table");

  const tituloMes = tablaAgenda.querySelector("thead th[colspan='5'  ]");
  let anyo = Number(tablaAgenda.getAttribute("x-data-index"));

  let mes = meses.indexOf(tituloMes.innerText);
  if (mes === 0 && sentido === "A") {
    mes = 11;
    anyo--;
  } else if (mes === 11 && sentido === "S") {
    anyo++;
    mes = 0;
  } else {
    "S" === sentido ? mes++ : mes--;
  }
  generarMes(mes, anyo);
}

// Generación agenda
let hoy = new Date();
generarMes(hoy.getMonth(), hoy.getUTCFullYear());

// Gestión de eventos de mes anterior y posterior
const MesAnterior = document.querySelector(
  "img[src ='./images/arrow-left.svg']"
);
MesAnterior.addEventListener("click", () => cambiarMes("A"));

const mesSiguiente = document.querySelector(
  "img[src ='./images/arrow-right.svg']"
);
mesSiguiente.addEventListener("click", () => cambiarMes("S"));

// Gestión de evento para cerrar el popup con el detalle de eventos de un dia
const close = [...document.querySelectorAll("img[src='./images/close.svg']")];

close.map((elem) => {
  elem.addEventListener("click", onClickClose);
});
