import { AppShell } from './components/AppShell.js'
import { HomePage } from './pages/HomePage.js'
import { ServicesPage } from './pages/ServicesPage.js'
import { ProductsPage } from './pages/ProductsPage.js'
import { AboutPage } from './pages/AboutPage.js'
import { ContactPage } from './pages/ContactPage.js'

const routes = [
  { path: '/', component: HomePage },
  { path: '/services', component: ServicesPage },
  { path: '/products', component: ProductsPage },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = window.VueRouter.createRouter({
  history: window.VueRouter.createWebHashHistory(),
  routes
})

const style = document.createElement('style')
style.textContent = `
  /* Enhanced mobile responsive styles */
  html {
    font-size: 16px;
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    touch-action: manipulation;
    height: 100%;
    overflow-x: hidden;
  }
  
  body {
    height: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Safe area support for notched devices */
  @supports (padding: max(0px)) {
    .safe-area-top {
      padding-top: max(1rem, env(safe-area-inset-top));
    }
    .safe-area-bottom {
      padding-bottom: max(1rem, env(safe-area-inset-bottom));
    }
    .safe-area-left {
      padding-left: max(1rem, env(safe-area-inset-left));
    }
    .safe-area-right {
      padding-right: max(1rem, env(safe-area-inset-right));
    }
  }
  
  @media (max-width: 599px) {
    html {
      font-size: 14px;
    }
    
    /* Better viewport handling */
    body {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    /* Enhanced scroll behavior */
    .q-page-container {
      -webkit-overflow-scrolling: touch;
      height: 100vh;
      height: 100dvh; /* Dynamic viewport height */
      overflow-y: auto;
      overscroll-behavior-y: contain;
      scroll-behavior: smooth;
    }
    
    /* Pull-to-refresh indicator */
    .pull-to-refresh-indicator {
      position: fixed;
      top: -60px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      transition: top 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: rgba(46, 125, 50, 0.1);
      border-radius: 50%;
    }
    
    .pull-to-refresh-indicator.active {
      top: 20px;
    }
    
    /* Enhanced touch targets */
    .q-btn {
      min-height: 48px !important;
      min-width: 48px !important;
      padding: 0 16px !important;
      border-radius: 8px !important;
      position: relative;
      overflow: hidden;
      transform: translate3d(0,0,0);
      transition: transform 0.1s, background-color 0.3s;
    }
    
    .q-btn:active {
      transform: scale(0.96);
    }
    
    /* Better mobile navigation */
    .q-footer {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    
    .q-tab {
      min-height: 60px !important;
      transition: transform 0.2s ease, color 0.3s ease;
    }
    
    .q-tab--active {
      transform: translateY(-2px);
    }
    
    /* Enhanced card interactions */
    .q-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }
    
    .q-card:active {
      transform: scale(0.98);
      background-color: rgba(0,0,0,0.02);
    }
    
    /* Better form inputs */
    .q-field {
      margin-bottom: 16px;
    }
    
    .q-field__control {
      min-height: 56px !important;
    }
    
    /* Prevent zoom on input focus */
    @media screen and (-webkit-min-device-pixel-ratio:0) {
      input, select, textarea {
        font-size: 16px !important;
      }
    }
    
    /* Hide scrollbar but keep functionality */
    ::-webkit-scrollbar {
      display: none;
    }
    
    /* Better image handling */
    .q-img {
      border-radius: 8px;
      overflow: hidden;
    }
    
    /* Enhanced transitions */
    .q-page {
      animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform, opacity;
    }
    
    /* Mobile-specific spacing */
    .q-pa-md {
      padding: 12px 16px !important;
    }
    
    .q-mb-md {
      margin-bottom: 12px !important;
    }
    
    /* Better text rendering */
    .text-h4 {
      line-height: 1.2 !important;
    }
    
    .text-body1 {
      line-height: 1.5 !important;
    }
  }
  
  /* Active navigation states */
  .active-nav {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-radius: 4px;
  }

  body.body--dark .active-nav {
    background-color: rgba(255, 255, 255, 0.14) !important;
  }

  .active-drawer-nav {
    background-color: #f1f8e9 !important;
    border-left: 3px solid #2E7D32;
    color: #2E7D32 !important;
  }

  body.body--dark .active-drawer-nav {
    background-color: rgba(46, 125, 50, 0.18) !important;
    border-left: 3px solid #66bb6a;
    color: #c8e6c9 !important;
  }

  .nav-btn:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease;
  }

  body.body--dark .nav-btn:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
  
  /* Responsive utilities */
  .full-width-sm {
    width: 100%;
    max-width: 300px;
  }
  
  @media (min-width: 600px) {
    .full-width-sm {
      width: auto;
      max-width: none;
    }
  }
  
  /* Responsive text with better line heights */
  .text-h2-sm { 
    font-size: 1.75rem; 
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  .text-h1-md { 
    font-size: 2.5rem; 
    line-height: 1.15;
    letter-spacing: -0.03em;
  }
  .text-h5-sm { 
    font-size: 1.25rem; 
    line-height: 1.5;
  }
  .text-h4-md { 
    font-size: 1.5rem; 
    line-height: 1.4;
    letter-spacing: -0.02em;
  }
  .text-h3-md { 
    font-size: 1.75rem; 
    line-height: 1.3;
    letter-spacing: -0.02em;
  }
  .text-h2-lg { 
    font-size: 2.5rem; 
    line-height: 1.2;
    letter-spacing: -0.03em;
  }
  
  @media (min-width: 600px) {
    .text-h2-sm { 
      font-size: 2rem;
      line-height: 1.15;
    }
    .text-h1-md { 
      font-size: 3rem;
      line-height: 1.1;
    }
    .text-h5-sm { 
      font-size: 1.25rem;
      line-height: 1.5;
    }
    .text-h4-md { 
      font-size: 1.5rem;
      line-height: 1.4;
    }
    .text-h3-md { 
      font-size: 2rem;
      line-height: 1.3;
    }
    .text-h2-lg { 
      font-size: 2.5rem;
      line-height: 1.2;
    }
  }
  
  @media (min-width: 1024px) {
    .text-h2-sm { 
      font-size: 2.5rem;
      line-height: 1.1;
    }
    .text-h1-md { 
      font-size: 3.5rem;
      line-height: 1.05;
    }
    .text-h5-sm { 
      font-size: 1.5rem;
      line-height: 1.5;
    }
    .text-h4-md { 
      font-size: 1.75rem;
      line-height: 1.4;
    }
    .text-h3-md { 
      font-size: 2.25rem;
      line-height: 1.3;
    }
    .text-h2-lg { 
      font-size: 3rem;
      line-height: 1.2;
    }
  }
  
  /* App-like animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Slide animations for navigation */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .slide-enter-from {
    transform: translateX(100%);
  }
  
  .slide-leave-to {
    transform: translateX(-30%);
    opacity: 0.5;
  }
  
  /* Bottom sheet animation */
  .q-dialog__inner--bottom > div {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  /* Enhanced ripple effects */
  .ripple {
    position: relative;
    overflow: hidden;
  }
  
  .ripple:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: 0;
    transform: scale(10, 10);
    transition: transform 0.5s, opacity 1s;
  }
  
  .ripple:active:after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
  
  /* Desktop hover effects */
  @media (hover: hover) and (pointer: fine) {
    .q-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1) !important;
    }
  }
  
  /* Smooth transitions for all interactive elements */
  a, button, .q-btn, .q-item, .q-tab, .q-field {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Mobile-specific improvements */
  @media (max-width: 599px) {
    /* Disable text selection on interactive elements */
    button, [role="button"], .q-btn {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-touch-callout: none;
      user-select: none;
    }
    
    /* Better scroll behavior */
    html, body {
      -webkit-overflow-scrolling: touch;
    }
    
    /* Enhanced button feedback */
    .q-btn {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .q-btn:active {
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
  }
  
  /* Dark mode mobile optimizations */
  body.body--dark {
    background-color: #121212;
  }
  
  body.body--dark .q-footer {
    background-color: #1e1e1e !important;
  }
  
  body.body--dark .q-card {
    background-color: #1e1e1e !important;
  }
`
document.head.appendChild(style)

const app = window.Vue.createApp(AppShell)
app.use(router)

const quasar = window.Quasar
app.use(quasar)

if (quasar && quasar.IconSet && typeof quasar.IconSet.set === 'function') {
  const iconSet = quasar.IconSet.svgMaterialIcons || quasar.IconSet.materialIcons
  if (iconSet) {
    quasar.IconSet.set(iconSet)
  }
}
app.mount('#q-app')

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ws.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
              // You can add a UI notification here to inform the user
            }
          });
        });
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Listen for controller change (when a new service worker takes over)
let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (!refreshing) {
    window.location.reload();
    refreshing = true;
  }
});
