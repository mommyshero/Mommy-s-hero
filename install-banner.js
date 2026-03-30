// PWA Install Banner for Mommy's Hero
let deferredPrompt;
let installButton;

// Create install banner
function createInstallBanner() {
  const banner = document.createElement('div');
  banner.id = 'install-banner';
  banner.innerHTML = `
    <div class="banner-content">
      <div class="banner-icon">🍱</div>
      <div class="banner-text">
        <strong>ติดตั้งแอป Mommy's Hero</strong>
        <p>เข้าถึงได้ง่ายขึ้น ติดตั้งเลย!</p>
      </div>
      <button class="banner-install">ติดตั้ง</button>
      <button class="banner-close">&times;</button>
    </div>
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    #install-banner {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #e94560, #ff6b6b);
      color: #fff;
      padding: 15px 20px;
      border-radius: 50px;
      box-shadow: 0 10px 40px rgba(233, 69, 96, 0.4);
      z-index: 9999;
      display: none;
      animation: slideUp 0.3s ease;
      max-width: 90%;
      width: 400px;
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateX(-50%) translateY(50px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    
    .banner-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .banner-icon {
      font-size: 2rem;
    }
    
    .banner-text {
      flex: 1;
    }
    
    .banner-text strong {
      display: block;
      font-size: 1rem;
      margin-bottom: 3px;
    }
    
    .banner-text p {
      font-size: 0.85rem;
      opacity: 0.9;
      margin: 0;
    }
    
    .banner-install {
      background: #fff;
      color: #e94560;
      border: none;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .banner-install:hover {
      transform: scale(1.05);
    }
    
    .banner-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.7;
      padding: 0;
      line-height: 1;
    }
    
    .banner-close:hover {
      opacity: 1;
    }
    
    @media (max-width: 480px) {
      #install-banner {
        width: calc(100% - 40px);
        bottom: 10px;
      }
      
      .banner-text p {
        display: none;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(banner);
  
  // Close button
  banner.querySelector('.banner-close').addEventListener('click', () => {
    banner.style.display = 'none';
    localStorage.setItem('installBannerDismissed', 'true');
  });
  
  // Install button
  installButton = banner.querySelector('.banner-install');
  installButton.addEventListener('click', installApp);
}

// Install app
function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
      document.getElementById('install-banner').style.display = 'none';
    });
  }
}

// Listen for install prompt
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show banner if not dismissed
  const dismissed = localStorage.getItem('installBannerDismissed');
  if (!dismissed) {
    setTimeout(() => {
      createInstallBanner();
      document.getElementById('install-banner').style.display = 'block';
    }, 3000); // Show after 3 seconds
  }
});

// App installed
window.addEventListener('appinstalled', () => {
  console.log('Mommy\'s Hero was installed');
  localStorage.setItem('installBannerDismissed', 'true');
  const banner = document.getElementById('install-banner');
  if (banner) {
    banner.style.display = 'none';
  }
});

// Check if already installed
window.addEventListener('load', () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Running as installed PWA');
  }
});
