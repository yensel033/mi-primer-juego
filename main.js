const JUEGO_DIV = document.querySelector('.juego');
const JUEGO_ANCHO = 400;
const JUEGO_ALTURA = 600;
let nivel = 1;
let numeroDeCuadro = 2;

function obtenerSize(nivelActual) {
    let sizes = {
        ancho: 0,
        altura: 0
    }
    if(nivelActual === 1){
        sizes.ancho = 400;
        sizes.altura = JUEGO_ALTURA / 2;
    }

    return sizes;
}

function createJuego() {
    addCuadros()
}

function addCuadros(){
    const SIZE = obtenerSize(nivel);
    const numeroAleatorio = Math.floor(Math.random() * numeroDeCuadro)
    
    for (let index = 0; index < numeroDeCuadro; index++) {
       let cuadro = document.createElement('div');
       cuadro.classList.add('cuadro');
        cuadro.style.width = SIZE.ancho + 'px';
        cuadro.style.height = SIZE.altura + 'px';
        console.log({numeroAleatorio})
        if(index === numeroAleatorio) cuadro.classList.add('active')
       JUEGO_DIV.appendChild(cuadro)
    }
}



createJuego()