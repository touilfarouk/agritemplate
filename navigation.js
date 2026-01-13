// Navigation Script for GreenHarvest Agriculture Website
// Add this script to each HTML file to enable smart navigation

class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.isQuasarReady = false;
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename || 'index.html';
    }

    init() {
        // Wait for Quasar to be ready
        this.waitForQuasar(() => {
            this.updateActiveNavigation();
            this.setupNavigationHandlers();
            this.setupMobileMenu();
        });
    }

    waitForQuasar(callback) {
        const checkQuasar = () => {
            // Check if Quasar components are ready
            const hasQuasarElements = document.querySelector('q-btn') || document.querySelector('q-item');
            if (hasQuasarElements) {
                this.isQuasarReady = true;
                callback();
            } else {
                setTimeout(checkQuasar, 100);
            }
        };
        checkQuasar();
    }

    updateActiveNavigation() {
        // Update header navigation - use data attributes or specific classes
        const navigationLinks = document.querySelectorAll('[data-nav]');
        navigationLinks.forEach(link => {
            const targetPage = link.getAttribute('data-nav');
            if (this.isPageActive(targetPage)) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });

        // Update drawer navigation
        const drawerLinks = document.querySelectorAll('[data-drawer-nav]');
        drawerLinks.forEach(link => {
            const targetPage = link.getAttribute('data-drawer-nav');
            if (this.isPageActive(targetPage)) {
                link.classList.add('active-drawer-nav');
            } else {
                link.classList.remove('active-drawer-nav');
            }
        });
    }

    isPageActive(pageName) {
        const pageMap = {
            'home': 'index.html',
            'services': 'services.html',
            'products': 'products.html',
            'about': 'about.html',
            'contact': 'contact.html'
        };
        
        const targetPage = pageMap[pageName];
        return this.currentPage === targetPage;
    }

    setupNavigationHandlers() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-nav], [data-drawer-nav]');
            if (target) {
                e.preventDefault();
                const pageName = target.getAttribute('data-nav') || target.getAttribute('data-drawer-nav');
                this.navigateToPage(pageName);
                
                // Close drawer if it's a drawer navigation
                if (target.hasAttribute('data-drawer-nav')) {
                    this.closeDrawer();
                }
            }
        });
    }

    navigateToPage(pageName) {
        const pageMap = {
            'home': 'index.html',
            'services': 'services.html',
            'products': 'products.html',
            'about': 'about.html',
            'contact': 'contact.html'
        };

        const targetPage = pageMap[pageName];
        if (targetPage && targetPage !== this.currentPage) {
            // Add smooth transition effect
            this.addPageTransition();
            
            setTimeout(() => {
                window.location.href = targetPage;
            }, 200);
        }
    }

    addPageTransition() {
        const page = document.querySelector('q-page');
        if (page) {
            page.style.transition = 'opacity 0.2s ease-in-out';
            page.style.opacity = '0.7';
        }
    }

    setupMobileMenu() {
        // Handle mobile menu toggle
        document.addEventListener('click', (e) => {
            const menuButton = e.target.closest('q-btn[icon="menu"]');
            if (menuButton) {
                this.toggleDrawer();
            }
        });
    }

    toggleDrawer() {
        // Try to find and toggle the drawer
        const drawer = document.querySelector('q-drawer');
        if (drawer) {
            // Use Quasar's API if available, otherwise manipulate classes
            if (drawer.$ && drawer.$q) {
                // Quasar component instance
                drawer.show();
            } else {
                // Fallback: try to find the toggle button
                const toggleBtn = document.querySelector('q-btn[icon="menu"]');
                if (toggleBtn) {
                    toggleBtn.click();
                }
            }
        }
    }

    closeDrawer() {
        const drawer = document.querySelector('q-drawer');
        if (drawer) {
            if (drawer.$ && drawer.$q) {
                drawer.hide();
            } else {
                // Fallback: try to find the close button
                const closeBtn = document.querySelector('q-btn[icon="menu"]');
                if (closeBtn) {
                    closeBtn.click();
                }
            }
        }
    }

    // Add breadcrumb navigation
    addBreadcrumbs() {
        if (this.currentPage === 'index.html') return;

        const breadcrumbContainer = document.createElement('div');
        breadcrumbContainer.className = 'q-pa-md bg-grey-1';
        breadcrumbContainer.innerHTML = `
            <div class="row items-center q-gutter-sm">
                <q-icon name="home" color="green-7" />
                <span class="text-caption">/</span>
                <span class="text-body2">${this.getPageTitle()}</span>
            </div>
        `;

        const pageContainer = document.querySelector('q-page');
        if (pageContainer) {
            pageContainer.insertBefore(breadcrumbContainer, pageContainer.firstChild);
        }
    }

    getPageTitle() {
        const titleMap = {
            'services.html': 'Services',
            'products.html': 'Products',
            'about.html': 'About',
            'contact.html': 'Contact'
        };
        return titleMap[this.currentPage] || 'Home';
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
    
    // Add breadcrumbs after a short delay
    setTimeout(() => {
        window.navigationManager.addBreadcrumbs();
    }, 500);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                window.location.href = 'index.html';
                break;
            case '2':
                window.location.href = 'services.html';
                break;
            case '3':
                window.location.href = 'products.html';
                break;
            case '4':
                window.location.href = 'about.html';
                break;
            case '5':
                window.location.href = 'contact.html';
                break;
        }
    }
});

// Add page loading indicator
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #2E7D32, #4CAF50, #2E7D32); z-index: 9999; animation: loading 2s ease-in-out infinite;"></div>
    `;
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.remove();
    }, 1000);
});

// Add CSS for navigation and loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .active-nav {
        background-color: rgba(255, 255, 255, 0.1) !important;
        border-radius: 4px;
    }
    
    .active-drawer-nav {
        background-color: #f1f8e9 !important;
        border-left: 3px solid #2E7D32;
        color: #2E7D32 !important;
    }
    
    q-btn[data-nav]:hover {
        background-color: rgba(255, 255, 255, 0.05);
        transition: background-color 0.3s ease;
    }
    
    q-item[data-drawer-nav]:hover {
        background-color: #f5f5f5;
        transition: background-color 0.3s ease;
    }
`;
document.head.appendChild(style);
