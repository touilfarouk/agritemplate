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
  /* Base responsive styles */
  html {
    font-size: 16px;
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    touch-action: manipulation;
  }
  
  @media (max-width: 599px) {
    html {
      font-size: 14px;
    }
    
    /* Prevent overscroll bounce on iOS */
    body {
      position: fixed;
      width: 100%;
      overflow: hidden;
    }
    
    /* Better scroll behavior */
    .q-page-container {
      -webkit-overflow-scrolling: touch;
      height: 100vh;
      overflow-y: auto;
      overscroll-behavior-y: contain;
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
  
  /* Better touch targets and interactions for mobile */
  @media (max-width: 599px) {
    /* Disable text selection on interactive elements */
    button, [role="button"], .q-btn {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-touch-callout: none;
      user-select: none;
    }
    
    /* Smooth scrolling */
    html, body {
      -webkit-overflow-scrolling: touch;
    }
    
    /* Prevent zoom on input focus */
    @media screen and (-webkit-min-device-pixel-ratio:0) {
      input, select, textarea {
        font-size: 16px !important;
      }
    }
    .q-btn {
      min-height: 48px;
      min-width: 48px;
      padding: 0 16px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      transform: translate3d(0,0,0);
      transition: transform 0.1s, background-color 0.3s;
    }
    
    .q-btn:active {
      transform: scale(0.96);
    }
    
    /* Ripple effect */
    .q-btn:after {
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
      transform: scale(10,10);
      opacity: 0;
      transition: transform .5s, opacity 1s;
    }
    
    .q-btn:active:after {
      transform: scale(0,0);
      opacity: 0.2;
      transition: 0s;
    }
    
    .q-field--with-bottom {
      padding-bottom: 16px;
    }
    
    .q-field__bottom {
      min-height: 20px;
    }
    
    /* Bottom navigation active state */
    .q-tab--active {
      transform: translateY(-2px);
    }
    
    /* Smooth transitions */
    .q-tab {
      transition: transform 0.2s ease, color 0.3s ease;
    }
    
    /* Pull to refresh indicator */
    .q-pull-to-refresh__puller {
      height: 50px !important;
      margin-top: -50px !important;
    }
    
    /* Hide scrollbar but keep functionality */
    ::-webkit-scrollbar {
      display: none;
    }
  }
  
  /* Smooth transitions for all interactive elements */
  a, button, .q-btn, .q-item, .q-tab, .q-field {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  
  /* App-like transitions and animations */
  .q-page {
    animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
  }
  
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
  
  /* Ripple effect for buttons */
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
  
  /* Card hover effect for desktop and touch feedback for mobile */
  .q-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }
  
  @media (hover: hover) and (pointer: fine) {
    .q-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1) !important;
    }
  }
  
  /* Active state for mobile */
  @media (max-width: 599px) {
    .q-card:active {
      transform: scale(0.98);
      background-color: rgba(0,0,0,0.02);
    }
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
