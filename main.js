const JUEGO_DIV = document.querySelector(".juego");
let nivel = 1;

function createJuego() {
  addCuadros();
}

function addCuadros() {
    const numeroDeCuadro = nivel == 1 ? 2 : nivel * nivel;
  const numeroAleatorio = Math.floor(Math.random() * numeroDeCuadro);
  const randomColor = obtenerColorRandom();

  JUEGO_DIV.style.cssText = `grid-template-rows: repeat(${nivel}, 1fr)`;
  JUEGO_DIV.style.cssText = `grid-template-columns: repeat(${nivel}, 1fr)`;

  for (let index = 0; index < numeroDeCuadro; index++) {
    let cuadro = document.createElement("div");
    cuadro.addEventListener("click", onCuadroClick);
    cuadro.classList.add("cuadro");
    cuadro.style.backgroundColor = `rgb(${randomColor})`;

    if (index === numeroAleatorio) cuadro.style.backgroundColor = `rgba(${randomColor},0.80)`;
    JUEGO_DIV.appendChild(cuadro);
  }
}

function onCuadroClick(event) {
  const cuadroClicked = event.target;
  console.log(cuadroClicked.style.backgroundColor)
}

function obtenerColorRandom() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `${red},${green},${blue}`;
}

createJuego();
