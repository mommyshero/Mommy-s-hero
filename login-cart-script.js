// ============ Login / Cart System with LocalStorage ============

// Check login status on load
console.log("Login script loaded");
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM ready");
    checkLoginStatus();
    loadCartFromStorage();
    updateCartDisplay();
});

// Login state
let isLoggedIn = localStorage.getItem("mami_hero_logged_in") === "true";

function checkLoginStatus() {
    const loginBtn = document.querySelector(".nav-login-btn");
    if (isLoggedIn) {
        loginBtn.innerHTML = "🛒 ตะกร้า";
        loginBtn.onclick = function() { toggleCartPanel(); };
    }
}

// Toggle Login Panel (from right)
function toggleLoginPanel() {
    const panel = document.getElementById("loginPanel");
    const cartPanel = document.getElementById("cartPanel");
    if (cartPanel) cartPanel.classList.remove("active");
    panel.classList.toggle("active");
}

// Toggle Cart Panel  
function toggleCartPanel() {
    const panel = document.getElementById("cartPanel");
    const loginPanel = document.getElementById("loginPanel");
    if (loginPanel) loginPanel.classList.remove("active");
    panel.classList.toggle("active");
    updateCartDisplay();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const phone = document.getElementById("loginPhone").value;
    const password = document.getElementById("loginPassword").value;
    
    // Simple validation
    if (phone && password) {
        localStorage.setItem("mami_hero_logged_in", "true");
        localStorage.setItem("mami_hero_phone", phone);
        isLoggedIn = true;
        
        // Update button
        const loginBtn = document.querySelector(".nav-login-btn");
        loginBtn.innerHTML = "🛒 ตะกร้า";
        loginBtn.onclick = function() { toggleCartPanel(); };
        
        // Close panel
        toggleLoginPanel();
        
        alert("เข้าสู่ระบบสำเร็จ!");
    }
}

// Handle Logout
function handleLogout() {
    localStorage.setItem("mami_hero_logged_in", "false");
    isLoggedIn = false;
    
    // Update button
    const loginBtn = document.querySelector(".nav-login-btn");
    loginBtn.innerHTML = "🔑 ล้อคอิน";
    loginBtn.onclick = function() { toggleLoginPanel(); };
    
    // Close cart
    toggleCartPanel();
    
    // Clear cart
    localStorage.removeItem("mami_hero_cart");
    updateCartDisplay();
}

// Cart Functions
let cart = [];

function loadCartFromStorage() {
    const saved = localStorage.getItem("mami_hero_cart");
    if (saved) {
        cart = JSON.parse(saved);
    }
}

function saveCartToStorage() {
    localStorage.setItem("mami_hero_cart", JSON.stringify(cart));
}

function addToCart(item) {
    cart.push(item);
    saveCartToStorage();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsEl = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("cartTotal");
    const cartSubtotalEl = document.getElementById("cartSubtotal");
    const cartDeliveryEl = document.getElementById("cartDelivery");
    
    if (!cartItemsEl) return;
    
    // Calculate subtotal
    let subtotal = 0;
    cartItemsEl.innerHTML = cart.map((item, i) => {
        subtotal += item.price || 0;
        return '<div class="cart-item">' + (item.emoji || "🍱") + ' ' + item.name + ' - ' + (item.price || 0) + '฿</div>';
    }).join('');
    
    // Get distance and calculate delivery
    const distance = parseFloat(document.getElementById("distance")?.value) || 0;
    const deliveryCost = Math.max(0, (distance - 3) * 10);
    
    // Update totals
    if (cartSubtotalEl) cartSubtotalEl.innerText = subtotal + "฿";
    if (cartDeliveryEl) cartDeliveryEl.innerText = deliveryCost + "฿";
    if (cartTotalEl) cartTotalEl.innerText = (subtotal + deliveryCost) + "฿";
}

function calculateDelivery() {
    updateCartDisplay();
}

// Close panels when clicking outside
document.addEventListener("click", function(e) {
    const loginPanel = document.getElementById("loginPanel");
    const cartPanel = document.getElementById("cartPanel");
    const loginBtn = document.querySelector(".nav-login-btn");
    
    if (loginPanel && loginPanel.classList.contains("active") && 
        !loginPanel.contains(e.target) && !loginBtn.contains(e.target)) {
        loginPanel.classList.remove("active");
    }
    
    if (cartPanel && cartPanel.classList.contains("active") && 
        !cartPanel.contains(e.target) && !loginBtn.contains(e.target)) {
        cartPanel.classList.remove("active");
    }
});
