// Baby Tracking System
let babies = JSON.parse(localStorage.getItem('babies')) || [{ id: 1, name: 'ลูกคนแรก', photo: 'baby-bg.jpg', birthdate: '', weight: '', height: '', records: [] }];
let currentBabyId = parseInt(localStorage.getItem('currentBabyId')) || 1;
let activeTimers = JSON.parse(localStorage.getItem('activeTimers')) || { sleep: null, tummy: null };

function initBabyTracking() {
    renderBabyTabs();
    updateCurrentBaby();
    renderActiveTimers();
    startTimerDisplays();
}

function renderBabyTabs() {
    const tabsContainer = document.getElementById('babyTabs');
    if (!tabsContainer) return;
    tabsContainer.innerHTML = babies.map(baby => `
        <div class="baby-tab ${baby.id === currentBabyId ? 'active' : ''}" onclick="switchBaby(${baby.id})">
            👶 ${baby.name}
        </div>
    `).join('');
}

function switchBaby(id) {
    currentBabyId = id;
    localStorage.setItem('currentBabyId', id);
    renderBabyTabs();
    updateCurrentBaby();
    renderActiveTimers();
}

function addNewBaby() {
    const name = prompt('ใส่ชื่อลูก:');
    if (!name) return;
    const newBaby = { id: Date.now(), name: name, photo: 'baby-bg.jpg', birthdate: '', weight: '', height: '', records: [] };
    babies.push(newBaby);
    saveBabies();
    switchBaby(newBaby.id);
    showToast(`✅ เพิ่ม ${name} แล้ว!`);
}

function changeBabyPhoto() {
    document.getElementById('babyPhotoInput').click();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const newPhoto = e.target.result;
        const baby = babies.find(b => b.id === currentBabyId);
        if (baby) {
            baby.photo = newPhoto;
            saveBabies();
            updateCurrentBaby();
            showToast('✅ เปลี่ยนรูปแล้ว!');
        }
    };
    reader.readAsDataURL(file);
}

function updateCurrentBaby() {
    const baby = babies.find(b => b.id === currentBabyId);
    if (!baby) return;
    document.getElementById('currentBabyPhoto').src = baby.photo;
    document.getElementById('currentBabyName').textContent = baby.name;
    if (baby.birthdate) {
        const age = calculateAge(baby.birthdate);
        document.getElementById('currentBabyAge').textContent = `อายุ: ${age}`;
    }
    document.getElementById('currentBabyWeightInput').value = baby.weight || '';
    document.getElementById('currentBabyHeightInput').value = baby.height || '';
    updateLastRecords(baby);
}

function calculateAge(birthdate) {
    const birth = new Date(birthdate);
    const now = new Date();
    const months = Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 30));
    if (months < 1) {
        const days = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
        return `${days} วัน`;
    } else if (months < 12) {
        return `${months} เดือน`;
    } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years} ปี ${remainingMonths} เดือน`;
    }
}

function saveBabies() {
    localStorage.setItem('babies', JSON.stringify(babies));
    localStorage.setItem('activeTimers', JSON.stringify(activeTimers));
}

function getCurrentBaby() { return babies.find(b => b.id === currentBabyId); }

function addRecord(type, data) {
    const baby = getCurrentBaby();
    if (!baby) return;
    const record = { id: Date.now(), type: type, timestamp: new Date().toISOString(), data: data };
    baby.records.unshift(record);
    saveBabies();
    updateLastRecords(baby);
}

function updateLastRecords(baby) {
    const sleep = baby.records.find(r => r.type === 'sleep');
    const feeding = baby.records.find(r => r.type === 'feeding');
    const diaper = baby.records.find(r => r.type === 'diaper');
    const tummy = baby.records.find(r => r.type === 'tummy');
    const vaccine = baby.records.find(r => r.type === 'vaccine');
    
    document.getElementById('lastSleep').textContent = sleep ? `นอนล่าสุด: ${formatDateTime(sleep.timestamp)}` : 'นอนล่าสุด: -';
    document.getElementById('lastFeeding').textContent = feeding ? `กินล่าสุด: ${formatDateTime(feeding.timestamp)}` : 'กินล่าสุด: -';
    document.getElementById('lastDiaper').textContent = diaper ? `เปลี่ยนล่าสุด: ${formatDateTime(diaper.timestamp)}` : 'เปลี่ยนล่าสุด: -';
    document.getElementById('lastTummy').textContent = tummy ? `ครั้งล่าสุด: ${formatDateTime(tummy.timestamp)}` : 'ครั้งล่าสุด: -';
    document.getElementById('lastVaccine').textContent = vaccine ? `วัคซีนล่าสุด: ${vaccine.data.type} (${formatDate(vaccine.timestamp)})` : 'วัคซีนล่าสุด: -';
    
    const upcomingVaccines = baby.records.filter(r => r.type === 'vaccine' && r.data.next).sort((a, b) => new Date(a.data.next) - new Date(b.data.next));
    document.getElementById('nextVaccine').textContent = upcomingVaccines.length > 0 ? `ครั้งต่อไป: ${upcomingVaccines[0].data.type} (${formatDate(upcomingVaccines[0].data.next)})` : 'ครั้งต่อไป: -';
}

function formatDateTime(isoString) {
    const date = new Date(isoString);
    const diff = Date.now() - date;
    if (diff < 60000) return 'เมื่อกี้';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} นาทีที่แล้ว`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} ชม. ที่แล้ว`;
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function formatDate(isoString) {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

function renderActiveTimers() {
    const container = document.getElementById('activeTimers');
    if (!container) return;
    let count = 0;
    if (activeTimers.sleep) count++;
    if (activeTimers.tummy) count++;
    if (count === 0) {
        container.innerHTML = '<p style="color: #7F8C8D; text-align: center;">ไม่มีไทม์เมอร์ที่ทำงาน</p>';
    } else {
        let html = '<h4>⏱️ ไทม์เมอร์ที่ทำงาน</h4>';
        if (activeTimers.sleep) html += '<div class="timer-item"><span>😴 กำลังนอน</span><span>1</span></div>';
        if (activeTimers.tummy) html += '<div class="timer-item"><span>🤸 Tummy Time</span><span>1</span></div>';
        container.innerHTML = html;
    }
}

function startTimerDisplays() {
    setInterval(() => {
        if (activeTimers.sleep) {
            const elapsed = Date.now() - activeTimers.sleep.start;
            document.getElementById('sleepTimer').textContent = formatElapsed(elapsed);
        }
        if (activeTimers.tummy) {
            const elapsed = Date.now() - activeTimers.tummy.start;
            document.getElementById('tummyTimer').textContent = formatElapsed(elapsed);
        }
    }, 1000);
}

function formatElapsed(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startSleep() {
    activeTimers.sleep = { start: Date.now(), babyId: currentBabyId };
    saveBabies();
    renderActiveTimers();
    showToast('🌙 เริ่มบันทึกการนอน');
}

function stopSleep() {
    if (!activeTimers.sleep) { showToast('⚠️ ยังไม่ได้เริ่มนอน'); return; }
    const duration = Date.now() - activeTimers.sleep.start;
    addRecord('sleep', { duration: duration, durationText: formatElapsed(duration) });
    activeTimers.sleep = null;
    saveBabies();
    renderActiveTimers();
    document.getElementById('sleepTimer').textContent = '00:00:00';
    showToast('☀️ บันทึกการนอนเสร็จสิ้น!');
}

function recordFeeding(type, side) {
    const amount = document.getElementById('feedingAmount').value;
    addRecord('feeding', { type: type, side: side, amount: amount ? parseFloat(amount) : null });
    let message = `🍼 บันทึก ${type}`;
    if (side) message += ` (${side})`;
    if (amount) message += ` ${amount} ออนส์`;
    showToast(message + ' แล้ว!');
    document.getElementById('feedingAmount').value = '';
}

function recordDiaper(type, color) {
    addRecord('diaper', { type: type, color: color });
    if (color === 'ใส') {
        showToast(`👶 บันทึก ${type} ${color} แล้ว!`);
    } else {
        showToast(`👶 บันทึก ${type} สี${color} แล้ว!`);
    }
}

function startTummyTime() {
    activeTimers.tummy = { start: Date.now(), babyId: currentBabyId };
    saveBabies();
    renderActiveTimers();
    showToast('🤸 เริ่ม Tummy Time!');
}

function stopTummyTime() {
    if (!activeTimers.tummy) { showToast('⚠️ ยังไม่ได้เริ่ม Tummy Time'); return; }
    const duration = Date.now() - activeTimers.tummy.start;
    addRecord('tummy', { duration: duration, durationText: formatElapsed(duration) });
    activeTimers.tummy = null;
    saveBabies();
    renderActiveTimers();
    document.getElementById('tummyTimer').textContent = '00:00:00';
    showToast('✅ บันทึก Tummy Time เสร็จสิ้น!');
}

function updateBabyStats() {
    const baby = babies.find(b => b.id === currentBabyId);
    if (!baby) return;
    const weight = document.getElementById('currentBabyWeightInput').value;
    const height = document.getElementById('currentBabyHeightInput').value;
    if (weight) {
        baby.weight = weight;
        addRecord('growth', { weight: weight, height: baby.height || '' });
    }
    if (height) baby.height = height;
    saveBabies();
    updateCurrentBaby();
    showToast('✅ บันทึกข้อมูลแล้ว!');
}

function openGrowthChart() {
    const baby = getCurrentBaby();
    if (!baby) return;
    let message = `📊 กราฟเจริญเติบโต - ${baby.name}\n\n⚖️ น้ำหนัก: ${baby.weight || '-'} kg\n📏 ส่วนสูง: ${baby.height || '-'} cm\n\n`;
    const growthRecords = baby.records.filter(r => r.type === 'growth');
    if (growthRecords.length > 0) {
        message += `📈 บันทึก (${growthRecords.length} ครั้ง):\n`;
        growthRecords.slice(-10).forEach((r, i) => {
            message += `${i + 1}. ${formatDate(r.timestamp)} - ${r.data.weight}kg\n`;
        });
    } else {
        message += 'ยังไม่มีบันทึก';
    }
    alert(message);
}

function openVaccineModal() {
    const vaccineType = prompt('วัคซีนอะไร (เช่น BCG, HBV, DTP):');
    if (!vaccineType) return;
    const nextDate = prompt('นัดครั้งต่อไป (วว/ดด/ปปปป):');
    addRecord('vaccine', { type: vaccineType, next: nextDate });
    showToast('✅ บันทึกวัคซีนแล้ว!');
}

function openTimelineModal() {
    const baby = getCurrentBaby();
    if (!baby) return;
    const records = baby.records.slice(0, 20);
    let message = `📋 ไทม์ไลน์ ${baby.name}\n\n`;
    records.forEach((r, i) => {
        const time = formatDateTime(r.timestamp);
        let desc = '';
        if (r.type === 'sleep') desc = `😴 นอน ${r.data.durationText}`;
        else if (r.type === 'feeding') desc = `🍼 ${r.data.type}`;
        else if (r.type === 'diaper') desc = `👶 ${r.data.type} สี${r.data.color}`;
        else if (r.type === 'tummy') desc = `🤸 Tummy Time ${r.data.durationText}`;
        else if (r.type === 'vaccine') desc = `💉 ${r.data.type}`;
        else if (r.type === 'growth') desc = `📊 ${r.data.weight}kg`;
        message += `${i + 1}. ${time} - ${desc}\n`;
    });
    message += `\n📊 รวม ${records.length} รายการ`;
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
window.addEventListener('DOMContentLoaded', initBabyTracking);
