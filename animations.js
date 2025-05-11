// Animation Utilities
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupAnimationElements();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
    }

    setupAnimationElements() {
        document.querySelectorAll('[data-animate]').forEach(element => {
            this.observer.observe(element);
        });
    }

    playAnimation(element) {
        const animationType = element.dataset.animate;
        element.classList.add(`animate-${animationType}`);
    }

    addAnimation(element, animation) {
        this.animations.set(element, animation);
    }

    removeAnimation(element) {
        this.animations.delete(element);
    }

    // Utility methods for common animations
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    fadeOut(element, duration = 300) {
        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        requestAnimationFrame(() => {
            element.style.opacity = '0';
        });
    }

    slideIn(element, direction = 'up', duration = 300) {
        const directions = {
            up: 'translateY(20px)',
            down: 'translateY(-20px)',
            left: 'translateX(20px)',
            right: 'translateX(-20px)'
        };

        element.style.transform = directions[direction];
        element.style.transition = `transform ${duration}ms ease-in-out`;
        requestAnimationFrame(() => {
            element.style.transform = 'translate(0)';
        });
    }

    slideOut(element, direction = 'up', duration = 300) {
        const directions = {
            up: 'translateY(-20px)',
            down: 'translateY(20px)',
            left: 'translateX(-20px)',
            right: 'translateX(20px)'
        };

        element.style.transform = 'translate(0)';
        element.style.transition = `transform ${duration}ms ease-in-out`;
        requestAnimationFrame(() => {
            element.style.transform = directions[direction];
        });
    }
}

// Initialize animation manager
const animationManager = new AnimationManager(); 