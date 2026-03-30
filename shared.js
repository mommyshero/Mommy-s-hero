// ============================================
// SHARED.JS - Mami's Hero Login & Cart System
// ============================================

// ==================== CONSTANTS ====================
const DELIVERY_ROUNDS = [
    { id: 'tue-am', name: 'รอบอังคาร ช่วงเช้า', day: 'อังคาร', time: '09:00-12:00', cutoff: 'วันอาทิตย์ เที่ยงคืน' },
    { id: 'fri-am', name: 'รอบศุกร์ ช่วงเช้า', day: 'ศุกร์', time: '09:00-12:00', cutoff: 'วันพุธ เที่ยงคืน' }
];

const ORDER_TYPES = {
    food: { name: 'อาหาร', icon: '🍱' },
    shopping: { name: 'ฝากซื้อของ', icon: '🛒' },
    cleaning: { name: 'ทำความสะอาด', icon: '🧹' },
    postpartum: { name: 'อยู่ไฟ', icon: '🔥' },
    massage: { name: 'นวดเปิดท่อนม', icon: '💆' }
};

// ==================== LOGIN STATE ====================
function getLoginState() {
    return {
        loggedIn: localStorage.getItem('mami_hero_logged_in') === 'true',
        phone: localStorage.getItem('mami_hero_phone') || '',
        babyName: localStorage.getItem('mami_hero_baby_name') || '',
        name: localStorage.getItem('mami_hero_name') || ''
    };
}

function isLoggedIn() {
    return getLoginState().loggedIn;
}

// ==================== OTP SYSTEM ====================
let currentOTP = null;
let otpTimer = null;

function generateOTP() {
    return '1234';
}

function sendOTP(phone) {
    currentOTP = generateOTP();
    alert('📱 รหัส OTP ถูกส่งไปที่เบอร์ ' + phone + '\n\n🔢 รหัสทดสอบ: 1234');
    return true;
}

function verifyOTP(otp) {
    if (otp === currentOTP) {
        currentOTP = null;
        return true;
    }
    return false;
}

// ==================== LOGIN PANEL ====================
function openLogin() {
    const savedPassword = localStorage.getItem('mami_hero_password');
    const hint = document.getElementById('loginHint');
    const btnText = document.getElementById('loginBtnText');
    const phoneInput = document.getElementById('loginPhone');
    
    if (savedPassword) {
        if (hint) hint.textContent = 'ใส่รหัสเพื่อเข้าสู่ระบบ';
        if (btnText) btnText.textContent = '🔐 เข้าสู่ระบบ';
    } else {
        if (hint) hint.textContent = 'ครั้งแรก: ตั้งรหัสผ่าน';
        if (btnText) btnText.textContent = '🔐 ตั้งรหัส & เข้าใช้';
    }
    
    if (phoneInput) phoneInput.value = localStorage.getItem('mami_hero_phone') || '';
    
    document.getElementById('loginModal').classList.add('active');
}

function closeLogin() {
    document.getElementById('loginModal').classList.remove('active');
}

function updateLoginModal() {
    const state = getLoginState();
    const modal = document.getElementById('loginModal');
    if (!modal) return;
    
    if (state.loggedIn) {
        // Show logged in state - Cart
        modal.innerHTML = `
            <div class="modal-content login-content" style="text-align:center;">
                <button class="modal-close" onclick="closeLogin()">×</button>
                <div class="login-header">
                    <span class="login-icon">👩‍🍼</span>
                    <h2>สวัสดีคุณแม่${state.babyName ? ' ' + state.babyName : ''}!</h2>
                    <p>${state.phone}</p>
                </div>
                <div style="display:flex;gap:10px;margin-top:20px;">
                    <button class="login-btn" onclick="openCart()" style="flex:1;">
                        🛒 ตะกร้า
                    </button>
                    <button class="login-btn" onclick="logout()" style="flex:1;background:var(--gray);">
                        🚪 ออก
                    </button>
                </div>
            </div>
        `;
    } else {
        // Show login form
        modal.innerHTML = `
            <div class="modal-content login-content">
                <button class="modal-close" onclick="closeLogin()">×</button>
                <div class="login-header">
                    <span class="login-icon">👩‍🍼</span>
                    <h2>ยินดีต้อนรับ</h2>
                    <p>เข้าสู่ระบบด้วยเบอร์มือถือ</p>
                </div>
                
                <div id="loginStep1">
                    <div class="login-form">
                        <div class="form-group">
                            <label>เบอร์มือถือ</label>
                            <input type="tel" id="loginPhone" placeholder="08X-XXX-XXXX" maxlength="10" value="${state.phone}">
                        </div>
                        <button class="login-btn" onclick="requestOTP()">📨 ขอรหัส OTP</button>
                    </div>
                </div>
                
                <div id="loginStep2" style="display:none;">
                    <div class="login-form">
                        <div class="form-group">
                            <label>รหัส OTP</label>
                            <input type="text" id="loginOTP" placeholder="XXXXXX" maxlength="6">
                        </div>
                        <button class="login-btn" onclick="verifyLogin()">🔓 เข้าสู่ระบบ</button>
                        <button class="login-btn" onclick="backToStep1()" style="background:var(--gray);margin-top:10px;">← กลับ</button>
                    </div>
                </div>
                
                <p class="login-note">🔒 เราจะจำเบอร์และที่อยู่ของคุณสำหรับการสั่งครั้งต่อไป</p>
            </div>
        `;
    }
}

function requestLogin() {
    const phone = document.getElementById('loginPhone').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (phone.length < 10) {
        alert('❌ กรุณาใส่เบอร์มือถือ 10 หลัก');
        return;
    }
    
    const savedPassword = localStorage.getItem('mami_hero_password');
    
    if (savedPassword) {
        // Already has password - verify
        if (password !== savedPassword) {
            alert('❌ รหัสผ่านไม่ถูกต้อง');
            return;
        }
        localStorage.setItem('mami_hero_phone', phone);
        localStorage.setItem('mami_hero_logged_in', 'true');
        closeLogin();
        updateNavForLogin();
        alert('✅ เข้าสู่ระบบสำเร็จ!');
    } else {
        // First time - set password
        if (password.length < 4) {
            alert('❌ กรุณาตั้งรหัสอย่างน้อย 4 ตัว');
            return;
        }
        localStorage.setItem('mami_hero_phone', phone);
        localStorage.setItem('mami_hero_password', password);
        localStorage.setItem('mami_hero_logged_in', 'true');
        closeLogin();
        updateNavForLogin();
        alert('✅ ตั้งรหัสสำเร็จ! ครั้งต่อไปใช้รหัสนี้เข้าสู่ระบบ');
    }
}

function logout() {
    if (confirm('ต้องการออกจากระบบหรือไม่?')) {
        localStorage.removeItem('mami_hero_logged_in');
        closeLogin();
        updateNavForLogin();
        alert('👋 ออกจากระบบแล้ว');
    }
}

function updateNavForLogin() {
    const state = getLoginState();
    const loginLink = document.getElementById('navLoginLink');
    const cartLink = document.getElementById('navCartLink');
    
    if (state.loggedIn) {
        if (loginLink) loginLink.style.display = 'none';
        if (cartLink) {
            cartLink.style.display = 'inline';
            cartLink.onclick = openCart;
        }
        updateCartBadge();
    } else {
        if (loginLink) {
            loginLink.style.display = 'inline';
            loginLink.onclick = openLogin;
        }
        if (cartLink) {
            cartLink.style.display = 'inline';
            cartLink.onclick = openLogin;
        }
    }
}

function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'inline' : 'none';
    }
}

// ==================== CART SYSTEM ====================
function getCart() {
    return JSON.parse(localStorage.getItem('mami_hero_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('mami_hero_cart', JSON.stringify(cart));
}

function addToCart(type, name, price, details = {}) {
    const cart = getCart();
    cart.push({
        id: Date.now(),
        type,
        name,
        price,
        details,
        status: 'pending'
    });
    saveCart(cart);
    updateCartBadge();
    return cart.length;
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    updateCartBadge();
    return cart.length;
}

function clearCart() {
    saveCart([]);
    updateCartBadge();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.price, 0);
}

function calculateShipping(address) {
    // Shipping: 10฿/km, free first 3km
    // Free shipping when order >= 500฿
    const total = getCartTotal();
    
    if (total >= 500) {
        return { fee: 0, km: 0, message: 'จัดส่งฟรี! (สั่งเกิน 500 ฿)' };
    }
    
    if (!address || address.trim() === '') {
        return { fee: 0, km: 0, message: 'กรุณากรอกที่อยู่' };
    }
    
    // For demo, estimate 5km (in production, use real distance API)
    const distance = 5;
    const billableKm = Math.max(0, distance - 3);
    const fee = billableKm * 10;
    
    return { 
        fee: fee, 
        km: distance,
        billableKm: billableKm,
        message: `${distance} กม. - ค่าส่ง ${fee} ฿ (ฟรี 3 กม.แรก)` 
    };
}

// ==================== CART MODAL ====================
function openCart() {
    const state = getLoginState();
    if (!state.loggedIn) {
        openLogin();
        return;
    }
    
    const modal = document.getElementById('loginModal');
    if (!modal) return;
    
    modal.classList.add('active');
    renderCartModal();
}

function renderCartModal() {
    const state = getLoginState();
    const cart = getCart();
    const total = getCartTotal();
    
    const cartHTML = cart.length ? cart.map((item, i) => `
        <div class="cart-item" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee;">
            <div>
                <div style="font-weight:600;">${ORDER_TYPES[item.type]?.icon || '🍱'} ${item.name}</div>
                <div style="font-size:0.85rem;color:#666;">${item.price} ฿</div>
            </div>
            <button onclick="removeFromCart(${item.id});renderCartModal();" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--pink);">×</button>
        </div>
    `).join('') : '<p style="text-align:center;color:#999;padding:20px;">🛒 ยังไม่มีรายการ</p>';
    
    const shippingCalc = calculateShipping(document.getElementById('cartAddress')?.value || '');
    const grandTotal = total + shippingCalc.fee;
    
    document.getElementById('loginModal').innerHTML = `
        <div class="modal-content login-content" style="max-width:500px;">
            <button class="modal-close" onclick="closeLogin()">×</button>
            <div class="login-header">
                <span class="login-icon">🛒</span>
                <h2>ตะกร้าสินค้า</h2>
                <p>สำหรับคุณแม่${state.babyName ? ' ' + state.babyName : ''}</p>
            </div>
            <button onclick="logout()" style="background:#eee;border:none;padding:8px 15px;border-radius:20px;font-size:0.85rem;cursor:pointer;margin-bottom:15px;">📛 ออกจากระบบ</button>
            
            <div style="max-height:200px;overflow-y:auto;border:1px solid #eee;border-radius:10px;padding:10px;margin-bottom:15px;">
                ${cartHTML}
            </div>
            
            <div style="background:var(--light);padding:15px;border-radius:10px;margin-bottom:15px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:1rem;">
                    <span>รวมค่าสินค้า:</span>
                    <span style="font-weight:700;color:var(--pink);">${total.toLocaleString()} ฿</span>
                </div>
                
                <div class="form-group">
                    <label style="font-weight:600;font-size:0.95rem;">📍 ที่อยู่จัดส่ง</label>
                    <textarea id="cartAddress" rows="5" placeholder="บ้านเลขที่/หมู่บ้าน/ถนน/ตำบล/อำเภอ/จังหวัด" oninput="updateShipping()" style="font-size:1rem;width:100%;border-radius:8px;border:1px solid #ddd;padding:10px;">${localStorage.getItem('mami_hero_address') || ''}</textarea>
                </div>
                
                <div id="shippingInfo" style="padding:10px;background:#fff;border-radius:8px;margin-bottom:10px;font-size:0.95rem;">
                    <div style="display:flex;justify-content:space-between;">
                        <span>ค่าจัดส่ง:</span>
                        <span id="shippingFee" style="font-weight:600;color:var(--blue);">${shippingCalc.message}</span>
                    </div>
                </div>
                
                <div style="display:flex;justify-content:space-between;font-size:1.1rem;border-top:2px solid #ddd;padding-top:10px;margin-top:10px;">
                    <span><strong>รวมทั้งสิ้น:</strong></span>
                    <span id="grandTotal" style="font-weight:700;color:var(--pink);">${grandTotal.toLocaleString()} ฿</span>
                </div>
            </div>
            
            <div class="form-group">
                <label style="font-weight:600;">🗓️ เลือกรอบจัดส่ง</label>
                <select id="deliveryRound" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:10px;font-size:1rem;" onchange="updateRoundDetails()">
                    ${DELIVERY_ROUNDS.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
                </select>
                <div id="roundDetails" style="margin-top:10px;padding:14px;background:linear-gradient(135deg,#fff3e0,#ffe0b2);border-radius:12px;font-size:0.95rem;border:2px solid #ffcc80;box-shadow:0 3px 10px rgba(255,152,0,0.1);">
                    <strong style="color:#e65100;">📅 รายละเอียดรอบส่ง:</strong><br><br>
                    <span id="roundDay" style="font-weight:600;"></span><br>
                    <span id="roundTime" style="font-weight:600;"></span><br><br>
                    ⏱️ ตัดรอบ: <span id="roundCutoff" style="color:#e65100;font-weight:600;"></span>
                </div>
            </div>
            
            <div class="form-group">
                <label style="font-weight:600;">💳 ชำระเงิน</label>
                <div style="background:#fff;padding:15px;border-radius:10px;text-align:center;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=promptpay-${state.phone}" 
                         alt="QR Code" style="width:150px;margin-bottom:10px;"
                         onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22><text x=%2210%22 y=%22100%22 font-size=%2260%22>💳</text></svg>'">
                    <p style="font-size:0.9rem;color:#666;">สแกน QR เพื่อชำระ ${grandTotal.toLocaleString()} ฿</p>
                </div>
            </div>
            
            <div class="form-group">
                <label style="font-weight:600;">📎 แนบสลิป</label>
                <input type="file" accept="image/*" id="slipImage" style="width:100%;padding:10px;border:2px dashed #ddd;border-radius:10px;">
            </div>
            
            <div style="background:#fff3e0;padding:10px;border-radius:8px;margin-bottom:15px;font-size:0.9rem;">
                ⚠️ <strong>หมายเหตุ:</strong> สำหรับบริการต่างๆ (ฝากซื้อ/ทำความสะอาด/อยู่ไฟ/นวด) 
                ทางเราจะโทรยืนยันก่อนจึงจะนับเป็นการนัดที่สมบูรณ์
            </div>
            
            <button class="login-btn" onclick="submitOrder()">✅ ยืนยันสั่งซื้อ</button>
        </div>
    `;
    
    // Update round details immediately
    updateRoundDetails();
}

function updateShipping() {
    const address = document.getElementById('cartAddress')?.value || '';
    const shipping = calculateShipping(address);
    const total = getCartTotal();
    const grandTotal = total + shipping.fee;
    
    document.getElementById('shippingFee').textContent = shipping.message;
    document.getElementById('grandTotal').textContent = grandTotal.toLocaleString() + ' ฿';
}

function updateRoundDetails() {
    const roundId = document.getElementById('deliveryRound')?.value;
    const round = DELIVERY_ROUNDS.find(r => r.id === roundId);
    if (round) {
        document.getElementById('roundDay').textContent = '📅 วัน' + round.day;
        document.getElementById('roundTime').textContent = '⏰ ' + round.time;
        document.getElementById('roundCutoff').textContent = round.cutoff;
    }
}

function submitOrder() {
    const address = document.getElementById('cartAddress')?.value.trim();
    const deliveryRound = document.getElementById('deliveryRound')?.value;
    const slipInput = document.getElementById('slipImage');
    const cart = getCart();
    
    if (!address) {
        alert('❌ กรุณากรอกที่อยู่จัดส่ง');
        return;
    }
    
    if (cart.length === 0) {
        alert('❌ ยังไม่มีรายการในตะกร้า');
        return;
    }
    
    const state = getLoginState();
    const total = getCartTotal();
    const shipping = calculateShipping(address);
    const grandTotal = total + shipping.fee;
    const round = DELIVERY_ROUNDS.find(r => r.id === deliveryRound);
    
    // Save address for next time
    localStorage.setItem('mami_hero_address', address);
    
    // Create order
    const order = {
        id: 'ORD' + Date.now(),
        phone: state.phone,
        customerName: state.name || state.babyName || 'ลูกค้า',
        babyName: state.babyName,
        address: address,
        items: cart,
        subtotal: total,
        shipping: shipping.fee,
        total: grandTotal,
        deliveryRound: round,
        status: 'pending',
        created: new Date().toISOString()
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('mami_hero_orders') || '[]');
    orders.push(order);
    localStorage.setItem('mami_hero_orders', JSON.stringify(orders));
    
    // Check if service (not food)
    const hasService = cart.some(item => item.type !== 'food');
    
    // Clear cart
    clearCart();
    closeLogin();
    
    if (hasService) {
        alert(`✅ รายการถูกบันทึกแล้ว!\n\n📞 เราจะโทรยืนยันภายใน 30 นาที\nเพื่อนัดวันและเวลาที่สะดวก\n\n📋 เลขที่สั่งซื้อ: ${order.id}`);
    } else {
        alert(`✅ สั่งซื้อสำเร็จ!\n\n📋 เลขที่สั่งซื้อ: ${order.id}\n💰 ยอดรวม: ${grandTotal.toLocaleString()} ฿\n📅 รอบส่ง: ${round?.name}\n\n📞 หากไม่ได้รับการยืนยันภายใน 1 ชม. กรุณาติดต่อ LINE`);
    }
}

// ==================== UPDATE ALL NAV BUTTONS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Update nav login button
    updateNavForLogin();
    
    // Update cart badge
    updateCartBadge();
    
    // If logged in, update cart icon
    const state = getLoginState();
    if (state.loggedIn) {
        // Replace login button with cart
        const loginBtn = document.querySelector('.nav-login-btn');
        if (loginBtn) {
            loginBtn.innerHTML = '🛒';
            loginBtn.onclick = openCart;
        }
    }
});

// Make functions globally available
window.openLogin = openLogin;
window.closeLogin = closeLogin;
window.logout = logout;
window.toggleLoginPanel = openLogin; // backward compat
window.handleLogin = function(e) { e.preventDefault(); requestOTP(); };
window.openCart = openCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartBadge = updateCartBadge;
window.renderCartModal = renderCartModal;
window.updateRoundDetails = updateRoundDetails;

// ==================== MAMI SHOP MODAL ====================
function openMamiShop() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
        renderMamiShop();
    }
}

function renderMamiShop() {
    const state = getLoginState();
    const cart = getCart();
    const total = getCartTotal();
    
    if (!state.loggedIn) {
        openLogin();
        return;
    }
    
    const cartHTML = cart.length ? cart.map((item, i) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #eee;">
            <div style="flex:1;">
                <div style="font-weight:600;font-size:1rem;">${ORDER_TYPES[item.type]?.icon || '🍱'} ${item.name}</div>
                <div style="font-size:0.9rem;color:#666;">${item.price} ฿</div>
            </div>
            <button onclick="removeFromCart(${item.id});renderMamiShop();" style="width:36px;height:36px;border-radius:50%;background:#ffebee;color:var(--pink);border:none;font-size:1.2rem;cursor:pointer;">×</button>
        </div>
    `).join('') : `
        <div style="text-align:center;padding:40px 20px;color:#999;">
            <div style="font-size:4rem;margin-bottom:15px;">🛒</div>
            <p style="font-size:1.1rem;">ยังไม่มีรายการ</p>
            <p style="font-size:0.9rem;">เลือกอาหารหรือบริการเพิ่มในตะกร้า</p>
        </div>
    `;
    
    document.getElementById('loginModal').innerHTML = `
        <div class="modal-content login-content" style="max-width:500px;">
            <button class="modal-close" onclick="closeLogin()">×</button>
            <div class="login-header">
                <span class="login-icon">🛒</span>
                <h2>Mami Shop</h2>
                <p>สำหรับคุณแม่${state.babyName ? ' ' + state.babyName : ''}</p>
            </div>
            
            <div style="max-height:300px;overflow-y:auto;border:1px solid #eee;border-radius:12px;padding:15px;margin-bottom:15px;">
                ${cartHTML}
            </div>
            
            ${cart.length ? `
                <div style="background:linear-gradient(135deg,#fff5f8,#fff);padding:15px;border-radius:12px;margin-bottom:15px;border:2px solid #fce4ec;">
                    <div style="display:flex;justify-content:space-between;font-size:1.1rem;margin-bottom:8px;">
                        <span>รวมค่าสินค้า:</span>
                        <span style="font-weight:700;color:var(--pink);">${total.toLocaleString()} ฿</span>
                    </div>
                    ${total >= 500 ? '<div style="color:var(--green);font-size:0.9rem;">✓ จัดส่งฟรี!</div>' : '<div style="color:#666;font-size:0.9rem;">สั่งเพิ่ม ' + (500 - total).toLocaleString() + ' ฿ ขึ้นไป จัดส่งฟรี</div>'}
                </div>
                
                <button class="login-btn" onclick="openCart()">✓ ดำเนินการต่อ</button>
            ` : ''}
        </div>
    `;
}

window.openMamiShop = openMamiShop;
window.renderMamiShop = renderMamiShop;
