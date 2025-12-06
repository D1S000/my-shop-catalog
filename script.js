// Функция для загрузки товаров (только из localStorage)
function loadProducts() {
    const products = localStorage.getItem('products');
    if (products) {
        return JSON.parse(products);
    } else {
        // Если в localStorage пусто, загружаем начальные данные из JSON
        return loadInitialProducts();
    }
}

// Загрузка начальных данных из JSON
async function loadInitialProducts() {
    try {
        const response = await fetch('products.json');
        const initialProducts = await response.json();
        
        // Генерируем новые ID для начальных товаров
        const productsWithNewIds = initialProducts.map(product => ({
            ...product,
            id: generateId() // Присваиваем новый ID
        }));
        
        // Сохраняем в localStorage
        localStorage.setItem('products', JSON.stringify(productsWithNewIds));
        return productsWithNewIds;
    } catch (error) {
        console.error('Ошибка загрузки начальных товаров:', error);
        return [];
    }
}

// Генерация ID
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Сохранение товаров
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Отображение каталога
function renderCatalog() {
    const products = loadProducts();
    const container = document.getElementById('catalog');
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p>Товаров нет. Добавьте первый товар!</p>';
        return;
    }
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Цена:</strong> ${product.price} руб.</p>
            <p>${product.description}</p>
            ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
            <div class="product-actions">
                <button onclick="editProduct(${product.id})">✏️ Редактировать</button>
                <button onclick="deleteProduct(${product.id})">🗑️ Удалить</button>
            </div>
        `;
        container.appendChild(productDiv);
    });
}

// Удаление товара
function deleteProduct(id) {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) {
        return;
    }
    
    let products = loadProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderCatalog();
}

// Переход к редактированию
function editProduct(id) {
    localStorage.setItem('editId', id);
    window.location.href = 'edit.html';
}

// Переход к добавлению
function addProduct() {
    window.location.href = 'add.html';
}

// Сброс данных (для тестирования)
function resetData() {
    if (confirm('Сбросить все данные к начальному состоянию?')) {
        localStorage.removeItem('products');
        renderCatalog();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderCatalog();
    
    // Добавляем кнопку сброса для тестирования
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '🔄 Сбросить данные';
    resetBtn.style.background = '#ff9800';
    resetBtn.style.marginLeft = '10px';
    resetBtn.onclick = resetData;
    
    const addBtn = document.querySelector('button[onclick="addProduct()"]');
    if (addBtn && addBtn.parentNode) {
        addBtn.parentNode.appendChild(resetBtn);
    }
});
