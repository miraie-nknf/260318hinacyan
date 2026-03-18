const totalImages = 133;
let currentIndex = 0;
let slideInterval;
let isPlaying = false;
const slideDuration = 3400; // 3.4秒

const slideImage = document.getElementById('slide-image');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const bgmAudio = document.getElementById('bgm-audio');

// 拡張子の違いや欠番に対応するためのエラーハンドリング
window.handleImageError = function (img) {
    if (img.src.endsWith('.JPG')) {
        // .JPGで失敗した場合は.jpgを試す
        img.src = `gazou/${currentIndex}2510-2603.jpg`;
    } else {
        // .jpgでも失敗した場合（欠番などでファイルが存在しない場合）は次の画像へスキップ
        console.warn(`画像が見つかりません: ${currentIndex}番目。スキップします。`);
        // フェードアウトクラスを一旦外してすぐに次へ行く準備
        img.classList.remove('fade-out');
        nextSlide();
    }
}

function nextSlide() {
    // もし現在のインデックスが最後の画像（133）だったら、ここでストップする
    if (currentIndex >= totalImages) {
        clearInterval(slideInterval);
        return;
    }

    slideImage.classList.add('fade-out');

    // 0.5秒のフェードアウト後に画像を切り替える
    setTimeout(() => {
        currentIndex++;

        // 削除した「42510-2603.JPG」（4番目の画像）を事前にスキップ
        if (currentIndex === 4) {
            currentIndex++;
        }

        slideImage.src = `gazou/${currentIndex}2510-2603.JPG`;
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
