const APP = {
  sw: null,
  deferredPrompt: null,
  isOnline: 'onLine' in navigator && navigator.onLine,
  navCount: 0,
  isStandalone: false,

  init() {
    this.registerSW();
    this.addListeners();
    this.checkNavCount();
    this.updateOnlineStatus();
  },

  async registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/ws.js');
        this.sw = registration.active;
        console.log('Service Worker registered');
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  },

  addListeners() {
    // Check if app is running in standalone mode
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);
    
    // Add event listeners
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt.bind(this));
    
    // Track navigation count
    this.trackNavigation();
  },

  handleInstallPrompt(e) {
    e.preventDefault();
    this.deferredPrompt = e;
    console.log('Install prompt available');
    
    // Show your custom install button or UI here
    this.showInstallButton();
  },

  showInstallButton() {
    // Add your custom install button logic here
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '20px';
    installButton.style.right = '20px';
    installButton.style.zIndex = '1000';
    installButton.addEventListener('click', () => this.promptInstall());
    document.body.appendChild(installButton);
  },

  async promptInstall() {
    if (!this.deferredPrompt) return;
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // Hide install button
      const installButton = document.querySelector('button[aria-label="Install App"]');
      if (installButton) installButton.style.display = 'none';
    } else {
      console.log('User dismissed the install prompt');
    }
    
    this.deferredPrompt = null;
  },

  updateOnlineStatus(isOnline) {
    this.isOnline = isOnline !== undefined ? isOnline : navigator.onLine;
    document.body.classList.toggle('offline', !this.isOnline);
    
    // Update status indicator if it exists
    const statusIndicator = document.querySelector('.online-status');
    if (statusIndicator) {
      statusIndicator.textContent = this.isOnline ? 'Online' : 'Offline';
    }
    
    // Notify service worker about status change
    if (this.sw) {
      this.sw.postMessage({ type: 'ONLINE_STATUS', isOnline: this.isOnline });
    }
  },

  trackNavigation() {
    if (this.isStandalone) return;
    
    let navCount = sessionStorage.getItem('navCount') || 0;
    navCount = parseInt(navCount, 10) + 1;
    sessionStorage.setItem('navCount', navCount);
    
    console.log(`Navigation count: ${navCount}`);
  },

  checkNavCount() {
    if (this.isStandalone) return;
    
    const navCount = parseInt(sessionStorage.getItem('navCount'), 10) || 0;
    if (navCount > 2) {
      console.log('Show install prompt after multiple visits');
      this.showInstallPrompt();
    }
  },

  showInstallPrompt() {
    // Add your logic to show install prompt
    console.log('Would show install prompt now');
  }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  APP.init();
  
  // Optional: Check for updates
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }
});