const canvas = document.getElementById("screen");
const ctx = canvas.getContext('2d');

let currentMap = 'mapas/mapa01.png';  
let mapImages = {};
let loadedMaps = 0;
const totalMaps = 4;
let imgHeight=0;
let imgWidth=0;
let cameraX = 0;
let cameraY = 0;
let zoomLevel = 2.8;
let gameStarted = false;
let keys = {};
let comprado = false;
let msgcom = false;
let desenhaBandi = true;
let gamePaused = false; 
let cut = 0;
let showThanks = false;



const imgDica = new Image();
imgDica.src = 'img/dica.png';

const obg = new Image();
obg.src = "img/cartafinal.png";

const cartachave = new Image();
cartachave.src = "img/cartachave.png";
cartachave.style.zIndex='999';

const prateleira = new Image();
prateleira.src = "img/prateleira.png";

const atire = new Image();
atire.src = "img/atire.png";

const preto = new Image();
preto.src = "img/preto.jpg";

window.addEventListener('keydown', function(event){
    keys[event.key] = true;
});

window.addEventListener('keyup', function(event){
    keys[event.key] = false;
});


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
                bordaW = img.width;
                bordaH = img.height;
            }

            if (loadedMaps === totalMaps) {
                showStartScreen();
            }

        };
        img.onerror = () => {
            console.error(`Erro ao carregar a imagem: img/mapa0${i}.png`);
        };
    }
}
if(currentMap==='mapas/mapa01.png'){
    mapaAtual = 1;
} else if(currentMap==='mapas/mapa02.png'){
    mapaAtual = 2;
} else if(currentMap==='mapas/mapa03.png'){
    mapaAtual = 3;
} else if(currentMap==='mapas/mapa04.png'){
    mapaAtual = 4;
}
const eu = {
    sx: 8, 
    sy: 6,
    pX : 900,  // 900
    pY : 570, 
    altura: 47,
    gordura: 43,
    speed: 3,
    health: 100,
    tamanhox:10,
    tamanhoy:10,
    desenha() {
        let eusprite = new Image();
        eusprite.src = 'img/careca.png';

        //desenha funções
        desenharMapa();
        desenhaaoFundo();
        if (currentMap === 'mapas/mapa03.png' && !comprado) {
            ctx.drawImage(prateleira, 240, 220, 370, 160);
        }
        
        if (currentMap === 'mapas/mapa04.png') {
            if (desenhaBandi) {
                ctx.drawImage(atire, canvas.width/2, 200, 300, 300);
            }
        }
        if(pa){
            ctx.fillStyle = 'black';
            ctx.font = '17px Arial';
            ctx.fillText(`Vc ganhou uma pá`, 150, 180);
        }
        ctx.drawImage(
            eusprite,
            this.sx, this.sy,
            this.gordura, this.altura,
            this.pX, this.pY,
            this.gordura + zoomLevel + this.tamanhox, this.altura + zoomLevel + this.tamanhoy
        );
        desenhaObj();
        desenhaNpc();
        if (tiro) {
            let disparo = 6;
            let intervaloTiro = setInterval(() => {
                ctx.clearRect(posX, posY, 7, 7);
                posY -= disparo; 
                ctx.fillStyle = "red";
                ctx.fillRect(posX, posY, 7, 7); 
        
                disparo++;
        
                if (disparo === 9) {
                    desenhaBandi = false;
                    clearInterval(intervaloTiro);
                    disparo = 6;
                    tiro = false;
                    eu.speed = 4;
                }
            }, 30);
        }
        if(!desenhaBandi && currentMap==='mapas/mapa04.png'){
            ctx.drawImage(imgDica, 150, 150, 220, 120);

        }
        
        desenhaHud();
        if (showThanks) {
            ctx.drawImage(
                obg,
                0, 0,
                canvas.width, canvas.height
            );
            eu.speed = 0;
        }
        if(cartaTxt){
            ctx.drawImage(preto, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(cartachave, 500, 0, 900, 900);
        }
    },
    atualiza() {
        movimentarEu();
    }
};

function atualizaCamera() {
    let targetCameraY = eu.pY - canvas.height / 2;

    if (cameraY < targetCameraY) {
        cameraY += (targetCameraY - cameraY) * 0.4; 
    } else {
        cameraY = targetCameraY; 
    }

    cameraX = eu.pX - canvas.width / 2;

    cameraX = Math.max(0, Math.min(cameraX, imgWidth - canvas.width));
    cameraY = Math.max(0, Math.min(cameraY, imgHeight - canvas.height));
}



function desenharMapa() {
    let img = new Image();
    let ajusteMapa;
    img.src = currentMap;
    if(currentMap==="mapas/mapa01.png"){
        ajusteMapa=0;
        zoomLevel=2.8;
        eu.tamanhox=10;
        eu.tamanhoy=10;
        eu.speed = 4;
    }
    if(currentMap==="mapas/mapa02.png"){
        ajusteMapa=40;
        zoomLevel=3.5;
        eu.tamanhox=20;
        eu.tamanhoy=20;
        eu.speed = 4;
    }
    if(currentMap==="mapas/mapa03.png"){
        ajusteMapa=24;
        zoomLevel=4.3;
        eu.tamanhox=30;
        eu.tamanhoy=30;
        eu.speed = 3;
    }
    if(currentMap==="mapas/mapa04.png"){
        ajusteMapa=0;
        zoomLevel=2.9;
        eu.tamanhox=12;
        eu.tamanhoy=12;
    }
    ctx.drawImage(
        img,
        cameraX-ajusteMapa, cameraY,                        
        canvas.width / zoomLevel, canvas.height / zoomLevel,
        0, 0, canvas.width, canvas.height
    );
}
let movCam = false;

function verificaCamMov(){
    if(cameraX===prevCamX || cameraY===prevCamY){
        movCam=false;
    } else {
        movCam=true;
    }
    prevCamX = cameraX;
    prevCamY = cameraY;
}

function desenhaColisoes() {
    let colisoesAtuais;
    if(currentMap==='mapas/mapa01.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 1);
    } else if(currentMap==='mapas/mapa02.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 2);
    } else if(currentMap==='mapas/mapa03.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 3);
    } else if(currentMap==='mapas/mapa04.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 4);
    }
    colisoesAtuais.forEach(colisao => {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let ajusteY = cameraY < 0 ? 0 : cameraY;

        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(
            (colisao.x - ajusteX) * zoomLevel,
            (colisao.y - ajusteY) * zoomLevel, 
            colisao.largura * zoomLevel, 
            colisao.altura * zoomLevel
        );
    });
}

function verificaColisao() {
    let colisoesAtuais;
    if(currentMap==='mapas/mapa01.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 1);
    } else if(currentMap==='mapas/mapa02.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 2);
    } else if(currentMap==='mapas/mapa03.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 3);
    } else if(currentMap==='mapas/mapa04.png'){
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 4);
    }
    return colisoesAtuais.some(colisao => {
        let jogadorX = eu.pX / zoomLevel + cameraX;
        let jogadorY = eu.pY / zoomLevel + cameraY;
        let jogadorLargura = eu.gordura / zoomLevel;
        let jogadorAltura = eu.altura / zoomLevel;


        return (
            jogadorX + jogadorLargura > colisao.x &&
            jogadorX < colisao.x + colisao.largura &&
            jogadorY + jogadorAltura > colisao.y &&
            jogadorY < colisao.y + colisao.altura
        );
    });
}


function desenhaHud(){
    const hud = new Image();
    hud.src = 'img/hud.png';
    if(gameStarted){
        ctx.drawImage(
            hud,
            0, 0,
            canvas.width, canvas.height
        );
    }
}


let tiro = false;
let posY = null; 
let posX = null; 

function atira() {
    if (!tiro) { 
        tiro = true; 
        posY = eu.pY; 
        posX = eu.pX + (eu.gordura / 2); 
    }
}




const video = document.createElement('video');
video.src = 'img/telaInicial.mp4';
video.loop = true;
video.muted = true;
video.autoplay = true;
video.style.position = 'absolute';
video.style.top = '0';
video.style.left = '0';
video.style.width = '100%';
video.style.height = '100%';
video.style.zIndex = '0';
document.body.appendChild(video);

function showStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(showStartScreen); 
}

function startGame() {
    if (!gameStarted) {
        window.removeEventListener('click', startGame);
        gameStarted = true;
        document.body.removeChild(video);

        
        const cutscene1 = document.createElement('video');
        cutscene1.src = 'cutscene/cutscene1.mp4';
        cutscene1.type = 'video/mp4';
        cutscene1.style.position = 'absolute';
        cutscene1.style.top = '0';
        cutscene1.style.left = '0';
        cutscene1.style.width = '100%';
        cutscene1.style.height = '100%';
        cutscene1.style.zIndex = '9999';
        document.body.appendChild(cutscene1);

        cutscene1.play();

        function removeCutscene() {
            cutscene1.pause();
            cutscene1.src = "";
            document.body.removeChild(cutscene1);
            document.removeEventListener('keydown', skipCutscene); 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
        }

        function skipCutscene(event) {
            if (event.key === 'q' || event.key === 'Q') {
                removeCutscene(); 
                loop();
            }
        }

        document.addEventListener('keydown', skipCutscene);

        cutscene1.onended = function () {
            removeCutscene(); 
            loop();
        };
    }
}

function loop() {
    if (gamePaused) {
        requestAnimationFrame(loop); 
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    eu.atualiza();
    eu.desenha();
    desenhaColisoes();
    requestAnimationFrame(loop);
}
loadMapImages();
window.addEventListener('click', startGame);
