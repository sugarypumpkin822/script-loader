// Notification System
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.init();
    }

    init() {
        this.createContainer();
        this.setupEventListeners();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }

    setupEventListeners() {
        // Listen for custom notification events
        document.addEventListener('notification:show', (e) => {
            this.show(e.detail);
        });
    }

    show(options = {}) {
        const {
            type = 'info',
            message,
            title,
            duration = 5000,
            position = 'top-right',
            closeable = true,
            action = null
        } = options;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type} notification-${position}`;
        
        notification.innerHTML = `
            ${closeable ? '<button class="notification-close">&times;</button>' : ''}
            ${title ? `<div class="notification-title">${title}</div>` : ''}
            <div class="notification-message">${message}</div>
            ${action ? `
                <div class="notification-actions">
                    <button class="notification-action">${action.text}</button>
                </div>
            ` : ''}
        `;

        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Setup close button
        if (closeable) {
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => this.close(notification));
        }

        // Setup action button
        if (action) {
            const actionBtn = notification.querySelector('.notification-action');
            actionBtn.addEventListener('click', () => {
                action.callback();
                this.close(notification);
            });
        }

        // Auto close after duration
        if (duration > 0) {
            setTimeout(() => this.close(notification), duration);
        }

        // Trigger show event
        const event = new CustomEvent('notification:shown', { detail: { notification } });
        document.dispatchEvent(event);

        return notification;
    }

    close(notification) {
        if (!notification) return;

        notification.classList.add('notification-closing');
        
        // Remove after animation
        notification.addEventListener('animationend', () => {
            notification.remove();
            this.notifications = this.notifications.filter(n => n !== notification);
        });

        // Trigger close event
        const event = new CustomEvent('notification:closed', { detail: { notification } });
        document.dispatchEvent(event);
    }

    // Utility methods for different notification types
    success(message, options = {}) {
        return this.show({ ...options, type: 'success', message });
    }

    error(message, options = {}) {
        return this.show({ ...options, type: 'error', message });
    }

    warning(message, options = {}) {
        return this.show({ ...options, type: 'warning', message });
    }

    info(message, options = {}) {
        return this.show({ ...options, type: 'info', message });
    }

    // Clear all notifications
    clearAll() {
        this.notifications.forEach(notification => this.close(notification));
    }

    // Update notification content
    update(notification, content) {
        if (!notification) return;

        const messageElement = notification.querySelector('.notification-message');
        if (messageElement) {
            messageElement.innerHTML = content;
        }
    }

    // Get all active notifications
    getAll() {
        return this.notifications;
    }

    // Get notifications by type
    getByType(type) {
        return this.notifications.filter(n => n.classList.contains(`notification-${type}`));
    }
}

// Initialize notification manager
const notificationManager = new NotificationManager(); 