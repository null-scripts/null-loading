let totalCount = 0;
let currentCount = 0;

const statusTextElement = document.getElementById("status-text");
const progressBarElement = document.querySelector(".progress-bar");
const progressBarContainerElement = document.querySelector(".progress-bar-container");

const handlers = {
    //リソースの取得
    startInitFunctionOrder(data) {
        totalCount = data.count;
        if(progressBarContainerElement) {
            progressBarContainerElement.style.display = "block";
        }
        if(statusTextElement) {
            statusTextElement.innerText = "Loading resources...";
        }
    },

    //リソースの読み込み
    initFunctionInvoking(data) {
        if(totalCount > 0 && progressBarElement && statusTextElement){
            const progress = (data.idx / totalCount) * 100;
            progressBarElement.style.width = progress + "%";
            statusTextElement.innerText = `Loading resource... (${Math.round(progress)}%)`;
        }
    },

    //マップデータの取得
    startDataFileEntries(data) {
        totalCount = data.count;
        currentCount = 0;
        if(progressBarContainerElement) {
            progressBarContainerElement.style.display = "block";
        }
        if(statusTextElement) {
            statusTextElement.innerText = "Loading map data...";
        }
    },

    //マップデータの読み込み
    performaMapLoadFunction(data) {
        currentCount++;
        if(totalCount > 0 && progressBarElement && statusTextElement) {
            const progress = (currentCount / totalCount) * 100;
            progressBarElement.style.width = progress + "%";
            statusTextElement.innerText = `Loading map data... (${Math.round(progress)}%)`;
        }
    },

    //ロードが終わった時の処理
    onLoaded() {
        if(statusTextElement) {
            statusTextElement.innerText = "Entering the game...";
        }
        if(progressBarContainerElement) {
            progressBarContainerElement.style.display = "none";
        }
        if(progressBarElement) {
            progressBarElement.style.display = "none";
        }
    }
};

// fivemのクライアントから受け取った時の処理
window.addEventListener("message", function(event) {
    if(event.data.eventName && handlers[event.data.eventName]) {
        handlers[event.data.eventName](event.data);
    }
});

const BGAudio = document.getElementById("b-g-audio");
if (BGAudio) {
    BGAudio.volume = 0.5; // 音量を50%に設定
    BGAudio.play().catch(error => {
        console.error("Failed to play background audio:", error);
    });
}
