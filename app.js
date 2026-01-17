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
  .active-nav {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-radius: 4px;
  }

  .active-drawer-nav {
    background-color: #f1f8e9 !important;
    border-left: 3px solid #2E7D32;
    color: #2E7D32 !important;
  }

  .nav-btn:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease;
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
