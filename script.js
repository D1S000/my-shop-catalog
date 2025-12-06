// Загружаем товары (сначала из localStorage, потом из JSON)
async function loadProducts() {
    // Пробуем загрузить из localStorage
    const localProducts = localStorage.getItem('products');
    
    if (localProducts) {
        // Если есть в localStorage, возвращаем их
        return JSON.parse(localProducts);
    } else {
        // Если нет в localStorage, загружаем из JSON
        try {
            const response = await fetch('products.json');
            const jsonProducts = await response.json();
            // Сохраняем в localStorage для будущего использования
            localStorage.setItem('products', JSON.stringify(jsonProducts));
            return jsonProducts;
        } catch (error) {
            console.error('Ошибка загрузки products.json:', error);
            return [];
        }
    }
}

// Сохраняем товары в localStorage
function saveProductsToLocal(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Отображаем каталог
async function renderCatalog() {
    const products = await loadProducts();
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
            <p>Цена: ${product.price} руб.</p>
            <p>${product.description}</p>
            ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 200px;">` : ''}
            <div class="product-actions">
                <button onclick="editProduct(${product.id})">Редактировать</button>
                <button onclick="deleteProduct(${product.id})">Удалить</button>
            </div>
        `;
        container.appendChild(productDiv);
    });
}

// Удаление товара
async function deleteProduct(id) {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) {
        return;
    }
    
    let products = await loadProducts();
    products = products.filter(p => p.id !== id);
    saveProductsToLocal(products);
    renderCatalog();
}

// Редактирование товара
function editProduct(id) {
    localStorage.setItem('editId', id);
    window.location.href = 'edit.html';
}

// Добавление товара
function addProduct() {
    window.location.href = 'add.html';
}

// Инициализация
document.addEventListener('DOMContentLoaded', renderCatalog);
