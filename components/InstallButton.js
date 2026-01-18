// Custom install button component
const InstallButton = {
  data() {
    return {
      deferredPrompt: null,
      showInstallButton: false,
      boundBeforeInstallPromptHandler: null
    };
  },
  mounted() {
    // Listen for beforeinstallprompt event
    this.boundBeforeInstallPromptHandler = this.handleBeforeInstallPrompt.bind(this);
    window.addEventListener('beforeinstallprompt', this.boundBeforeInstallPromptHandler);
    
    // Check if the app is already installed
    window.addEventListener('appinstalled', () => {
      console.log('App was installed');
      this.showInstallButton = false;
    });
  },
  beforeUnmount() {
    if (this.boundBeforeInstallPromptHandler) {
      window.removeEventListener('beforeinstallprompt', this.boundBeforeInstallPromptHandler);
    }
  },
  methods: {
    handleBeforeInstallPrompt(e) {
      // Prevent the default prompt
      e.preventDefault();

      const isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
        window.navigator.standalone === true;
      if (isStandalone) {
        this.showInstallButton = false;
        this.deferredPrompt = null;
        return;
      }

      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      // Show the install button
      this.showInstallButton = true;
    },
    async installApp() {
      if (!this.deferredPrompt) return;
      
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      
      // We've used the prompt, and can't use it again, throw it away
      this.deferredPrompt = null;
      this.showInstallButton = false;
    }
  },
  template: `
    <q-btn 
      v-if="showInstallButton"
      color="green-7" 
      icon="get_app" 
      label="Install App" 
      class="q-ml-sm"
      @click="installApp"
    />
  `
};

export { InstallButton };
