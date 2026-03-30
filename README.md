# Mommy's Hero - Landing Page

หน้าเว็บ Landing Page สำหรับบริการ Mommy's Hero

## 📁 ไฟล์

- `index.html` - หน้าหลัก (Thai language)

## 🚀 การใช้งาน

### เปิดในเบราว์เซอร์
```bash
# Mac
open index.html

# หรือ double-click ที่ไฟล์
```

### Deploy บน Hosting

**Option 1: Netlify Drop**
1. ไปที่ https://app.netlify.com/drop
2. ลากโฟลเดอร์ `web` ไปวาง
3. ได้ URL ทันที

**Option 2: GitHub Pages**
1. Push ไฟล์ขึ้น GitHub
2. เปิด Pages ใน Settings
3. ได้ URL: `https://username.github.io/repo`

**Option 3: WordPress**
1. อัปโหลดเป็น Page Template
2. หรือใช้ Plugin เช่น "Insert Headers and Footers"

## ✨ ฟีเจอร์

- ✅ Responsive Design (มือถือ + เดสก์ท็อป)
- ✅ Modal สั่งอาหาร
- ✅ Smooth Scroll
- ✅ Form Validation
- ✅ Google Fonts (Prompt)
- ✅ Animation (float, hover effects)

## 🎨 สีที่ใช้

| สี | Code | การใช้ |
|----|------|--------|
| Primary | #FF6B9D | ปุ่ม, logo |
| Primary Dark | #E91E63 | Gradient |
| Secondary | #4ECDC4 | accent |
| Accent | #FFE66D | stars, badges |

## 📱 หน้าจอที่รองรับ

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🔌 API Integration

ฟอร์มสั่งอาหารพร้อมเชื่อมกับ WordPress REST API:

```javascript
fetch('/wp-json/mommys-hero/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
});
```

## 📞 ติดต่อ

- **Email:** info@mommyshero.com
- **โทร:** 02-XXX-XXXX

---

**Version:** 1.0.0  
**Build Date:** March 26, 2026
