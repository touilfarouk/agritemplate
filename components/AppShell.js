export const AppShell = {
  setup () {
    const { ref, onMounted, watch, computed } = window.Vue
    const $q = window.Quasar ? window.Quasar : {}

    const leftDrawerOpen = ref(false)
    const bottomSheetOpen = ref(false)
    const router = window.VueRouter.useRouter()
    const route = window.VueRouter.useRoute()
    const isDark = ref(false)
    const refreshing = ref(false)
    const touchStartX = ref(0)
    const touchStartY = ref(0)
    const isSwiping = ref(false)
    const pullToRefreshThreshold = ref(80)
    const pullToRefreshY = ref(0)
    const isPulling = ref(false)
    
    // Haptic feedback function
    const hapticFeedback = (type = 'light') => {
      if ('vibrate' in navigator) {
        navigator.vibrate(type === 'light' ? 20 : 40)
      }
    }

    const navBtnClass = (path) => (route.path === path ? 'active-nav' : '')
    const drawerItemClass = (path) => (route.path === path ? 'active-drawer-nav' : '')

    const go = (path, withHaptic = true) => {
      leftDrawerOpen.value = false
      bottomSheetOpen.value = false
      if (route.path !== path) {
        if (withHaptic) hapticFeedback()
        router.push(path)
      }
      // Smooth scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    const onRefresh = (done) => {
      refreshing.value = true
      // Simulate refresh delay
      setTimeout(() => {
        refreshing.value = false
        done()
      }, 1500)
    }

    const applyDark = (value) => {
      const quasar = window.Quasar
      if (quasar && quasar.Dark && typeof quasar.Dark.set === 'function') {
        quasar.Dark.set(!!value)
      }
    }

    const toggleDark = () => {
      isDark.value = !isDark.value
    }

    onMounted(() => {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        isDark.value = true
      } else if (saved === 'light') {
        isDark.value = false
      } else {
        isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      }

      applyDark(isDark.value)
    })

    watch(isDark, (value) => {
      localStorage.setItem('theme', value ? 'dark' : 'light')
      applyDark(value)
    })

    // Enhanced touch event handlers for mobile gestures
    const onTouchStart = (e) => {
      touchStartX.value = e.touches[0].clientX
      touchStartY.value = e.touches[0].clientY
      isSwiping.value = true
      
      // Check for pull-to-refresh
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop === 0) {
        isPulling.value = true
        pullToRefreshY.value = 0
      }
    }

    const onTouchMove = (e) => {
      if (!isSwiping.value) return
      
      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const diffX = touchStartX.value - touchX
      const diffY = touchY - touchStartY.value
      
      // Handle pull-to-refresh
      if (isPulling.value && diffY > 0 && Math.abs(diffY) > Math.abs(diffX)) {
        e.preventDefault()
        pullToRefreshY.value = Math.min(diffY, pullToRefreshThreshold.value * 1.5)
        
        if (pullToRefreshY.value >= pullToRefreshThreshold.value && !refreshing.value) {
          hapticFeedback('medium')
        }
        return
      }
      
      // Only handle horizontal swipes for navigation
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
        e.preventDefault()
      }
    }

    const onTouchEnd = (e) => {
      if (!isSwiping.value) return
      
      const touchX = e.changedTouches[0].clientX
      const touchY = e.changedTouches[0].clientY
      const diffX = touchStartX.value - touchX
      const diffY = touchY - touchStartY.value
      
      // Handle pull-to-refresh
      if (isPulling.value && pullToRefreshY.value >= pullToRefreshThreshold.value && !refreshing.value) {
        onRefresh(() => {})
        isPulling.value = false
        pullToRefreshY.value = 0
        return
      }
      
      // Reset pull state
      isPulling.value = false
      pullToRefreshY.value = 0
      
      // Handle horizontal swipes for navigation
      if (Math.abs(diffX) > 50 && Math.abs(diffY) < 30) {
        const routes = ['/', '/services', '/products', '/about', '/contact']
        const currentIndex = routes.indexOf(route.path)
        
        if (diffX > 0 && currentIndex < routes.length - 1) {
          // Swipe left - go to next page
          go(routes[currentIndex + 1])
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right - go to previous page
          go(routes[currentIndex - 1])
        }
        
        hapticFeedback('light')
      }
      
      isSwiping.value = false
    }
    
    // Add touch event listeners
    onMounted(() => {
      document.addEventListener('touchstart', onTouchStart, { passive: false })
      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd, { passive: true })
    })

    return {
      leftDrawerOpen,
      bottomSheetOpen,
      isDark,
      refreshing,
      pullToRefreshY,
      isPulling,
      navBtnClass,
      drawerItemClass,
      go,
      toggleDark,
      onRefresh,
      hapticFeedback
    }
  },
  template: `
    <q-layout view="hHh lpR fFf" class="app-layout" @touchstart.passive="hapticFeedback('light')">
      <q-header elevated class="bg-green-7 text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" class="q-mr-sm" />
          <q-toolbar-title class="text-subtitle1 text-sm-h6">
            <q-avatar size="md" class="q-mr-sm">
              <img src="bneder.png" />
            </q-avatar>
            GreenHarvest
          </q-toolbar-title>
          
          <!-- Desktop Navigation -->
          <div class="gt-sm">
            <q-btn flat class="nav-btn" label="Home" :class="navBtnClass('/')" @click="go('/')" />
            <q-btn flat class="nav-btn" label="Services" :class="navBtnClass('/services')" @click="go('/services')" />
            <q-btn flat class="nav-btn" label="Products" :class="navBtnClass('/products')" @click="go('/products')" />
            <q-btn flat class="nav-btn" label="About" :class="navBtnClass('/about')" @click="go('/about')" />
            <q-btn flat class="nav-btn" label="Contact" :class="navBtnClass('/contact')" @click="go('/contact')" />
          </div>
          
          <q-space />
          <q-btn
            dense
            flat
            round
            class="nav-btn q-ml-sm"
            :icon="isDark ? 'dark_mode' : 'light_mode'"
            @click="toggleDark"
            size="md"
          />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated :width="280" :breakpoint="600" :behavior="$q.platform.is.mobile ? 'mobile' : 'desktop'">
        <q-scroll-area class="fit">
          <q-list>
            <q-item-label header class="text-green-7">Navigation</q-item-label>
            <q-item clickable v-ripple :class="drawerItemClass('/')" @click="go('/')">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>Home</q-item-section>
            </q-item>
            <q-item clickable v-ripple :class="drawerItemClass('/services')" @click="go('/services')">
              <q-item-section avatar>
                <q-icon name="eco" />
              </q-item-section>
              <q-item-section>Services</q-item-section>
            </q-item>
            <q-item clickable v-ripple :class="drawerItemClass('/products')" @click="go('/products')">
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>
              <q-item-section>Products</q-item-section>
            </q-item>
            <q-item clickable v-ripple :class="drawerItemClass('/about')" @click="go('/about')">
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>
              <q-item-section>About</q-item-section>
            </q-item>
            <q-item clickable v-ripple :class="drawerItemClass('/contact')" @click="go('/contact')">
              <q-item-section avatar>
                <q-icon name="phone" />
              </q-item-section>
              <q-item-section>Contact</q-item-section>
            </q-item>
            
            <q-separator class="q-my-md" />
            
            <q-item-label header class="text-green-7">Quick Actions</q-item-label>
            <q-item clickable v-ripple @click="toggleDark">
              <q-item-section avatar>
                <q-icon :name="isDark ? 'light_mode' : 'dark_mode'" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-pull-to-refresh @refresh="onRefresh" :disable="refreshing">
          <router-view v-slot="{ Component }">
            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </q-pull-to-refresh>
      </q-page-container>
      
      <!-- Bottom Sheet (Mobile) -->
      <q-dialog v-model="bottomSheetOpen" position="bottom" seamless maximized>
        <q-card class="rounded-t-lg" style="width: 100%; max-width: 600px;">
          <q-card-section class="bg-green-7 text-white row items-center no-wrap">
            <div class="text-h6">Quick Navigation</div>
            <q-space />
            <q-btn flat round dense icon="close" @click="bottomSheetOpen = false" />
          </q-card-section>
          <q-list>
            <q-item clickable v-ripple @click="go('/about'); bottomSheetOpen = false">
              <q-item-section avatar>
                <q-icon name="info" color="green-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label>About Us</q-item-label>
                <q-item-label caption>Learn about our mission</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="go('/contact'); bottomSheetOpen = false">
              <q-item-section avatar>
                <q-icon name="phone" color="green-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Contact</q-item-label>
                <q-item-label caption>Get in touch with us</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple @click="toggleDark(); bottomSheetOpen = false">
              <q-item-section avatar>
                <q-icon :name="isDark ? 'light_mode' : 'dark_mode'" color="green-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</q-item-label>
                <q-item-label caption>Toggle theme</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
      
      <!-- Bottom Navigation (Mobile) -->
      <q-footer elevated class="bg-white lt-md" style="height: 60px;">
        <div class="row no-wrap items-center justify-between q-px-sm full-height">
          <q-btn 
            flat 
            round 
            dense 
            icon="menu" 
            @click="leftDrawerOpen = !leftDrawerOpen"
            class="q-mx-xs"
            size="sm"
          />
          
          <q-tabs
            v-model="$route.path"
            active-color="green-7"
            indicator-color="transparent"
            class="text-grey-7"
            dense
            no-caps
            narrow-indicator
            shrink
            style="flex: 1 1 auto;"
          >
            <q-route-tab
              v-for="item in [
                { path: '/', icon: 'home', label: 'Home' },
                { path: '/services', icon: 'eco', label: 'Services' },
                { path: '/products', icon: 'shopping_cart', label: 'Products' }
              ]"
              :key="item.path"
              :name="item.path"
              :icon="item.icon"
              :label="item.label"
              @click="go(item.path)"
              class="q-px-xs"
              style="min-height: 60px;"
            />
          </q-tabs>
          
          <q-btn 
            flat 
            round 
            dense 
            icon="more_horiz" 
            @click="bottomSheetOpen = true"
            class="q-mx-xs"
            color="green-7"
            size="sm"
          />
        </div>
      </q-footer>

      <!-- Desktop Footer -->
      <q-footer elevated class="bg-green-9 text-white gt-sm">
        <q-toolbar class="q-pa-md">
          <div class="text-center full-width">
            <div class="text-caption text-uppercase q-mb-xs">© 2024 GreenHarvest Agriculture</div>
            <div class="row justify-center q-gutter-x-md">
              <q-btn flat dense size="sm" label="Privacy Policy" class="q-px-sm" />
              <q-separator vertical color="white-30" />
              <q-btn flat dense size="sm" label="Terms of Service" class="q-px-sm" />
            </div>
          </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
  `
}
