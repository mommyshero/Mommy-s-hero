// Cart System - Shared across all pages
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let deliveryFee = 0;
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cartCount');
    
    if (countElement) {
        countElement.textContent = count;
        countElement.style.display = count > 0 ? 'flex' : 'none';
    }
    
    updateNavButton();
}

// Update navigation button based on login state
function updateNavButton() {
    const loginBtn = document.querySelector('.nav-login-btn');
    if (loginBtn) {
        if (isLoggedIn) {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            loginBtn.textContent = `🛒 ตะกร้า (${count})`;
        } else {
            loginBtn.textContent = '🔑 ล้อคอิน';
        }
    }
}

// Update greeting with baby name
function updateGreeting() {
    const babyName = localStorage.getItem('babyName') || 'น้อง';
    const greetingElement = document.getElementById('cartGreeting');
    if (greetingElement) {
        greetingElement.textContent = `🛒 ตะกร้าของแม่${babyName}`;
    }
}

// Calculate delivery fee (10 baht per km)
function calculateDelivery() {
    const distance = parseFloat(document.getElementById('deliveryDistance').value) || 0;
    deliveryFee = distance * 10;
    document.getElementById('deliveryFee').textContent = `${deliveryFee.toLocaleString()}฿`;
    updateCartTotal();
}

// Update cart total
function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = subtotal + deliveryFee;
    
    const subtotalEl = document.getElementById('cartSubtotal');
    const deliveryEl = document.getElementById('cartDelivery');
    const grandTotalEl = document.getElementById('cartGrandTotal');
    
    if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString()}฿`;
    if (deliveryEl) deliveryEl.textContent = `${deliveryFee.toLocaleString()}฿`;
    if (grandTotalEl) grandTotalEl.textContent = `${grandTotal.toLocaleString()}฿`;
}

// Render cart items
function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 30px 0;">🛒 ตะกร้าว่างอยู่</p>';
        updateCartTotal();
        return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-quantity">x${item.quantity}</div>
                </div>
                <div class="cart-item-price">${itemTotal.toLocaleString()}฿</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    updateCartTotal();
}

// Toggle cart panel
function toggleCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    if (cartPanel) {
        cartPanel.classList.toggle('active');
        if (cartPanel.classList.contains('active')) {
            renderCartItems();
            updateGreeting();
        }
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('🛒 ตะกร้าว่างอยู่!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = subtotal + deliveryFee;
    
    let message = '🛒 สรุปออเดอร์:\n\n';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        message += `${index + 1}. ${item.name} x${item.quantity} = ${itemTotal.toLocaleString()}฿\n`;
    });
    message += `\n💰 ค่าสินค้า: ${subtotal.toLocaleString()}฿`;
    if (deliveryFee > 0) {
        message += `\n🚚 ค่าส่ง: ${deliveryFee.toLocaleString()}฿`;
    }
    message += `\n💰 รวมทั้งหมด: ${grandTotal.toLocaleString()}฿\n\n`;
    message += '✅ ออเดอร์ถูกส่งแล้ว! เจ้าหน้าที่จะติดต่อกลับเร็วๆ นี้';
    
    alert(message);
    cart = [];
    deliveryFee = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    toggleCartPanel();
}

// Add to cart function
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.textContent = `✅ เพิ่ม ${name} แล้ว!`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #5cf79a, #5cf7c9);
        color: #1a5c4a;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 8px 30px rgba(92, 247, 154, 0.4);
        z-index: 10000;
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Sync cart across pages
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        cart = JSON.parse(e.newValue) || [];
        updateCartCount();
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateGreeting();
});
