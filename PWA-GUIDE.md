# 📱 Mommy's Hero - PWA App Guide

## แปลงเว็บเป็นแอปได้แล้ว!

เว็บไซต์ Mommy's Hero ตอนนี้รองรับ **PWA (Progressive Web App)** แล้ว สามารถติดตั้งเป็นแอปบนมือถือได้โดยไม่ต้องผ่าน App Store!

---

## 🚀 วิธีติดตั้งแอป

### 📱 Android (Chrome)

1. เปิดเว็บ `index.html` ใน Chrome
2. รอ 3 วินาที จะมีแบนเนอร์เด้งขึ้นมา
3. กดปุ่ม **"ติดตั้ง"**
4. แอปจะปรากฏบนหน้า Home Screen

**หรือ:**
1. กดเมนู ⋮ (3 จุด)
2. เลือก **"Add to Home screen"**
3. กด **"Add"**

### 🍎 iOS (Safari)

1. เปิดเว็บ `index.html` ใน Safari
2. กดปุ่ม **Share** (สี่เหลี่ยมมีลูกศรชี้ขึ้น)
3. เลือก **"Add to Home Screen"**
4. กด **"Add"** มุมขวาบน

### 💻 Desktop (Chrome/Edge)

1. เปิดเว็บใน Chrome หรือ Edge
2. ดูที่ address bar จะมีไอคอน **ติดตั้งแอป** (+)
3. กดปุ่ม **"Install"**
4. แอปจะเปิดในหน้าต่างแยก

---

## ✨ ฟีเจอร์ของแอป

| ฟีเจอร์ | คำอธิบาย |
|---------|----------|
| 📱 **ติดตั้งได้** | เพิ่มลง Home Screen ได้เหมือนแอปปกติ |
| 🌐 **ทำงาน Offline** | ดูหน้าเว็บได้แม้ไม่มีอินเทอร์เน็ต |
| 🔔 **พร้อม Push Notification** | (เพิ่มได้ในอนาคต) |
| ⚡ **เร็ว** | โหลดเร็วเพราะ cache ไว้ |
| 🎨 **Full Screen** | ไม่มี address bar เหมือนแอปแท้ |

---

## 📁 ไฟล์ PWA

```
web/
├── index.html          # หน้าหลัก (มี PWA code)
├── manifest.json       # App config (ชื่อ, ไอคอน, สี)
├── sw.js               # Service Worker (cache, offline)
├── install-banner.js   # แบนเนอร์ติดตั้ง (แยกไฟล์)
├── icon-192x192.png    # ไอคอนแอป (192px)
└── icon-512x512.png    # ไอคอนแอป (512px)
```

---

## 🎨 สร้างไอคอนแอป

### ใช้ Placeholder (ชั่วคราว)
```bash
# สร้างไอคอนง่ายๆ ด้วย Canva หรือ Figma
# ขนาด: 192x192 และ 512x512
# พื้นหลัง: #e94560 (สีชมพู)
# ไอคอน: 🍱 หรือ logo
```

### ใช้ Real Icon
1. ออกแบบ logo Mommy's Hero
2. Export เป็น PNG 2 ขนาด
3. วางในโฟลเดอร์ `web/`

---

## 🧪 ทดสอบ PWA

### Chrome DevTools
1. เปิดเว็บใน Chrome
2. กด F12 (DevTools)
3. ไปที่แท็บ **Application**
4. ตรวจสอบ:
   - ✅ Manifest
   - ✅ Service Workers
   - ✅ Cache Storage

### Lighthouse Audit
1. กด F12 → แท็บ **Lighthouse**
2. เลือก **Progressive Web App**
3. กด **Analyze page load**
4. ได้คะแนน PWA

---

## 🔧 manifest.json Config

```json
{
  "name": "Mommy's Hero - อาหารเพื่อคุณแม่และลูกน้อย",
  "short_name": "Mommy's Hero",
  "start_url": "/index.html",
  "display": "standalone",
  "theme_color": "#e94560",
  "background_color": "#0a0a0a"
}
```

### คำอธิบาย
| Field | ค่า | ความหมาย |
|-------|-----|----------|
| `name` | ชื่อเต็ม | แสดงตอนติดตั้ง |
| `short_name` | ชื่อย่อ | แสดงบน Home Screen |
| `start_url` | หน้าแรก | เปิดแอปมาเจอหน้าไหน |
| `display` | standalone | แสดงแบบเต็มจอ (ไม่มี browser UI) |
| `theme_color` | #e94560 | สี theme ของแอป |
| `background_color` | #0a0a0a | สีพื้นหลังตอนโหลด |

---

## 📊 Service Worker ทำงานยังไง?

```
1. Install → Cache ไฟล์หลัก
2. Fetch → ดึงจาก cache ก่อน (offline ได้)
3. Activate → ลบ cache เก่า
```

### ไฟล์ที่ Cache
- `index.html`
- `manifest.json`
- CSS, JS (ถ้ามี)

---

## 🎯 Install Banner

แบนเนอร์จะเด้งขึ้นมาเมื่อ:
- ✅ ผู้ใช้เปิดเว็บครั้งแรก
- ✅ Browser รองรับ PWA
- ✅ ยังไม่ได้ติดตั้ง
- ✅ ยังไม่ได้กดปิดแบนเนอร์

### ปิดแบนเนอร์
- กดปุ่ม **×** มุมขวา
- แบนเนอร์จะไม่เด้งอีก (เก็บใน localStorage)

---

## 📱 ทดสอบบนมือถือ

### Local Network
```bash
# เปิด server บนคอม
cd ~/Documents/Nodrama\ Company/mommys-hero/web/
python3 -m http.server 8000

# บนมือถือ เข้าเว็บ
http://<คอม-IP>:8000
```

### Deploy จริง
- **Netlify:** https://app.netlify.com/drop
- **Vercel:** https://vercel.com
- **GitHub Pages:** ฟรี

---

## ✅ Checklist ก่อน Deploy

- [ ] มีไฟล์ `manifest.json`
- [ ] มีไฟล์ `sw.js`
- [ ] มีไอคอน 192x192 และ 512x512
- [ ] เว็บใช้ HTTPS (จำเป็นสำหรับ PWA)
- [ ] ทดสอบบนมือถือแล้ว
- [ ] ทดสอบ offline ได้

---

## 🚀 Deploy บน Netlify (ฟรี)

1. ไปที่ https://app.netlify.com/drop
2. ลากโฟลเดอร์ `web/` ทั้งโฟลเดอร์
3. ได้ URL ทันที (เช่น `https://mommys-hero.netlify.app`)
4. แชร์ลิงก์ให้ลูกค้าติดตั้งแอป!

---

## 📞 Support

ถ้ามีปัญหาในการติดตั้ง:
- ตรวจสอบว่าใช้ browser ที่รองรับ (Chrome, Safari, Edge)
- ต้องใช้ HTTPS (ยกเว้น localhost)
- ลอง clear cache แล้วลองใหม่

---

**Version:** 1.0.0  
**Build Date:** March 26, 2026  
**Status:** ✅ PWA Ready
