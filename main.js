const JUEGO_DIV = document.createElement("div");
JUEGO_DIV.classList.add("contenedor_juego");
const puntoDiv = document.querySelector(".puntos");
const contadorDiv = document.querySelector(".contador");
let contadorNumber = 3;
let timer = null;
const boingSound = new Audio("./boing.mp3");
const backgroundSound = new Audio("./audio_backgroundSound.ogg");
const gameOverSound = new Audio("./sounds_gameover_sound.mp3");
backgroundSound.loop = true;
let isFirstClick = true;

document.body.appendChild(JUEGO_DIV);
let nivel = 2;

function createJuego() {
  addCuadros();
}

function addCuadros() {
  JUEGO_DIV.innerHTML = "";
  const numeroDeCuadro = nivel == 2 ? 4 : nivel * nivel;
  const numeroAleatorio = Math.floor(Math.random() * numeroDeCuadro); // numero random de 0 al 2 (aunque nunca va a llegar al dos, se queda en 1.99)
  const randomColor = obtenerColorRandom();

  JUEGO_DIV.style.cssText = `grid-template-rows: repeat(${nivel}, 1fr)`;
  JUEGO_DIV.style.cssText = `grid-template-columns: repeat(${nivel}, 1fr)`;

  for (let index = 0; index < numeroDeCuadro; index++) {
    let cuadro = document.createElement("div"); // create = crear - element = elemento | createElement = crea un elemento
    cuadro.addEventListener("click", onCuadroClick);
    cuadro.classList.add("cuadro");
    cuadro.style.backgroundColor = `rgb(${randomColor})`;

    if (index === numeroAleatorio) {
      cuadro.classList.add("unico");
      cuadro.style.backgroundColor = `rgba(${randomColor},.50)`;
    }

    JUEGO_DIV.appendChild(cuadro);
    puntoDiv.innerText = `Punto(s): ${nivel}`;
    contadorDiv.innerText = `contador: ${contadorNumber}`;
    contadorNumber = 3;
  }
}

function gameOver() {
  backgroundSound.pause();
  gameOverSound.play();
  clearInterval(timer);
  alert("Has perdido");
  nivel = 2;
  contadorNumber = 3;
  addCuadros();
  isFirstClick = true;
}

function subirNivel() {
  nivel++;
  addCuadros();
}

function onCuadroClick(event) {
  if (isFirstClick) {
    backgroundSound.play();
    initContador();
  }
  isFirstClick = false;
  boingSound.currentTime = 0;
  boingSound.play();
  const cuadroClicked = event.target; // target = objectivo

  if (cuadroClicked.classList.contains("unico")) {
    subirNivel();
  }
}

function obtenerColorRandom() {
  const red = Math.floor(Math.random() * 255); // 0 - 255 = 18
  const green = Math.floor(Math.random() * 255); // 0 - 255 = 28
  const blue = Math.floor(Math.random() * 255); // 0 - 255 = 100
  // return red + "," + green + "," + blue - Esta es otra forma de hacer lo que esta abajo pero hay que escribir mucho y no es
  // elegant
  return `${red},${green},${blue}`;
}
function initContador() {
  contadorNumber = 3;
  clearInterval(timer);
  timer = setInterval(() => {
    contadorNumber--;
    contadorDiv.innerText = `contador: ${contadorNumber}`;

    if (contadorNumber == 0) {
      gameOver();
    }
  }, 1000); // 1000ms = 1s
}

createJuego();
