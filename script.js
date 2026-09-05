const frameCount = 212;
const framePath = (frame) => `3d%20scroller%20/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;
const canvas = document.getElementById('sequenceCanvas');
const context = canvas.getContext('2d');
const frameReadout = document.getElementById('frameReadout');
const sequence = document.querySelector('.sequence-wrap');
const frames = Array.from({ length: frameCount }, (_, index) => {
  const image = new Image();
  image.src = framePath(index + 1);
  return image;
});
let currentFrame = 0;

function sizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawFrame(currentFrame);
}

function drawFrame(index) {
  const image = frames[index];
  if (!image?.complete || !image.naturalWidth) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.clearRect(0, 0, width, height);
  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function updateSequence() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
  const nextFrame = Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
  if (nextFrame !== currentFrame) {
    currentFrame = nextFrame;
    drawFrame(currentFrame);
    frameReadout.textContent = String(currentFrame + 1).padStart(2, '0');
  }
}

frames.forEach((image) => image.addEventListener('load', () => drawFrame(currentFrame), { once: true }));
window.addEventListener('resize', sizeCanvas);
window.addEventListener('scroll', updateSequence, { passive: true });
document.querySelectorAll('.buy-button').forEach((button) => button.addEventListener('click', () => {
  button.innerHTML = 'Added to bag <span>✓</span>';
  setTimeout(() => { button.innerHTML = button.id === 'closingBuy' ? 'Shop the collection <span>↗</span>' : 'Shop now <span>↗</span>'; }, 1800);
}));
sizeCanvas();
updateSequence();