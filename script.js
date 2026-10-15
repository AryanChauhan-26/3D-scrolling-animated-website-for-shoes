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
let targetFrame = 0;
let animationFrame = 0;
let lastAnimationTime = 0;

function sizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawFrame(currentFrame);
}

function drawFrame(index) {
  const image = frames[Math.round(index)];
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
  targetFrame = progress * (frameCount - 1);
  if (!animationFrame) animationFrame = requestAnimationFrame(animateSequence);
}

function animateSequence(timestamp) {
  const elapsed = lastAnimationTime ? timestamp - lastAnimationTime : 16;
  lastAnimationTime = timestamp;
  currentFrame += (targetFrame - currentFrame) * (1 - Math.exp(-elapsed / 90));
  const frameIndex = Math.round(currentFrame);
  drawFrame(frameIndex);
  frameReadout.textContent = String(frameIndex + 1).padStart(2, '0');

  if (Math.abs(targetFrame - currentFrame) > 0.05) {
    animationFrame = requestAnimationFrame(animateSequence);
  } else {
    currentFrame = targetFrame;
    drawFrame(Math.round(currentFrame));
    animationFrame = 0;
    lastAnimationTime = 0;
  }
}

frames.forEach((image) => image.addEventListener('load', () => drawFrame(currentFrame), { once: true }));
window.addEventListener('resize', sizeCanvas);
window.addEventListener('scroll', updateSequence, { passive: true });
document.querySelectorAll('.buy-button').forEach((button) => button.addEventListener('click', () => {
  window.location.href = 'shop.html';
}));
sizeCanvas();
updateSequence();