// Notification system
const notifications = {
    // Create notification element
    createNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Add close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    },

    // Show success notification
    success: (message) => {
        notifications.createNotification(message, 'success');
    },

    // Show error notification
    error: (message) => {
        notifications.createNotification(message, 'error');
    },

    // Show info notification
    info: (message) => {
        notifications.createNotification(message, 'info');
    },

    // Show warning notification
    warning: (message) => {
        notifications.createNotification(message, 'warning');
    }
}; 