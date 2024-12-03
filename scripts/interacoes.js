let animating = false;
let bandidosEliminados = false;
let gameComplete = false;
let chave = false;
let pa = false;
let cartaTxt = false;
let msgBarril = false;
let msgRPA = false;
let msg = false;

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

    
    if (verificaColisao()) {
        eu.pX = prevX;
        eu.pY = prevY;
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
        eu.pX=1158;
        eu.pY=636;
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
        eu.pY=816;
    }
    
    if(
        currentMap === 'mapas/mapa02.png' &&
        jogadorX + jogadorLargura > 287 &&
        jogadorX < 287 + 40 &&
        jogadorY + jogadorAltura > 587 &&
        jogadorY < 587 + 32
    ) {
        currentMap = 'mapas/mapa04.png';
        eu.pX=980;
        eu.pY=750;
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
        eu.pY=620;
    }

    if(
        currentMap === 'mapas/mapa03.png' &&
        jogadorX + jogadorLargura > 175 &&
        jogadorX < 175 + 14 &&
        jogadorY + jogadorAltura > 345 &&
        jogadorY < 345 + 23
    ) { 
        currentMap = 'mapas/mapa02.png';
        eu.pX=560;
        eu.pY=605;
    }

    if(
        currentMap === 'mapas/mapa04.png' &&
        jogadorX + jogadorLargura > 100 &&
        jogadorX < 115 && 
        jogadorY + jogadorAltura > 80 &&
        jogadorY < 95 &&
        pa &&
        keys['e'] 
    ) {
        currentMap = 'mapas/mapa01.png';
        eu.pX=1350;
        eu.pY=450;
        ajusteX = cameraX < 0 ? 0 : cameraX;
        ajusteY = cameraY < 0 ? 0 : cameraY;
    }

    if (
        currentMap === 'mapas/mapa04.png' &&
        jogadorX + jogadorLargura > 100 &&
        jogadorX < 115 && 
        jogadorY + jogadorAltura > 80 &&
        jogadorY < 95 &&
        pa
    ) {
        msg=true;
    } 

    
    if (
        currentMap === 'mapas/mapa03.png' &&
        jogadorX + jogadorLargura >= 0 &&
        jogadorX <= 300 && 
        jogadorY + jogadorAltura >= 0 &&
        jogadorY <= 300
    ) {
        intera=true;
        if(!comprado){
            msgcom = true;
        }
    } 

    if (
        currentMap === 'mapas/mapa03.png' &&
        keys['e']
    ) {
        comprado = true;
        intera=false;
        msgcom = false;
    } 

    if(!comprado && currentMap==='mapas/mapa01.png' || !comprado && currentMap==='mapas/mapa02.png'){
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(`Ache o mercado para pegar os itens`, 100, 100);
    }
    if (currentMap === 'mapas/mapa04.png') {
        if (!bandidosEliminados) {
            if (keys['t']) {
                atira();
            }
        }
    }
    
    
    if (currentMap === 'mapas/mapa04.png' &&
        jogadorX > 390 && jogadorX < 420 &&
        jogadorY > 390 && jogadorY < 420 && keys['e']) {
        cartaTxt = true;
    }
    if(cartaTxt && keys['q']){
        cartaTxt = false;
        chave = true;
    }
    if(
        comprado &&
        currentMap === 'mapas/mapa02.png' &&
        eu.pX > 1100 &&
        cut < 1
    ){
       playCutscene2();
    }

    if(currentMap === 'mapas/mapa04.png' &&
        jogadorX > 90 && jogadorX < 150 &&
        jogadorY > 200 && jogadorY < 300 && chave) {
        msgBarril = true;
    }

    if(currentMap === 'mapas/mapa04.png' &&
        jogadorX > 130 && jogadorX < 150 &&
        jogadorY > 200 && jogadorY < 300 && 
        keys['e']){
            msgBarril = false;
            pa = true;
            msgRPA = true;
    }

    if (currentMap === 'mapas/mapa01.png' && comprado) {
        showThanks = true; 
        
    }

    else {
        msg = false;
        msgcom = false;
        intera = false;
        msgBarril = false;
    }
    atualizaCamera();
    
}

function playCutscene2() {
    gamePaused = true; 

    const cutscene2 = document.createElement('video');
    cutscene2.src = 'cutscene/cutscene2.mp4';
    cutscene2.type = 'video/mp4';
    cutscene2.style.position = 'absolute';
    cutscene2.style.top = '0';
    cutscene2.style.left = '0';
    cutscene2.style.width = '100%';
    cutscene2.style.height = '100%';
    cutscene2.style.zIndex = '9999';
    cutscene2.autoplay = true; 
    cutscene2.controls = false;
    document.body.appendChild(cutscene2);

    cutscene2.onended = function () {
        document.body.removeChild(cutscene2);
        cut ++;
        playDica();
    };
}

function playDica(){
    gamePaused = true; 

    const dica = document.createElement('video');
    dica.src = 'img/transicao.mp4';
    dica.type = 'video/mp4';
    dica.style.position = 'absolute';
    dica.style.top = '0';
    dica.style.left = '0';
    dica.style.width = '100%';
    dica.style.height = '100%';
    dica.style.zIndex = '9999';
    dica.autoplay = true; 
    dica.controls = false;
    document.body.appendChild(dica);

    dica.onended = function () {
        document.body.removeChild(dica);
        gamePaused = false; 
        currentMap = 'mapas/mapa04.png';
        eu.pX=980;
        eu.pY=780;
        eu.sx = (eu.sx === 5) ? 5 : (eu.sx === 53) ? 100 : 5;
        eu.sy = 148;
        loop();
    }
}