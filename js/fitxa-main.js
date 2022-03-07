function gestionaTabs(url) {
  console.log(url);
  let diaAdia = document.querySelector("#container div:nth-child(1)");
  let fitxa = document.querySelector("#container div:nth-child(2)");

  fitxa.style.display = url === "Fitxa" ? "block" : "none";
  diaAdia.style.display = url === "Dia a dia" ? "block" : "none";
  console.log(fitxa.style.display);
}

function onClickFitxa(e) {
  e.preventDefault();
  gestionaTabs(this.innerText);
}
let close = [...document.querySelectorAll("li")];

close.map((elem) => {
  elem.addEventListener("click", onClickFitxa);
});

gestionaTabs("Dia a dia");
