const bagStatus = document.querySelector('#bagStatus');
const bagCount = document.querySelector('#shopBagCount');
const bagKey = 'sole-bag-count';
const storedBagCount = Number.parseInt(localStorage.getItem(bagKey) || '0', 10);
let itemCount = Number.isFinite(storedBagCount) && storedBagCount >= 0 ? storedBagCount : 0;
bagCount.textContent = `Bag ${itemCount}`;

document.querySelectorAll('.add-button').forEach((button) => button.addEventListener('click', () => {
  itemCount += 1;
  localStorage.setItem(bagKey, String(itemCount));
  bagCount.textContent = `Bag ${itemCount}`;
  bagStatus.textContent = `${button.dataset.product} is in your bag.`;
  button.innerHTML = 'Added <span>✓</span>';
  setTimeout(() => { button.innerHTML = 'Add to bag <span>+</span>'; }, 1800);
}));
