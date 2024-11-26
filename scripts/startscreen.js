// Configuração e pré-carregamento do vídeo inicial
const video = document.createElement('video');
video.src = 'img/telaInicial.mp4';
video.preload = 'auto';
video.loop = true;
video.muted = true; // Mute o vídeo para garantir que ele possa ser reproduzido automaticamente

// Função para iniciar o carregamento e reprodução do vídeo de fundo
function initStartScreen() {
    video.load(); // Carrega o vídeo manualmente

    // Usa 'loadeddata' para iniciar o loop de exibição assim que os primeiros dados estiverem prontos
    video.addEventListener('loadeddata', () => {
        video.play();
        mostrarVideo();
    });

    showStartScreen();
}

// Função para mostrar a tela inicial com o vídeo em loop
function showStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        video,
        0, 0, video.videoWidth, video.videoHeight,
        0, 0, canvas.width, canvas.height
    );

    requestAnimationFrame(showStartScreen);
    canvas.addEventListener('click', startGame);
}
function startGame() {
    if (!gameStarted) {
        canvas.removeEventListener('click', startGame);
        
        const fadein = document.createElement('video'); 
        fadein.src = 'img/fadeout.mp4';
        fadein.autoplay = true;

        fadein.addEventListener('ended', () => {
            cutsceneDraw();
            //video cutscxene
            gameStarted = false;
            cutsceneActive = false;
            loop(); // Inicia o jogo ao término da """cutscene
        });

        function drawFade() {
            ctx.drawImage(
                fadein,
                0, 0, fadein.videoWidth, fadein.videoHeight,
                0, 0, canvas.width, canvas.height
            );
            if (!gameStarted) {
                requestAnimationFrame(drawFade);
            }
        }
        drawFade(); 
    }
}

function cutsceneDraw() {
    
    const cutsceneUm = document.createElement('video'); 
    cutsceneUm.src = 'cutscene/cutscene1.mp4';        
    cutsceneUm.autoplay = true;
    
    cutsceneActive = true; // Define que a cutscene está ativa

    // Evento para detectar o fim do vídeo
    cutsceneUm.addEventListener('ended', () => {
        gameStarted = true;
        cutsceneActive = false;
        loop(); // Inicia o jogo ao término da cutscene
    });

    // Função para desenhar a cutscene no canvas enquanto ativa
    function drawCutscene() {
        if (cutsceneActive) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
            ctx.drawImage(
                cutsceneUm,
                0, 0, cutsceneUm.videoWidth, cutsceneUm.videoHeight,
                0, 0, canvas.width, canvas.height
            );
            requestAnimationFrame(drawCutscene); // Continua desenhando até o fim da cutscene
        }
    }

    // Inicia o desenho da cutscene
    drawCutscene();
    
}

initStartScreen();

