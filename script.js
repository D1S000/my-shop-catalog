// Загружаем товары из JSON
async function loadProducts() {
  const response = await fetch('products.json');
  return await response.json();
}

// Отображаем каталог
async function renderCatalog() {
  const products = await loadProducts();
  const container = document.getElementById('catalog');
  container.innerHTML = '';
  
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Цена: ${product.price} руб.</p>
      <p>${product.description}</p>
      <button onclick="editProduct(${product.id})">Редактировать</button>
      <button onclick="deleteProduct(${product.id})">Удалить</button>
    `;
    container.appendChild(productDiv);
  });
}

// Удаление товара (фейковое — на клиенте)
function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  renderCatalog(); // перерисовываем
}

// Редактирование товара (переходим на страницу редактирования)
function editProduct(id) {
  localStorage.setItem('editId', id);
  window.location.href = 'edit.html';
}

// Инициализация
renderCatalog();
