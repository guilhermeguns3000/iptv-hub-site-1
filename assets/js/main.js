/**
 * IPTV HUB 2026 - Authority Navigation Engine
 * Handles Tab Switching for FAQ and Testimonials with structural parity logic.
 */

class TabManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.navButtons = this.container.querySelectorAll('.tab-btn');
        this.contents = this.container.querySelectorAll('.tab-content');

        this.init();
    }

    init() {
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');
                this.switchTab(target);
            });
        });
    }

    switchTab(tabId) {
        // Update Buttons
        this.navButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Contents
        this.contents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
}

// Mobile Menu Logic
const initMobileMenu = () => {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav-links');
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
};

// Initialize everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    new TabManager('testimonial-tabs');
    new TabManager('faq-tabs');
    initMobileMenu();
});
