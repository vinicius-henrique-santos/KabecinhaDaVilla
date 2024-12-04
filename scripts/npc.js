let personagens = [];
const erroP = 10;

const idosoImgs = [
    'npc/idoso.png',
    'npc/idoso3.png'  
];

const npcImg = new Image();
npcImg.src = idosoImgs[0]; 

const idoso = {
    frameAtual: 0,
    pX: 483,  
    pY: 242,  
    altura: 58,
    gordura: 60, 
    mapa: 1,
    intervaloFrame: 700, 
    ultimoTempoTroca: Date.now(),  
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let ajusteY = cameraY < 0 ? 0 : cameraY;

        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % idosoImgs.length;
            npcImg.src = idosoImgs[this.frameAtual];
        }

        ctx.drawImage(
            npcImg,
            0, 0,
            this.gordura, this.altura,  
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel + 5, this.altura + zoomLevel + 5 
        );
    }
};
personagens.push(idoso);


const cachorroimgs = [
    'npc/Cachorro.png',
    'npc/Cachorro2.png' 
];

const cachorroimg = new Image();
cachorroimg.src = cachorroimgs[0]; 

const cachorro = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 481,  
    pY : 261,  
    altura: 58,
    gordura: 60,
    mapa: 1,
    intervaloFrame: 1150, 
    ultimoTempoTroca: Date.now(), 
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % cachorroimgs.length;
            cachorroimg.src = cachorroimgs[this.frameAtual];
        }
        ctx.drawImage(
            cachorroimg,
            this.sx, this.sy,
            this.gordura, this.altura, 
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,  
            this.gordura + zoomLevel + 4, this.altura + zoomLevel + 4  
        );
    }
};
personagens.push(cachorro);


const galinhaImgs = [
    'npc/Galinha.png',
    'npc/Galinha2.png',
    'npc/Galinha3.png'
];

const galinhaImg = new Image();
galinhaImg.src = galinhaImgs[0];

const galinha = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 218,  
    pY : 267,  
    altura: 58,
    gordura: 60,
    mapa: 1,
    intervaloFrame: 850, 
    ultimoTempoTroca: Date.now(),
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let ajusteY = cameraY < 0 ? 0 : cameraY;

        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % galinhaImgs.length;
            galinhaImg.src = galinhaImgs[this.frameAtual];
        }

        ctx.drawImage(
            galinhaImg,
            this.sx, this.sy,
            this.gordura, this.altura,
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,
            this.gordura + zoomLevel + 5, this.altura + zoomLevel + 5
        );
    }
};
personagens.push(galinha);

const barcoImgs = [
    'npc/Barco.png',
    'npc/Barco2.png'
];

const barcoImg = new Image();
barcoImg.src = barcoImgs[0];

const barco = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 662,  
    pY : 426,  
    altura: 60,
    gordura: 60,
    mapa: 1,
    intervaloFrame: 750, 
    ultimoTempoTroca: Date.now(),
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let ajusteY = cameraY < 0 ? 0 : cameraY;

        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % barcoImgs.length;
            barcoImg.src = barcoImgs[this.frameAtual];
        }

        ctx.drawImage(
            barcoImg,
            this.sx, this.sy,
            this.gordura, this.altura,
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,
            this.gordura + zoomLevel + 45, this.altura + zoomLevel + 45
        );
    }
};
personagens.push(barco);

// Pescador
const pescadorImgs = [
    'npc/Pescador.png',
    'npc/Pescador2.png',
    'npc/Pescador3.png'
];

const pescadorImg = new Image();
pescadorImg.src = pescadorImgs[0];

const pescador = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 650,  
    pY : 458,  
    altura: 58,
    gordura: 60,
    mapa: 1,
    intervaloFrame: 750, 
    ultimoTempoTroca: Date.now(),
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let ajusteY = cameraY < 0 ? 0 : cameraY;

        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % pescadorImgs.length;
            pescadorImg.src = pescadorImgs[this.frameAtual];
        }

        ctx.drawImage(
            pescadorImg,
            this.sx, this.sy,
            this.gordura, this.altura,
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,
            this.gordura + zoomLevel + 14, this.altura + zoomLevel + 14
        );
    }
};
personagens.push(pescador);

const idosoBoinaImgs = [
    'npc/IdosodeBoina.png',
    'npc/IdosodeBoina2.png',
    'npc/IdosodeBoina3.png',
    'npc/IdosodeBoina4.png'
];

const idosoBoinaImg = new Image();
idosoBoinaImg.src = idosoBoinaImgs[0]; 

const boina = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 499,  
    pY : 194,  
    altura: 58,
    gordura: 60,
    mapa: 1,
    intervaloFrame: 750, 
    ultimoTempoTroca: Date.now(), 
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % idosoBoinaImgs.length;
            idosoBoinaImg.src = idosoBoinaImgs[this.frameAtual];
        }
        ctx.drawImage(
            idosoBoinaImg,
            this.sx, this.sy,
            this.gordura, this.altura,  
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,
            this.gordura + zoomLevel + 6, this.altura + zoomLevel + 6  
        );
    }
};
personagens.push(boina);

const minaimgs = [
    'npc/Mina.png',
    'npc/Mina2.png',
    'npc/Mina3.png'
];

const minaimg = new Image();
minaimg.src = minaimgs[0]; 


const mina = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 439-erroP,  
    pY : 192,  
    altura: 60,
    gordura: 60,
    mapa: 1,
    intervaloFrame: 650, 
    ultimoTempoTroca: Date.now(), 
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % minaimgs.length;
            minaimg.src = minaimgs[this.frameAtual];
        }
        ctx.drawImage(
            minaimg,
            this.sx, this.sy,
            this.gordura, this.altura, 
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,  
            this.gordura + zoomLevel + 8, this.altura + zoomLevel + 8
        );
    }
};
personagens.push(mina);

const cavaloimgs = [
    'npc/Cavalo.png',
    'npc/Cavalo2.png'
]
const cavaloimg = new Image();
cavaloimg.src = cavaloimgs[0]; 


const cavalo = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 215,  
    pY : 144,  
    altura: 60,
    gordura: 60,
    mapa: 1,
    intervaloFrame: 1350, 
    ultimoTempoTroca: Date.now(), 
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % cavaloimgs.length;
            cavaloimg.src = cavaloimgs[this.frameAtual];
        }
        ctx.drawImage(
            cavaloimg,
            this.sx, this.sy,
            this.gordura, this.altura, 
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,  
            this.gordura + zoomLevel + 8, this.altura + zoomLevel + 8
        );
    }
};
personagens.push(cavalo);
vendedoraImgs = [
    "npc/VestidoVerde.png"
];
const vendedoraImg = new Image();
vendedoraImg.src = vendedoraImgs[0];
const vendedora = {
    frameAtual: 0,
    sx: 1, 
    sy: 2,
    pX : 148,  
    pY : 103,  
    altura: 58,
    gordura: 60,
    mapa: 3,
    intervaloFrame: 1050, 
    ultimoTempoTroca: Date.now(),
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let ajusteY = cameraY < 0 ? 0 : cameraY;

        let tempoAtual = Date.now();
        if (tempoAtual - this.ultimoTempoTroca >= this.intervaloFrame) {
            this.ultimoTempoTroca = tempoAtual;
            this.frameAtual = (this.frameAtual + 1) % vendedoraImgs.length;
            vendedoraImg.src = vendedoraImgs[this.frameAtual];
        }

        ctx.drawImage(
            vendedoraImg,
            this.sx, this.sy,
            this.gordura, this.altura,
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,
            this.gordura + zoomLevel + 26, this.altura + zoomLevel + 26
        );
    }
};
personagens.push(vendedora);

// Objetos que estão a frente pdc?????????????
const arvoreimg = new Image();
arvoreimg.src = 'img/ArvoresE Cia.png';

const arvore = {
    sx: 240, 
    sy: 530,
    pX : 143,  
    pY : 577,  
    altura: 93,
    gordura: 48,
    mapa: 1,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            arvoreimg,
            this.sx, this.sy,
            this.gordura, this.altura,
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel + 17, this.altura + zoomLevel + 32
        );
    }
};
personagens.push(arvore);
const posteimg = new Image();
posteimg.src = 'img/ArvoresE Cia.png';

const poste = {
    sx: 530, 
    sy: 505,
    pX : 650,  
    pY : 494,  
    altura: 119,
    gordura: 43,
    mapa: 1,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            posteimg,
            this.sx, this.sy,
            this.gordura, this.altura, 
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel,
            this.gordura + zoomLevel + 8, this.altura + zoomLevel + 37
        );
    }
};
personagens.push(poste);

const arvore3img = new Image();
arvore3img.src = 'img/ArvoresE Cia.png';
const arvore3 = {
    sx: 240, 
    sy: 530,
    pX : 313,  
    pY : 410,  
    altura: 93,
    gordura: 48,
    mapa: 4,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            arvore3img,
            this.sx, this.sy,
            this.gordura, this.altura,  
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel + 8, this.altura + zoomLevel + 37
        );
    }
};
personagens.push(arvore3);

const arvore2img = new Image();
arvore2img.src = 'img/ArvoresE Cia.png';
const arvore2 = {
    sx: 240, 
    sy: 530,
    pX : 410,  
    pY : 410,  
    altura: 93,
    gordura: 48,
    mapa: 4,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            arvore2img,
            this.sx, this.sy,
            this.gordura, this.altura,  
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel + 8, this.altura + zoomLevel + 37
        );
    }
};
personagens.push(arvore2);

const cabanaimg = new Image();
cabanaimg.src = 'img/ArvoresE Cia.png';
const cabana = {
    sx: 387, 
    sy: 482,
    pX : 452,  
    pY : 644,  
    altura: 129,
    gordura: 137,
    mapa: 1,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            cabanaimg,
            this.sx, this.sy,
            this.gordura, this.altura,  
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel + 8, this.altura + zoomLevel + 37
        );
    }
};
personagens.push(cabana);

const b1img = new Image();
b1img.src = 'npc/Roxin.png';

const b1 = {
    sx: 0, 
    sy: 0,
    pX : 600,  
    pY : 310,  
    altura: 60,
    gordura: 60,
    mapa: 2,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            b1img,
            this.sx, this.sy,
            this.gordura, this.altura,
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel + 17, this.altura + zoomLevel + 32
        );
    }
};
personagens.push(b1);

const b2img = new Image();
b2img.src = 'npc/Vilão.png';
const b2 = {
    sx: 0, 
    sy: 0,
    pX : 600,  
    pY : 290,  
    altura: 60,
    gordura: 60,
    mapa: 2,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            b2img,
            this.sx, this.sy,
            this.gordura, this.altura,
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel + 17, this.altura + zoomLevel + 32
        );
    }
};
personagens.push(b2);

const cartaimg = new Image();
cartaimg.src = 'img/carta.png';
const carta = {
    sx: 0, 
    sy: 0,
    pX : 413,  
    pY : 413,  
    altura: 60,
    gordura: 60,
    mapa: 4,
    desenha() {
        let ajusteX = cameraX < 0 ? 0 : cameraX;
        let  ajusteY = cameraY < 0 ? 0 : cameraY;
        
        ctx.drawImage(
            cartaimg,
            this.sx, this.sy,
            this.gordura, this.altura,  
            (this.pX - ajusteX) * zoomLevel, (this.pY - ajusteY) * zoomLevel, 
            this.gordura + zoomLevel, this.altura + zoomLevel
        );
    }
};
personagens.push(carta);


function desenhaObj(){
    if(currentMap==='mapas/mapa01.png'){
        poste.desenha();
        arvore.desenha();
        cabana.desenha();
    }

    if(currentMap==='mapas/mapa04.png'){
        carta.desenha();
        arvore2.desenha();
        arvore3.desenha();
    }
}
function desenhaNpc(){
    if(currentMap==='mapas/mapa01.png'){
        idoso.desenha();
        cachorro.desenha();
        barco.desenha();
        galinha.desenha();
        boina.desenha();
        mina.desenha();
        cavalo.desenha();
    }
   
    if(currentMap==='mapas/mapa02.png'){
        b1.pX=600;
        b1.pY=290;
        b2.pX=600;
        b2.pY=310;
    }
    if(currentMap==='mapas/mapa02.png' && comprado){
        b1.desenha();
        b2.desenha();
    }

    if (currentMap === 'mapas/mapa04.png' && desenhaBandi) {
        b1.pX = eu.pX - 628; 
        b1.pY = eu.pY - 400; 

        b2.pX = eu.pX - 628; 
        b2.pY = eu.pY - 370;

        eu.speed = 0;

        b1.desenha();
        b2.desenha();
    }

    
}
function desenhaaoFundo(){
    if(currentMap==='mapas/mapa01.png'){
        pescador.desenha();
    }
    else if(currentMap==='mapas/mapa03.png'){
        vendedora.desenha();
    }
}
