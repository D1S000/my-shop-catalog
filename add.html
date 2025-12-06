// Обработка отправки формы
document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Загружаем текущие товары
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Создаем новый товар
    const newProduct = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: document.getElementById('name').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value.trim(),
        image: document.getElementById('image').value.trim() || 'https://via.placeholder.com/200x150?text=No+Image'
    };
    
    // Проверка данных
    if (!newProduct.name || !newProduct.description || isNaN(newProduct.price)) {
        alert('Пожалуйста, заполните все обязательные поля корректно');
        return;
    }
    
    // Добавляем товар
    products.push(newProduct);
    
    // Сохраняем в localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Показываем успех и переходим
    alert('Товар успешно добавлен!');
    window.location.href = 'index.html';
});

// Остальные функции остаются прежними
function cancelAdd() {
    if (confirm('Отменить добавление товара?')) {
        window.location.href = 'index.html';
    }
}

function goBack() {
    window.location.href = 'index.html';
}
