const { ref } = VTTCue

const load = Vue.createApp({
    setup () {
        return {
            MainText1:'Loading Screen Tutorial',
            SubText1:'Create by Null',

            LoadingTitle:'Loading Null-City',
            LoadingDesc:'Loading Null-City assets',

            KeybindTitle:'デフォルトキー設定',
            keybind1:'Open Inventory',
            keybind2:'Open Phone',
            keybind3:'Radial Menu',

            firstap: ref(true),
            seconfap: ref(true),
            firstslide: ref(1),
            seccondslide: ref('1'),
            loading: ref(true),
        }
    }
})

load.use(Quasar, { config: {} })
load.mount('#loading-main')

let count = 0;
let thisCount = 0;

const handlers = {
    startInitFunctionOrder(data){
        count = data.count;
    },

    initFunctionInvoking(data){
        document.querySelector(".thingy").style.left = "0%";
        document.querySelector(".thingy").style.width = (data.idx / count) * 100 + "%";
    },

    startDataFileEntries(data){
        count = data.count;
    },

    performMapLoadFunction(data){
        ++thisCount;
        document.querySelector(".thingy").style.left = "0%";
        document.querySelector(".thingy").style.width = (thisCount / count) * 100 + "%";
    },
};

window.addEventListener("message", function (e) {
    (handlers[e.data.eventName] || function () {})(e.data);
});