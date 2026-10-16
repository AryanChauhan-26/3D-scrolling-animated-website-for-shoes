const products = {
  'air-force-white': {
    name: 'Air Force 1 (White)',
    price: 160,
    image: 'shopping.jpeg',
    alt: 'White Nike Air Force 1 sneaker',
    category: 'Sole / Signature series / 2026',
    edition: 'SOLE / SIGNATURE SERIES',
    description: 'An everyday classic, ready for your rotation. Choose your size to make it yours.'
  },
  'air-force-olive': {
    name: 'Air Force 1',
    price: 180,
    image: 'Unknown.jpg',
    alt: 'Olive and white low-top sneaker',
    category: 'Sole / Signature series / 2026',
    edition: 'SOLE / SIGNATURE SERIES',
    description: 'A fresh take on a familiar low-top. Choose your size to make it yours.'
  },
  'air-jordan-panda': {
    name: 'Air Force 1 (Panda Edition)',
    price: 180,
    image: 'images-2.jpeg',
    alt: 'Blue and cream Air Jordan low-top sneaker',
    category: 'Sole / Signature series / 2026',
    edition: 'SIGNATURE SHOE / 2026',
    description: 'A standout colorway for your everyday rotation. Choose your size to make it yours.'
  },
  'jordan-somo': {
    name: "Air Jordan Low SE 'Somo Eternos'",
    price: 200,
    image: 'images-4.jpeg',
    alt: 'White low-top sneaker',
    category: 'Sole / Limited edition / 2026',
    edition: 'LIMITED EDITION',
    description: 'A limited-edition low-top, selected for the Sole collection. Choose your size to make it yours.'
  },
  'air-force-black': {
    name: 'Air Force 1 (Black)',
    price: 160,
    image: 'shopping-2.jpeg',
    alt: 'Black and white Nike Air Force 1 sneaker',
    category: 'Sole / Signature series / 2026',
    edition: 'SOLE / SIGNATURE SERIES',
    description: 'A versatile low-top made for your everyday rotation. Choose your size to make it yours.'
  }
};

const productId = new URLSearchParams(window.location.search).get('product');
const product = products[productId] || products['air-force-white'];
const bagCount = document.querySelector('#shopBagCount');
const bagKey = 'sole-bag-count';
const sizeMessage = document.querySelector('#sizeMessage');
const status = document.querySelector('#productStatus');
const quantityValue = document.querySelector('#quantityValue');
let quantity = 1;
let selectedSize = null;

document.querySelector('#productBreadcrumb').textContent = product.name;
document.querySelector('#productName').textContent = product.name;
document.querySelector('#productPrice').textContent = `$${product.price}`;
document.querySelector('#productImage').src = product.image;
document.querySelector('#productImage').alt = product.alt;
document.querySelector('#productCategory').textContent = product.category;
document.querySelector('#productEdition').textContent = product.edition;
document.querySelector('#productDescription').textContent = product.description;

const storedBagCount = Number.parseInt(localStorage.getItem(bagKey) || '0', 10);
let itemCount = Number.isFinite(storedBagCount) && storedBagCount >= 0 ? storedBagCount : 0;
bagCount.textContent = `Bag ${itemCount}`;

document.querySelectorAll('.size-option').forEach((button) => {
  button.addEventListener('click', () => {
    selectedSize = button.textContent;
    document.querySelectorAll('.size-option').forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle('is-selected', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });
    sizeMessage.textContent = `US / Men's ${selectedSize} selected.`;
    status.textContent = 'Complimentary delivery / Easy 30-day returns';
  });
});

document.querySelector('#decreaseQuantity').addEventListener('click', () => {
  quantity = Math.max(1, quantity - 1);
  quantityValue.textContent = String(quantity);
});

document.querySelector('#increaseQuantity').addEventListener('click', () => {
  quantity += 1;
  quantityValue.textContent = String(quantity);
});

document.querySelector('#addProductButton').addEventListener('click', () => {
  if (!selectedSize) {
    sizeMessage.textContent = 'Please select a size before adding to your bag.';
    document.querySelector('.size-picker').classList.add('needs-size');
    document.querySelector('.size-options').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  document.querySelector('.size-picker').classList.remove('needs-size');
  itemCount += quantity;
  localStorage.setItem(bagKey, String(itemCount));
  bagCount.textContent = `Bag ${itemCount}`;
  status.textContent = `${quantity} × ${product.name} / US ${selectedSize} added to your bag.`;
});
