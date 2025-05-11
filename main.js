// Display current user information
function displayUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        userInfo.textContent = `Welcome, ${currentUser.username}`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
    // ... existing initialization code ...
}); 