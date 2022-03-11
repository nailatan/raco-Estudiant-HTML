let convertDiaSemana = [6, 0, 1, 2, 3, 4, 5];
let totalMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

function generarMes(mes, anyo) {
  let primeroMes = new Date();
  primeroMes.setDate(1);
  primeroMes.setUTCFullYear(anyo);
  primeroMes.setMonth(mes);

  let primerDiaSemana = convertDiaSemana[primeroMes.getUTCDay()];

  let tituloMes = document.querySelector("thead th[colspan='5'  ]");
  tituloMes.innerText = meses[mes];
  let bodyAgenda = document.querySelector("tbody");

  while (bodyAgenda.firstChild) {
    bodyAgenda.removeChild(bodyAgenda.firstChild);
  }

  let primeraSemana = document.createElement("tr");
  let diasMesGenerados = 0;
  let diaActual = 1;
  for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
    if (diaSemana < primerDiaSemana) {
      let nuevoDia = document.createElement("td");
      primeraSemana.appendChild(nuevoDia);
    } else {
      let nuevoDia = document.createElement("td");
      let nuevoDIaDiv = document.createElement("div");
      nuevoDIaDiv.innerText = diaActual++;
      nuevoDia.appendChild(nuevoDIaDiv);
      primeraSemana.appendChild(nuevoDia);
      diasMesGenerados++;
    }
  }
  bodyAgenda.appendChild(primeraSemana);

  let diasEnSemana = 0;
  let semana;
  for (
    let diaActual = diasMesGenerados + 1;
    diaActual <= totalMes[mes];
    diaActual++
  ) {
    if (diasEnSemana === 0) {
      semana = document.createElement("tr");
    }
    let nuevoDia = document.createElement("td");
    let nuevoDIaDiv = document.createElement("div");
    nuevoDIaDiv.innerText = diaActual;
    nuevoDia.appendChild(nuevoDIaDiv);
    semana.appendChild(nuevoDia);
    diasEnSemana++;
    if (diasEnSemana >= 7 || diaActual === totalMes[mes]) {
      diasEnSemana = 0;
      bodyAgenda.appendChild(semana);
    }
  }

  let dias = [...document.querySelectorAll("td div")];

  dias.map((elem) => {
    elem.addEventListener("click", abrirDetalleDia);
  });
}

function cambiarMes(sentido) {
  let tituloMes = document.querySelector("thead th[colspan='5'  ]");
  let anyo = document.querySelector("#anyoAgenda");
  let mes = meses.indexOf(tituloMes.innerText);
  if (mes === 0 && sentido === "A") {
    mes = 11;
    anyo.innerText = anyo.innerText - 1;
  } else if (mes === 11 && sentido === "S") {
    anyo.innerText = Number(anyo.innerText) + 1;
    mes = 0;
  } else {
    "S" === sentido ? mes++ : mes--;
  }
  generarMes(mes, anyo.innerText);
}

let agenda = document.querySelector("#contenedorAgenda");

let hoy = new Date();
generarMes(hoy.getMonth(), hoy.getUTCFullYear());

let close = [...document.querySelectorAll("img[src='./images/close.svg']")];

close.map((elem) => {
  elem.addEventListener("click", onClickClose);
});

let MesAnterior = document.querySelector("img[src ='./images/arrow-left.svg']");
MesAnterior.addEventListener("click", () => cambiarMes("A"));

let mesSiguiente = document.querySelector(
  "img[src ='./images/arrow-right.svg']"
);
mesSiguiente.addEventListener("click", () => cambiarMes("S"));
