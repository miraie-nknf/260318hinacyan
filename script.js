const imageFiles = [
    "0topgazou.JPG", "12510-2603.JPG", "22510-2603.JPG", "32510-2603.JPG",
    "52510-2603.JPG", "62510-2603.JPG", "72510-2603.JPG", "82510-2603.jpg",
    "92510-2603.jpg", "102510-2603.JPG", "112510-2603.JPG", "122510-2603.JPG",
    "132510-2603.JPG", "142510-2603.JPG", "152510-2603.JPG", "162510-2603.JPG",
    "172510-2603.JPG", "182510-2603.JPG", "192510-2603.JPG", "202510-2603.JPG",
    "212510-2603.JPG", "222510-2603.JPG", "232510-2603.JPG", "242510-2603.JPG",
    "262510-2603.jpg", "272510-2603.jpg", "282510-2603.jpg", "292510-2603.jpg",
    "302510-2603.jpg", "312510-2603.jpg", "322510-2603.jpg", "332510-2603.jpg",
    "342510-2603.jpg", "352510-2603.jpg", "362510-2603.jpg", "372510-2603.jpg",
    "382510-2603.jpg", "392510-2603.jpg", "402510-2603.jpg", "412510-2603.jpg",
    "422510-2603.jpg", "432510-2603.jpg", "442510-2603.jpg", "452510-2603.JPG",
    "462510-2603.JPG", "472510-2603.JPG", "482510-2603.JPG", "492510-2603.JPG",
    "502510-2603.JPG", "512510-2603.JPG", "522510-2603.JPG", "532510-2603.JPG",
    "542510-2603.JPG", "552510-2603.JPG", "562510-2603.JPG", "572510-2603.jpg",
    "582510-2603.jpg", "592510-2603.jpg", "602510-2603.jpg", "612510-2603.jpg",
    "622510-2603.jpg", "632510-2603.jpg", "642510-2603.jpg", "652510-2603.jpg",
    "662510-2603.jpg", "672510-2603.jpg", "682510-2603.jpg", "692510-2603.jpg",
    "702510-2603.jpg", "712510-2603.jpg", "722510-2603.jpg", "732510-2603.jpg",
    "742510-2603.jpg", "752510-2603.jpg", "762510-2603.jpg", "772510-2603.jpg",
    "782510-2603.jpg", "792510-2603.jpg", "802510-2603.jpg", "812510-2603.jpg",
    "822510-2603.jpg", "832510-2603.jpg", "842510-2603.jpg", "852510-2603.jpg",
    "862510-2603.jpg", "872510-2603.jpg", "882510-2603.jpg", "892510-2603.jpg",
    "902510-2603.jpg", "912510-2603.jpg", "922510-2603.jpg", "932510-2603.jpg",
    "942510-2603.jpg", "952510-2603.jpg", "962510-2603.jpg", "972510-2603.jpg",
    "982510-2603.jpg", "992510-2603.jpg", "1002510-2603.jpg", "1012510-2603.jpg",
    "1022510-2603.jpg", "1032510-2603.jpg", "1042510-2603.jpg", "1052510-2603.jpg",
    "1062510-2603.jpg", "1072510-2603.jpg", "1082510-2603.jpg", "1092510-2603.jpg",
    "1102510-2603.jpg", "1112510-2603.jpg", "1122510-2603.jpg", "1132510-2603.jpg",
    "1142510-2603.jpg", "1152510-2603.jpg", "1162510-2603.jpg", "1172510-2603.jpg",
    "1182510-2603.jpg", "1192510-2603.jpg", "1202510-2603.jpg", "1212510-2603.jpg",
    "1222510-2603.jpg", "1232510-2603.jpg", "1242510-2603.jpg", "1252510-2603.jpg",
    "1262510-2603.jpg", "1272510-2603.jpg", "1282510-2603.jpg", "1292510-2603.jpg",
    "1302510-2603.jpg", "1312510-2603.jpg", "1322510-2603.jpg", "1332510-2603.jpg"
];

let currentIndex = 0;
let slideInterval;
let isPlaying = false;
const slideDuration = 3400; // 3.4秒

const slideImage = document.getElementById('slide-image');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const bgmAudio = document.getElementById('bgm-audio');

// エラーハンドリング
window.handleImageError = function (img) {
    console.warn(`画像が見つかりません: ${imageFiles[currentIndex]}`);
    img.classList.remove('fade-out');
    nextSlide();
}

function nextSlide() {
    // 最後の画像だったらストップ
    if (currentIndex >= imageFiles.length - 1) {
        clearInterval(slideInterval);
        return;
    }

    slideImage.classList.add('fade-out');

    // 0.5秒のフェードアウト後に画像を切り替える
    setTimeout(() => {
        currentIndex++;
        slideImage.src = `gazou/${imageFiles[currentIndex]}`;
        slideImage.classList.remove('fade-out');
    }, 500);
}

function startSlideshow() {
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';

    // BGMが設定されていれば再生開始
    if (bgmAudio.src) {
        bgmAudio.play().catch(e => console.log('BGMの自動再生がブラウザによりブロックされました'));
    }

    // 最初のスライド切り替えからセット
    slideInterval = setInterval(nextSlide, slideDuration);
}

function pauseSlideshow() {
    isPlaying = false;
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';

    bgmAudio.pause();
    clearInterval(slideInterval);
}

playBtn.addEventListener('click', startSlideshow);
pauseBtn.addEventListener('click', pauseSlideshow);
