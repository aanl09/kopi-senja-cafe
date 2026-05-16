const menuCards = [...document.querySelectorAll('.menu-card')];
const drinkSelect = document.getElementById('drinkSelect');
const orderForm = document.getElementById('orderForm');
const summary = document.getElementById('summary');

const formatRupiah = value => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(value);

const menu = menuCards.map(card => ({
  name: card.dataset.name,
  price: Number(card.dataset.price)
}));

menu.forEach(item => {
  const option = document.createElement('option');
  option.value = item.name;
  option.textContent = `${item.name} - ${formatRupiah(item.price)}`;
  drinkSelect.appendChild(option);
});

function selectDrink(name) {
  drinkSelect.value = name;
  menuCards.forEach(card => card.classList.toggle('selected', card.dataset.name === name));
}

menuCards.forEach(card => {
  card.addEventListener('click', () => selectDrink(card.dataset.name));
});

drinkSelect.addEventListener('change', () => selectDrink(drinkSelect.value));
selectDrink(menu[0].name);

orderForm.addEventListener('submit', event => {
  event.preventDefault();
  const customer = document.getElementById('customerName').value.trim();
  const quantity = Number(document.getElementById('quantity').value || 1);
  const item = menu.find(entry => entry.name === drinkSelect.value);
  const total = item.price * quantity;
  summary.textContent = `${customer}, your order: ${quantity} x ${item.name}. Total: ${formatRupiah(total)}.`;
});
