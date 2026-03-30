// MAMI Shop System
const products = [
    { id: 1, name: 'Blackmores โฟเลต 500mcg', price: 450, image: 'blackmores-folate.jpg', description: '90 เม็ด - สำคัญสำหรับทารกในครรภ์' },
    { id: 2, name: 'เจลซิลิโคนดูแลรอยแผลเป็น', price: 590, image: 'scar-gel.jpg', description: 'ลดเลือนรอยแผลเป็น นุ่มนวล เรียบเนียน' },
    { id: 3, name: 'โลชั่นเด็ก', price: 299, image: 'baby-bg.jpg', description: 'อ่อนโยนต่อผิวลูกน้อย' },
    { id: 4, name: 'ของเล่นเสริมพัฒนาการ', price: 590, image: 'baby-bg.jpg', description: 'ปลอดภัย ได้มาตรฐาน' },
    { id: 5, name: 'ชุดชั้นในให้นม', price: 399, image: 'baby-bg.jpg', description: 'ระบายอากาศดี' },
    { id: 6, name: 'ครีมกัน stretch mark', price: 690, image: 'baby-bg.jpg', description: 'ลดเลือนรอยแตกลาย' },
    { id: 7, name: 'เซทน้ำมันนวด', price: 890, image: 'baby-bg.jpg', description: 'น้ำมันธรรมชาติ 100%' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initShop() {
    renderProducts();
    updateCartCount();
}

function renderProducts() {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="shop-card">
            <img src="${product.image}" alt="${product.name}" class="shop-card-img" />
            <div class="shop-card-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="shop-card-price">${product.price.toLocaleString()}฿</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">🛒 ใส่ตะกร้า</button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`✅ เพิ่ม ${product.name} แล้ว!`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        countElement.textContent = count;
        if (count > 0) {
            countElement.style.display = 'flex';
        } else {
            countElement.style.display = 'none';
        }
    }
}

function toggleCart() {
    if (cart.length === 0) {
        showToast('🛒 ตะกร้าว่างอยู่!');
        return;
    }

    let message = '🛒 สินค้าในตะกร้า:\n\n';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. ${item.name} x${item.quantity} = ${itemTotal.toLocaleString()}฿\n`;
    });
    message += `\n💰 รวม: ${total.toLocaleString()}฿`;
    
    alert(message);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleMobileMenu() {
    alert('Mobile menu clicked');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initShop);
