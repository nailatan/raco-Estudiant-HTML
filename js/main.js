function onClickButtonEvent(e) {
  let popup = document.querySelector("#detalleDia");
  popup.style.display = "block";
}

function onClickClose(e) {
  let popup = document.querySelector("#detalleDia");
  popup.style.display = "none";
}

let agenda = document.querySelector("#contenedorAgenda");

let dias = [...document.querySelectorAll("td div")];

dias.map((elem) => {
  elem.addEventListener("click", onClickButtonEvent);
});

let close = [...document.querySelectorAll("img[src='./images/close.svg']")];

close.map((elem) => {
  elem.addEventListener("click", onClickClose);
});
