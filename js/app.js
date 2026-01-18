const APP = {
  sw: null,
  deferredPrompt: null,
  isOnline: 'onLine' in navigator && navigator.onLine,
  navCount: 0,
  isStandalone: false,
  installButton: null,

  init() {
    this.registerSW();
    this.addListeners();
    this.updateOnlineStatus();
    this.createInstallButton();
  },

  async registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/ws.js');
        this.sw = registration.active || registration.installing || registration.waiting;
        
        // Track service worker state changes
        if (registration.installing) {
          registration.installing.addEventListener('statechange', (e) => {
            console.log('Service Worker state:', e.target.state);
          });
        }
        
        console.log('Service Worker registered with scope:', registration.scope);
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  },

  addListeners() {
    // Check if app is running in standalone mode
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone === true;
    
    // Network status
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));
    
    // PWA installation
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('Install prompt available');
      this.showInstallButton();
    });
    
    // App installed
    window.addEventListener('appinstalled', (evt) => {
      console.log('App was installed successfully!');
      this.hideInstallButton();
    });
  },

  createInstallButton() {
    // Create install button if it doesn't exist
    if (!this.installButton) {
      this.installButton = document.createElement('button');
      this.installButton.id = 'installButton';
      this.installButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Install App
      `;
      
      // Add styles
      Object.assign(this.installButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
        display: 'none',
        background: '#2E7D32',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
      });
      
      // Add hover/active states
      this.installButton.addEventListener('mouseover', () => {
        this.installButton.style.background = '#1B5E20';
        this.installButton.style.transform = 'translateY(-2px)';
      });
      
      this.installButton.addEventListener('mouseout', () => {
        this.installButton.style.background = '#2E7D32';
        this.installButton.style.transform = 'translateY(0)';
      });
      
      this.installButton.addEventListener('mousedown', () => {
        this.installButton.style.transform = 'translateY(1px)';
      });
      
      this.installButton.addEventListener('mouseup', () => {
        this.installButton.style.transform = 'translateY(-2px)';
      });
      
      // Add click handler
      this.installButton.addEventListener('click', () => this.promptInstall());
      
      // Add to DOM
      document.body.appendChild(this.installButton);
    }
  },

  showInstallButton() {
    if (this.installButton && !this.isStandalone) {
      this.installButton.style.display = 'flex';
    }
  },

  hideInstallButton() {
    if (this.installButton) {
      this.installButton.style.display = 'none';
    }
  },

  async promptInstall() {
    if (!this.deferredPrompt) {
      console.log('No install prompt available');
      return;
    }
    
    try {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log(`User ${outcome}ed the install prompt`);
      
      if (outcome === 'accepted') {
        console.log('App installation in progress');
        this.hideInstallButton();
        
        // Track installation in analytics if needed
        if (window.gtag) {
          gtag('event', 'install_prompt', {
            'event_category': 'engagement',
            'event_label': 'Install Prompt Accepted'
          });
        }
      } else {
        console.log('User dismissed the install prompt');
        // Optionally show a message or retry button
      }
    } catch (err) {
      console.error('Error during install prompt:', err);
    } finally {
      this.deferredPrompt = null;
    }
  },

  updateOnlineStatus(isOnline) {
    this.isOnline = isOnline !== undefined ? isOnline : navigator.onLine;
    document.body.classList.toggle('offline', !this.isOnline);
    
    // Update status indicator if it exists
    const statusIndicator = document.querySelector('.online-status');
    if (statusIndicator) {
      statusIndicator.textContent = this.isOnline ? 'Online' : 'Offline';
      statusIndicator.style.color = this.isOnline ? '#2E7D32' : '#D32F2F';
    }
    
    // Show offline notification
    if (!this.isOnline) {
      this.showOfflineNotification();
    }
    
    // Notify service worker about status change
    if (this.sw) {
      this.sw.postMessage({ 
        type: 'ONLINE_STATUS', 
        isOnline: this.isOnline,
        timestamp: Date.now()
      });
    }
  },

  showOfflineNotification() {
    // You can implement a more sophisticated notification system
    const notification = document.createElement('div');
    notification.className = 'offline-notification';
    notification.textContent = 'You are currently offline. Some features may be limited.';
    
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#D32F2F',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '4px',
      zIndex: '1000',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      animation: 'fadeIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
};

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, 10px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: translate(-50%, 0); }
    to { opacity: 0; transform: translate(-50%, 10px); }
  }
  .offline-notification {
    animation: fadeIn 0.3s ease;
  }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => APP.init());
} else {
  APP.init();
}

// Expose APP to window for debugging
window.APP = APP;