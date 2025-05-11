// Modal Management
class ModalManager {
    constructor() {
        this.modals = new Map();
        this.activeModal = null;
        this.init();
    }

    init() {
        this.setupModals();
        this.setupTriggers();
    }

    setupModals() {
        document.querySelectorAll('[data-modal]').forEach(modal => {
            const modalId = modal.dataset.modal;
            this.modals.set(modalId, {
                element: modal,
                isOpen: false
            });

            // Close button
            const closeBtn = modal.querySelector('[data-modal-close]');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal(modalId));
            }

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modalId);
                }
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.activeModal === modalId) {
                    this.closeModal(modalId);
                }
            });
        });
    }

    setupTriggers() {
        document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
            const modalId = trigger.dataset.modalTrigger;
            trigger.addEventListener('click', () => this.openModal(modalId));
        });
    }

    openModal(modalId) {
        const modal = this.modals.get(modalId);
        if (!modal || modal.isOpen) return;

        // Close any active modal
        if (this.activeModal) {
            this.closeModal(this.activeModal);
        }

        modal.element.classList.remove('d-none');
        modal.element.classList.add('d-block');
        document.body.classList.add('modal-open');
        modal.isOpen = true;
        this.activeModal = modalId;

        // Trigger open event
        const event = new CustomEvent('modal:open', { detail: { modalId } });
        modal.element.dispatchEvent(event);
    }

    closeModal(modalId) {
        const modal = this.modals.get(modalId);
        if (!modal || !modal.isOpen) return;

        modal.element.classList.remove('d-block');
        modal.element.classList.add('d-none');
        document.body.classList.remove('modal-open');
        modal.isOpen = false;
        this.activeModal = null;

        // Trigger close event
        const event = new CustomEvent('modal:close', { detail: { modalId } });
        modal.element.dispatchEvent(event);
    }

    // Utility methods
    getModalContent(modalId) {
        const modal = this.modals.get(modalId);
        return modal ? modal.element.querySelector('.modal-content') : null;
    }

    setModalContent(modalId, content) {
        const contentElement = this.getModalContent(modalId);
        if (contentElement) {
            contentElement.innerHTML = content;
        }
    }

    showLoading(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.element.classList.add('modal-loading');
        }
    }

    hideLoading(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.element.classList.remove('modal-loading');
        }
    }

    // Dynamic modal creation
    createModal(options = {}) {
        const {
            id,
            title,
            content,
            size = 'md',
            closeable = true,
            backdrop = true
        } = options;

        const modal = document.createElement('div');
        modal.className = `modal d-none ${backdrop ? 'modal-backdrop' : ''}`;
        modal.dataset.modal = id;

        modal.innerHTML = `
            <div class="modal-dialog modal-${size}">
                <div class="modal-content">
                    ${closeable ? '<button type="button" class="modal-close" data-modal-close>&times;</button>' : ''}
                    ${title ? `<div class="modal-header"><h5 class="modal-title">${title}</h5></div>` : ''}
                    <div class="modal-body">${content}</div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModals();
        return id;
    }

    removeModal(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.element.remove();
            this.modals.delete(modalId);
        }
    }
}

// Initialize modal manager
const modalManager = new ModalManager(); 