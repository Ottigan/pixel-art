import horse from './assets/original.png';

const smoothingEnabled = false;
setupCanvasPowerTwo(document.querySelector('#two'), smoothingEnabled);
setupCanvasDrawImage(document.querySelector('#drawImage'), smoothingEnabled);
setupCanvasOffscreen(document.querySelector('#offscreen'), smoothingEnabled);
setupCanvasDrawImage(document.querySelector('#smooth'), true);
setupCanvasDownsample(document.querySelector('#downsample'), smoothingEnabled);

async function loadImage(src) {
    const img = new Image();
    img.src = src;

    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

async function setupCanvasDrawImage(canvas, smoothingEnabled) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = smoothingEnabled;
    const image = await loadImage(horse);

    const sw = 128;
    const sh = 128;
    const dw = 52;
    const dh = 52;

    ctx.drawImage(image, 0, 0, sw, sh, 0, 0, dw, dh);
}

async function setupCanvasOffscreen(canvas, smoothingEnabled) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = smoothingEnabled;
    const image = await loadImage(horse);

    const offscreenCanvas = new OffscreenCanvas(128, 128);
    const offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.imageSmoothingEnabled = smoothingEnabled;
    const sw = 128;
    const sh = 128;
    const dw = 52;
    const dh = 52;

    offscreenCtx.drawImage(image, 0, 0);
    ctx.drawImage(offscreenCanvas, 0, 0, sw, sh, 0, 0, dw, dh);
}

async function setupCanvasPowerTwo(canvas, smoothingEnabled) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = smoothingEnabled;
    const image = await loadImage(horse);

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    const sw = 128;
    const sh = 128;
    const dw = 128 / 2;
    const dh = 128 / 2;

    offscreenCtx.drawImage(image, 0, 0);
    ctx.drawImage(offscreenCanvas, 0, 0, sw, sh, 0, 0, dw, dh);
}

async function setupCanvasDownsample(canvas, smoothingEnabled) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = smoothingEnabled;
    const image = await loadImage(horse);

    const sw = 128;
    const sh = 128;
    const dw = 52;
    const dh = 52;
    const rw = dw / sw;
    const rh = dh / sh;

    canvas.width /= rw;
    canvas.height /= rh;
    canvas.style.width = `${canvas.clientWidth * rw}px`;
    ctx.drawImage(image, 0, 0);
}
