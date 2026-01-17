export const AppShell = {
  setup () {
    const { ref, onMounted, watch } = window.Vue

    const leftDrawerOpen = ref(false)
    const router = window.VueRouter.useRouter()
    const route = window.VueRouter.useRoute()

    const isDark = ref(false)

    const navBtnClass = (path) => (route.path === path ? 'active-nav' : '')
    const drawerItemClass = (path) => (route.path === path ? 'active-drawer-nav' : '')

    const go = (path) => {
      leftDrawerOpen.value = false
      if (route.path !== path) {
        router.push(path)
      }
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

    return {
      leftDrawerOpen,
      isDark,
      navBtnClass,
      drawerItemClass,
      go,
      toggleDark
    }
  },
  template: `
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-green-7 text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
          <q-toolbar-title>
            <q-avatar>
              <img src="bneder.png" />
            </q-avatar>
            GreenHarvest Agriculture
          </q-toolbar-title>
          <q-space />
          <q-btn
            dense
            flat
            round
            class="nav-btn"
            :icon="isDark ? 'dark_mode' : 'light_mode'"
            @click="toggleDark"
          />
          <q-btn flat class="nav-btn" label="Home" :class="navBtnClass('/')" @click="go('/')" />
          <q-btn flat class="nav-btn" label="Services" :class="navBtnClass('/services')" @click="go('/services')" />
          <q-btn flat class="nav-btn" label="Products" :class="navBtnClass('/products')" @click="go('/products')" />
          <q-btn flat class="nav-btn" label="About" :class="navBtnClass('/about')" @click="go('/about')" />
          <q-btn flat class="nav-btn" label="Contact" :class="navBtnClass('/contact')" @click="go('/contact')" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
        <q-list>
          <q-item-label header>Navigation</q-item-label>
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
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </q-page-container>

      <q-footer elevated class="bg-green-9 text-white">
        <q-toolbar>
          <q-toolbar-title>
            © 2024 GreenHarvest Agriculture. All rights reserved.
          </q-toolbar-title>
          <div>
            <q-btn flat label="Privacy Policy" />
            <q-btn flat label="Terms of Service" />
          </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
  `
}
