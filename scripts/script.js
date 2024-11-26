let ajusteResolx = (window.innerWidth === 1920) ? 0 : 180;
let ajusteResoly = (window.innerHeight === 1080) ? 0 : 22;
const canvas = document.getElementById("screen");
const ctx = canvas.getContext('2d');

const baseWidth = 1440;
const baseHeight = 900;

let scaleX = window.innerWidth / baseWidth;
let scaleY = window.innerHeight / baseHeight;

let currentMap = 'mapas/mapa01.png';
let mapImages = {};
let loadedMaps = 0;
const totalMaps = 4;
let imgHeight = 0;
let imgWidth = 0;
let cameraX = 0;
let cameraY = 0;
let zoomLevel = 2.8;
let gameStarted = false;
let keys = {};
let msg = false;
let intera = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scaleX = window.innerWidth / baseWidth;
    scaleY = window.innerHeight / baseHeight;
});

window.addEventListener('keydown', function (event) {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', function (event) {
    keys[event.key.toLowerCase()] = false;
    if (event.key.toLowerCase() === 'e' && !intera) {
        verificaInteracao();
    }
});

function loadMapImages() {
    for (let i = 1; i <= totalMaps; i++) {
        let img = new Image();
        img.src = `mapas/mapa0${i}.png`;
        img.onload = () => {
            loadedMaps++;
            mapImages[`mapas/mapa0${i}.png`] = img;

            if (`mapas/mapa0${i}.png` === currentMap) {
                imgWidth = img.width * zoomLevel;
                imgHeight = img.height * zoomLevel;
            }

            if (loadedMaps === totalMaps) {
                showStartScreen();
            }
        };
        img.onerror = () => {
            console.error(`Erro ao carregar a imagem: mapas/mapa0${i}.png`);
        };
    }
}

const eu = {
    sx: 8,
    sy: 6,
    pX: 880,
    pY: 570,
    altura: 47,
    gordura: 43,
    speed: 1,
    health: 100,
    tamanhox: 10,
    tamanhoy: 10,
    desenha() {
        let eusprite = new Image();
        eusprite.src = 'img/careca.png';
        desenharMapa();

        if (msg) {
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.fillText(`Aperte E para escavar`, 240, 360);
        }

        ctx.drawImage(
            eusprite,
            this.sx, this.sy,
            this.gordura, this.altura,
            this.pX, this.pY,
            this.gordura + this.tamanhox, this.altura + this.tamanhoy
        );
    },
    atualiza() {
        movimentarEu();
    }
};

function desenharMapa() {
    let img = new Image();
    img.src = currentMap;

    if (currentMap === "mapas/mapa01.png") {
        zoomLevel = 2.8;
        eu.tamanhox = 10;
        eu.tamanhoy = 10;
        eu.speed = 4;
    } else if (currentMap === "mapas/mapa02.png") {
        zoomLevel = 3.5;
        eu.tamanhox = 20;
        eu.tamanhoy = 20;
        eu.speed = 4;
    } else if (currentMap === "mapas/mapa03.png") {
        zoomLevel = 4.3;
        eu.tamanhox = 30;
        eu.tamanhoy = 30;
        eu.speed = 3;
    } else if (currentMap === "mapas/mapa04.png") {
        zoomLevel = 2.9;
        eu.tamanhox = 12;
        eu.tamanhoy = 12;
        eu.speed = 4;
    }

    ctx.drawImage(
        img,
        cameraX, cameraY,
        canvas.width / zoomLevel, canvas.height / zoomLevel,
        0, 0, canvas.width, canvas.height
    );
}

function movimentarEu() {
    if (keys['w'] || keys['ArrowUp']) {
        eu.pY -= eu.speed;
    }
    if (keys['s'] || keys['ArrowDown']) {
        eu.pY += eu.speed;
    }
    if (keys['a'] || keys['ArrowLeft']) {
        eu.pX -= eu.speed;
    }
    if (keys['d'] || keys['ArrowRight']) {
        eu.pX += eu.speed;
    }

    cameraX = Math.max(0, Math.min(eu.pX - canvas.width / 2, imgWidth - canvas.width));
    cameraY = Math.max(0, Math.min(eu.pY - canvas.height / 2, imgHeight - canvas.height));

    verificaTransicao();
}

function verificaTransicao() {
    if (currentMap === 'mapas/mapa01.png' && eu.pX > 1300) {
        currentMap = 'mapas/mapa02.png';
        eu.pX = 50;
    }
    if (currentMap === 'mapas/mapa02.png' && eu.pX < 50) {
        currentMap = 'mapas/mapa01.png';
        eu.pX = 1300;
    }
}

loadMapImages();
