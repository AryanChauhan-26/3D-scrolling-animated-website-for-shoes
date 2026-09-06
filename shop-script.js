const bagStatus = document.querySelector('#bagStatus');
const bagCount = document.querySelector('#shopBagCount');
let itemCount = 0;

document.querySelectorAll('.add-button').forEach((button) => button.addEventListener('click', () => {
  itemCount += 1;
  bagCount.textContent = `Bag ${itemCount}`;
  bagStatus.textContent = `${button.dataset.product} is in your bag.`;
  button.innerHTML = 'Added <span>✓</span>';
  setTimeout(() => { button.innerHTML = 'Add to bag <span>+</span>'; }, 1800);
}));
