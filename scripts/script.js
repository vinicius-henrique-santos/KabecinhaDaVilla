let ajusteResolx = (window.innerWidth === 1920) ? 0 : 180;
let ajusteResoly = (window.innerWidth === 1920) ? 0 : 22;
const canvas = document.getElementById("screen");
const ctx = canvas.getContext('2d');

const baseWidth = 1440;
const baseHeight = 900;

const scaleX = window.innerWidth / baseWidth;
const scaleY = window.innerHeight / baseHeight;

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
let msg = false;
let intera=false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    scaleX = window.innerWidth / baseWidth;
    scaleY = window.innerHeight / baseHeight;
});

window.addEventListener('keydown', function(event){
    keys[event.key] = true;
});

window.addEventListener('keyup', function(event){
    keys[event.key] = false;
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
    pX : 880,  
    pY : 570,  
    altura: 47,
    gordura: 43,
    speed: 1,
    health: 100,
    tamanhox:10,
    tamanhoy:10,
    desenha() {
        let eusprite = new Image();
        eusprite.src = 'img/careca.png';
        //desenha funções
        desenharMapa();
        desenhaaoFundo();
        if(msg){
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.fillText(`Aperte E para escavar`, 240, 360);
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
        if(tiro){
            ctx.fillRect(posX, posY, 10, 5);
            let intervaloTiro = setInterval(() => {
                ctx.clearRect(posX, posY, 10, 5);
    
                posY -= 3; 
    
                ctx.fillStyle = "black";
                ctx.fillRect(posX, posY, 10, 5); 
    
                if (posY < 0 || posY > canvas.height) { 
                    clearInterval(intervaloTiro); 
                    tiro = false;
                }
            }, 30);
        }
        desenhaHud();
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

window.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
    if (event.key.toLowerCase() === 'e' && !intera) {
        verificaInteracao(); 
    }
});


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
        eu.speed = 4;
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

let animating = false;
function movimentarEu() {
    let prevX = eu.pX;
    let prevY = eu.pY;

    if (keys['ArrowUp'] || keys['w']) {
        eu.pY -= eu.speed;
        if (!animating) {
            animating = true;
            eu.sx = (eu.sx === 5) ? 53 : (eu.sx === 53) ? 100 : 5;
            eu.sy = 148;
            setTimeout(() => animating = false, 60); 
        }
    }
    if (keys['ArrowDown'] || keys['s']) {
        eu.pY += eu.speed;
        if (!animating) {
            animating = true;
            eu.sx = (eu.sx === 5) ? 53 : (eu.sx === 53) ? 100 : 5;
            eu.sy = 4;
            setTimeout(() => animating = false, 60); 
        }
    }
    if (keys['ArrowLeft'] || keys['a']) {
        let bugCam = cameraX <= 0 ? 4 : 0;
        eu.pX -= (eu.speed+bugCam);
        if (!animating) {
            animating = true;
            eu.sx = (eu.sx === 5) ? 53 : (eu.sx === 53) ? 100 : 5;
            eu.sy = 53;
            setTimeout(() => animating = false, 60); 
        }
    }
    if (keys['ArrowRight'] || keys['d']) {
        let bugCam = cameraX <= 0 ? 4 : 0;
        eu.pX += (eu.speed+bugCam);
        if (!animating) {
            animating = true;
            eu.sx = (eu.sx === 5) ? 53 : (eu.sx === 53) ? 100 : 5;
            eu.sy = 100 ;
            setTimeout(() => animating = false, 60); 
        }
    }
    
    if (eu.pX < canvas.width / 2) {
        cameraX = 0; 
    } else if (eu.pX > imgWidth - canvas.width / 2) {
        cameraX = imgWidth - canvas.width; 
    } else {
        cameraX = eu.pX - canvas.width / 2; 
    }

    if (eu.pY < canvas.height / 2) {
        cameraY = 0; 
    } else if (eu.pY > imgHeight - canvas.height / 2) {
        cameraY = imgHeight - canvas.height; 
    } else {
        cameraY = eu.pY - canvas.height / 2;
    }
    
    if(verificaColisao()){
        resolveColisao();
    }
    
    let jogadorX = eu.pX / zoomLevel + cameraX;
    let jogadorY = eu.pY / zoomLevel + cameraY;
    let jogadorLargura = eu.gordura / zoomLevel;
    let jogadorAltura = eu.altura / zoomLevel;

    if(
        currentMap === 'mapas/mapa01.png' &&
        jogadorX + jogadorLargura > 2 &&
        jogadorX < 2 + 21 &&
        jogadorY + jogadorAltura > 578 &&
        jogadorY < 578 + 21
    ) {
        currentMap = 'mapas/mapa02.png';
        eu.pX=1158-ajusteResolx;
        eu.pY=596-ajusteResoly;
    }
    
    if(
        currentMap === 'mapas/mapa02.png' &&
        jogadorX + jogadorLargura > 600 &&
        jogadorX < 600 + 21 &&
        jogadorY + jogadorAltura > 300 &&
        jogadorY < 300 + 21
    ) {
        currentMap = 'mapas/mapa01.png';
        eu.pX=80;
        eu.pY=776-ajusteResoly;
    }
    
    if(
        currentMap === 'mapas/mapa02.png' &&
        jogadorX + jogadorLargura > 287 &&
        jogadorX < 287 + 40 &&
        jogadorY + jogadorAltura > 587 &&
        jogadorY < 587 + 32
    ) {
        currentMap = 'mapas/mapa04.png';
        eu.pX=800;
        eu.pY=680+ajusteResoly;
        eu.sx = (eu.sx === 5) ? 5 : (eu.sx === 53) ? 100 : 5;
        eu.sy = 148;
    }

    if(
        currentMap === 'mapas/mapa02.png' &&
        jogadorX + jogadorLargura > 160 &&
        jogadorX < 160 + 24 &&
        jogadorY + jogadorAltura > 220 &&
        jogadorY < 220 + 23
    ) {
        currentMap = 'mapas/mapa03.png';
        eu.pX=726;
        eu.pY=620-ajusteResoly;
    }

    if(
        currentMap === 'mapas/mapa03.png' &&
        jogadorX + jogadorLargura > 175 &&
        jogadorX < 175 + 14 &&
        jogadorY + jogadorAltura > 345 &&
        jogadorY < 345 + 23
    ) {
        let ajusteMercado = 0;
        if(ajusteResoly!=0){
            ajusteMercado=ajusteResoly-18;
        }
        currentMap = 'mapas/mapa02.png';
        eu.pX=560;
        eu.pY=605+ajusteMercado;
    }

    if(
        currentMap === 'mapas/mapa04.png' &&
        jogadorX + jogadorLargura > 100 &&
        jogadorX < 115 && 
        jogadorY + jogadorAltura > 80 &&
        jogadorY < 95 &&
        keys['e']
        
    ) {
        currentMap = 'mapas/mapa01.png';
        let ajuste = 0;
        if(ajusteResolx!=0){
            ajuste = 750;
        }
        eu.pX=1900-ajuste;
        eu.pY=450;
        ajusteX = cameraX < 0 ? 0 : cameraX;
        ajusteY = cameraY < 0 ? 0 : cameraY;
    }

    if (
        currentMap === 'mapas/mapa04.png' &&
        jogadorX + jogadorLargura > 100 &&
        jogadorX < 115 && 
        jogadorY + jogadorAltura > 80 &&
        jogadorY < 95
    ) {
        msg=true;
        intera = true;
    } 
    else{
        msg=false;
        intera = false;
    }
    atualizaCamera();
}

function resolveColisao() {
    let colisoesAtuais;
    if (currentMap === 'mapas/mapa01.png') {
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 1);
    } else if (currentMap === 'mapas/mapa02.png') {
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 2);
    } else if (currentMap === 'mapas/mapa03.png') {
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 3);
    } else if (currentMap === 'mapas/mapa04.png') {
        colisoesAtuais = colisoes.filter(colisao => colisao.mapa === 4);
    }

    let jogadorX = eu.pX / zoomLevel + cameraX;
    let jogadorY = eu.pY / zoomLevel + cameraY;
    let jogadorLargura = eu.gordura / zoomLevel;
    let jogadorAltura = eu.altura / zoomLevel;

    let colisaoEncontrada = null;

    colisoesAtuais.some(colisao => {
        if (
            jogadorX + jogadorLargura > colisao.x &&
            jogadorX < colisao.x + colisao.largura &&
            jogadorY + jogadorAltura > colisao.y &&
            jogadorY < colisao.y + colisao.altura
        ) {
            colisaoEncontrada = colisao;
        }
    });
    if(((colisaoEncontrada.x-colisaoEncontrada.largura)/2) < eu.pX){
        eu.pX += 3;
    }

    if(colisaoEncontrada===null){
        return;
    }
    resolveColisao();
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

        ctx.strokeStyle = 'red';
        ctx.strokeRect(
            (colisao.x - ajusteX) * zoomLevel, // Ajuste com câmera e zoom para o desenho
            (colisao.y - ajusteY) * zoomLevel, // Ajuste com câmera e zoom para o desenho
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
        posX = eu.pX; 
    }
}


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    eu.atualiza();
    eu.desenha();
    desenhaColisoes();
    verificaInteracao();
    requestAnimationFrame(loop);
    if (keys['e']) { 
        if (!intera) {
            atira();
        }
    }
}
loadMapImages();

