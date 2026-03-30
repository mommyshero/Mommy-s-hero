// Stories System
const stories = [
    {
        title: 'สายฝนของใจแม่',
        cover: 'story-rain.jpg',
        duration: '5 นาที',
        images: 7,
        moral: 'แค่เป็นตัวเองและทำสิ่งดีๆ เท่าที่ทำได้ ก็เพียงพอแล้ว',
        content: `แม่กระซิบที่หูลูก รู้อะไรไหม ลูกก็เหมือนเมฆฝนนะ 

คนตัวเล็กก็ทำให้คนรอบตัวอบอุ่นได้ด้วยสิ่งเล็กๆ ที่ลูกทำตั้งแต่รอยยิ้ม การกอด หรือคำพูดดีๆ เมฆฝนไม่ได้ทำทุกอย่าง แต่เมฆฝนไม่เคยยอมแพ้ เมฆฝนเห็นว่าความดีเล็กๆ เก็บรวมได้เป็นทุ่งที่งดงาม 

วันหนึ่งเมฆฝนกลายเป็นสายฝนที่ช่วยให้ต้นไม้สูงขึ้น ให้แม่น้ำร้องเพลงใหม่นุ่มๆ

เราไม่ได้ต้องการเป็นฝนที่ตกทั้งมหาสมุทรทีเดียว ลูกไม่ต้องทำทุกอย่าง แค่เป็นตัวของลูก และทำสิ่งดีๆ เท่าที่ทำได้ ก็เพียงพอแล้ว

ลูกหลับตา น้ำตาเล็กๆ ที่ไม่ได้เป็นความเศร้าหยดหนึ่งบนแก้ม แม่เช็ดให้ด้วยปลายนิ้วอ่อนโยน "แม่ภูมิใจในลูกนะ ที่ลูกมีความอ่อนโยนและกล้าลอง เหมือนเมฆฝนที่ตกลงมาแรกๆ"

เสียงฝนยังคงลงเป็นจังหวะ กลายเป็นพรมสีเงินที่ลูบโลกให้สดชื่น 

แม่กดจูบเบาๆ ที่หน้าผากลูก แล้วพูดคำสุดท้ายก่อนลูกจะหลับลึก

"เมื่อใดที่ลูกสงสัยว่าตัวเองสำคัญหรือไม่ จงนึกถึงสายฝนแรกของแม่ ที่มาแตะใจเธอเบาๆ และรู้ไว้ว่า แม่เชื่อในลูกเสมอ"

และฝันของลูกจึงเต็มไปด้วยทุ่งดอกไม้ที่เปียกชุ่มและเมล็ดฝนตัวจิ๋วที่กล้าสร้างความเปลี่ยนแปลงด้วยสิ่งเล็กๆ

-- จบ --`
    },
    {
        title: 'ข้าวฝีมือแม่หอมจัง',
        cover: 'story-rice.jpg',
        duration: '3 นาที',
        images: 5,
        moral: 'ข้าวที่แม่ทำใส่ความรักมาเต็มคำเลย อร่อยที่สุดในโลก!',
        content: `"ฉ่า... ฉ่า... เสียงกระทะดังมาจากในครัว แม่กระต่ายกำลังทำกับข้าว

กลิ่นหอมฟุ้งลอยไปถึงห้องนอนเลย ลูกกระต่ายวิ่งมาดู 
'ว้าว!' แม่ตกแต่งจานข้าวเป็นรูปหน้ายิ้ม มีหูเป็นแครอท มีตาเป็นถั่วลันเตา

ลูกกระต่ายกินหม่ำๆ จนหมดจาน แล้วบอกว่า ข้าวที่แม่ทำใส่ความรักมาเต็มคำเลย อร่อยที่สุดในโลก!"

-- จบ --`
    },
    {
        title: 'กระจกยิ้มแฉ่ง',
        cover: 'story-kajok.jpg',
        duration: '3 นาที',
        images: 5,
        moral: 'ความรักของแม่ทำให้โลกสดใสจริงๆ',
        content: `หนูนาตื่นมาง่วงนอน หน้ามุ่ยเชียว... 

แต่พอแม่เดินเข้ามาแล้วยิ้มให้กว้างๆ จนเห็นฟันขาว 

หนูนาเห็นแม่ยิ้มก็เผลอยิ้มตาม

ฮิๆ ฮ่าๆ! พอเรายิ้มให้กัน 

บ้านที่มืดๆ ก็สว่างเหมือนมีพระอาทิตย์ดวงโตมาส่องแสงอยู่ในบ้านเลย 

ความรักของแม่ทำให้โลกสดใสจริงๆ

-- จบ --`
    },
    {
        title: 'เสียงเพลงของแม่',
        cover: 'story-music.jpg',
        duration: '4 นาที',
        images: 6,
        moral: 'เสียงแม่นุ่มนวลกว่าสายลม เบากว่าเสียงใบไม้ไหว',
        content: `ในคืนที่มืดตื๋อ... ลูกลิงนอนไม่หลับ

มันพลิกตัวไปมา 

แม่ลิงเห็นดังนั้นจึงลูบหัวเบาๆ แล้วร้องเพลง 'ลัล ลัล ลา... หลับตาเสียเจ้าลิงน้อย...' 

เสียงแม่นุ่มนวลกว่าสายลม 

เบากว่าเสียงใบไม้ไหว 

ลูกลิงเคลิ้มไปกับเสียงหวานๆ ของแม่ แล้วก็หลับปุ๋ยไปพร้อมกับฝันที่แสนหวาน

-- จบ --`
    },
    {
        title: 'แสงไฟนำทาง',
        cover: 'story-light.jpg',
        duration: '3 นาที',
        images: 5,
        moral: 'พ่อคือแสงสว่างที่ทำให้ลูกไม่เคยหลงทาง',
        content: `ลูกหมาป่าวิ่งเล่นจนหลงเข้าไปในพุ่มไม้หญ้าสูง 

'เอ... ทางกลับบ้านอยู่ไหนนะ?' 

ทันใดนั้น แสงไฟรำไรก็สว่างขึ้น วับๆ แวมๆ 

พ่อนั่นเองที่ถือไฟฉายคอยมองหาลูกอยู่หน้าบ้าน 

ลูกหมาป่าดีใจมากวิ่งไปหาพ่อทันที 

พ่อคือแสงสว่างที่ทำให้ลูกไม่เคยหลงทาง

-- จบ --`
    },
    {
        title: 'เสื้อไหมพรมอุ่นจัง',
        cover: 'story-sweater.jpg',
        duration: '4 นาที',
        images: 6,
        moral: 'เพราะแม่ใส่ความห่วงใยลงไปในทุกๆ เส้นไหม',
        content: `แม่แมวนั่งถักไหมพรม 

คลิก... คลิก... ใช้เวลานานหลายวันเลย 

จนได้เสื้อตัวจิ๋วสีชมพู ลูกแมวลองใส่แล้วนุ่มนิ่มมาก 

'แม่ครับ ทำไมเสื้อตัวนี้อุ่นจัง?' 

แม่แมวยิ้มแล้วบอกว่า 'เพราะแม่ใส่ความห่วงใยลงไปในทุกๆ เส้นไหมไงจ๊ะ' 

ลูกแมวใส่เสื้อตัวนี้แล้วรู้สึกเหมือนแม่กอดไว้ตลอดเวลาเลย

-- จบ --`
    },
    {
        title: 'มือของพ่อแม่แข็งแรงที่สุด',
        cover: 'story-parents.jpg',
        duration: '4 นาที',
        images: 6,
        moral: 'ขอบคุณมือที่แข็งแรงของพ่อแม่ที่ช่วยส่งลูกไปถึงฝัน',
        content: `ลูกเต่าน้อยอยากขึ้นไปบนโขดหินเพื่อดูพระอาทิตย์ตกดิน 

แต่มันตัวเล็กเกินไป ปีนเท่าไหร่ก็ลื่นไถล ปรื๊ด... 

พ่อเต่ารีบใช้หลังช่วยหนุน แม่เต่าใช้เท้าช่วยดัน 

'เอ้า ฮึ่ย เล่ ฮึ่ย!' จนลูกเต่าขึ้นไปข้างบนได้สำเร็จ วิวสวยจังเลย! 

ขอบคุณมือที่แข็งแรงของพ่อแม่ที่ช่วยส่งลูกไปถึงฝัน

-- จบ --`
    },
    {
        title: 'ยอดมนุษย์ในบ้าน',
        cover: 'story-superhero.jpg',
        duration: '4 นาที',
        images: 6,
        moral: 'ยอดมนุษย์ไม่ต้องใส่หน้ากาก แต่อยู่ในชุดลำลองที่บ้าน',
        content: `เด็กน้อยถามว่า 'ยอดมนุษย์มีจริงไหมครับ?' 

พ่อไม่ตอบแต่รีบอุ้มเด็กน้อยขึ้นชูสูงๆ 

'ฟิ้ววว... หนูบินได้แล้ว!' 

แม่เดินมาพร้อมจานขนม 'ขนมเสกมาแล้วจ้า!' 

เด็กน้อยหัวเราะชอบใจ แล้วคิดในใจว่า ยอดมนุษย์ไม่ต้องใส่หน้ากาก แต่อยู่ในชุดลำลองที่บ้านนี่เอง 

รักยอดมนุษย์พ่อแม่ที่สุดเลย

-- จบ --`
    },
    {
        title: 'กอดอุ่นๆ ของพ่อ',
        cover: 'story-hug.jpg',
        duration: '3 นาที',
        images: 5,
        moral: 'กอดของพ่ออุ่นที่สุดเลย',
        content: `เจ้าหมีน้อยสะดุดรากไม้... ตุ๊บ! โอ๊ย เจ็บจังเลย น้ำตาเม็ดโตกำลังจะไหลออกมาแล้ว 

พ่อหมีตัวใหญ่เดินเข้ามาหา ยืดแขนกว้างๆ แล้วดึงหมีน้อยเข้าไปกอด ฟอด... ฟอด... พ่อหมีหอมแก้มซ้าย หอมแก้มขวา

หมีน้อยรู้สึกอุ่นไปทั้งใจ ความเจ็บหายวับไปเลย! หมีน้อยยิ้มแฉ่งแล้วบอกว่า กอดของพ่ออุ่นที่สุดเลย

-- จบ --`
    }
];

let currentStoryIndex = 0;

function generateStoryCards() {
    const grid = document.getElementById('storiesGrid');
    if (!grid) return;

    grid.innerHTML = stories.map((story, index) => `
        <div class="story-card" onclick="openStory(${index})">
            <img src="${story.cover}" alt="${story.title}" class="story-card-img" />
            <div class="story-card-content">
                <h3>${story.title}</h3>
                <p>${story.moral}</p>
                <div class="story-card-meta">
                    <span>⏱️ ${story.duration}</span>
                    <span>📖 ${story.images} ภาพ</span>
                </div>
                <span class="story-card-btn">อ่านนิทาน →</span>
            </div>
        </div>
    `).join('');
}

function openStory(index) {
    currentStoryIndex = index;
    const story = stories[index];
    
    document.getElementById('storyHeroImage').src = story.cover;
    document.getElementById('storyTitle').textContent = story.title;
    document.getElementById('storyDuration').textContent = '⏱️ ' + story.duration;
    document.getElementById('storyImageCount').textContent = '📖 ' + story.images + ' ภาพ';
    document.getElementById('storyContent').textContent = story.content;
    document.getElementById('storyMoral').innerHTML = '💡 ข้อคิด: ' + story.moral;
    
    document.getElementById('storyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeStory() {
    document.getElementById('storyModal').classList.remove('active');
    document.body.style.overflow = '';
}

function prevStory() {
    if (currentStoryIndex > 0) {
        openStory(currentStoryIndex - 1);
    } else {
        openStory(stories.length - 1);
    }
}

function nextStory() {
    if (currentStoryIndex < stories.length - 1) {
        openStory(currentStoryIndex + 1);
    } else {
        openStory(0);
    }
}

// Close story modal when clicking outside or pressing Escape
window.onclick = function(event) {
    const storyModal = document.getElementById('storyModal');
    if (event.target === storyModal) {
        closeStory();
    }
}

document.addEventListener('keydown', function(e) {
    const storyModal = document.getElementById('storyModal');
    if (storyModal && storyModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeStory();
        } else if (e.key === 'ArrowLeft') {
            prevStory();
        } else if (e.key === 'ArrowRight') {
            nextStory();
        }
    }
});

function toggleMobileMenu() {
    alert('Mobile menu clicked');
}

// Generate story cards on page load
window.addEventListener('DOMContentLoaded', generateStoryCards);
