// Authentication and User Management
class AuthManager {
    constructor() {
        this.user = null;
        this.token = localStorage.getItem('auth_token');
        this.refreshToken = localStorage.getItem('refresh_token');
        this.tokenExpiry = localStorage.getItem('token_expiry');
        this.init();
    }

    init() {
        // Check if we have a valid token
        if (this.token && this.tokenExpiry) {
            const expiry = new Date(this.tokenExpiry);
            if (expiry > new Date()) {
                this.validateToken();
            } else {
                this.refreshAuthToken();
            }
        }

        // Setup token refresh interval
        setInterval(() => this.checkTokenExpiry(), 60000); // Check every minute
    }

    async validateToken() {
        try {
            const response = await apiManager.get('/auth/validate');
            this.user = response.user;
            return true;
        } catch (error) {
            this.logout();
            return false;
        }
    }

    async refreshAuthToken() {
        if (!this.refreshToken) {
            this.logout();
            return;
        }

        try {
            const response = await apiManager.post('/auth/refresh', {
                refresh_token: this.refreshToken
            });

            this.setTokens(response.token, response.refresh_token, response.expires_in);
            this.user = response.user;
            return true;
        } catch (error) {
            this.logout();
            return false;
        }
    }

    checkTokenExpiry() {
        if (this.tokenExpiry) {
            const expiry = new Date(this.tokenExpiry);
            const now = new Date();
            const timeUntilExpiry = expiry - now;

            // Refresh token if it expires in less than 5 minutes
            if (timeUntilExpiry < 300000) {
                this.refreshAuthToken();
            }
        }
    }

    setTokens(token, refreshToken, expiresIn) {
        this.token = token;
        this.refreshToken = refreshToken;
        
        const expiry = new Date();
        expiry.setSeconds(expiry.getSeconds() + expiresIn);
        this.tokenExpiry = expiry.toISOString();

        localStorage.setItem('auth_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('token_expiry', this.tokenExpiry);
    }

    async login(email, password) {
        try {
            const response = await apiManager.post('/auth/login', {
                email,
                password
            });

            this.setTokens(response.token, response.refresh_token, response.expires_in);
            this.user = response.user;

            // Trigger login event
            const event = new CustomEvent('auth:login', { detail: { user: this.user } });
            document.dispatchEvent(event);

            return this.user;
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    }

    async register(userData) {
        try {
            const response = await apiManager.post('/auth/register', userData);
            return response;
        } catch (error) {
            throw new Error('Registration failed: ' + error.message);
        }
    }

    async logout() {
        try {
            if (this.token) {
                await apiManager.post('/auth/logout');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }

    clearAuth() {
        this.user = null;
        this.token = null;
        this.refreshToken = null;
        this.tokenExpiry = null;

        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_expiry');

        // Trigger logout event
        const event = new CustomEvent('auth:logout');
        document.dispatchEvent(event);
    }

    async updateProfile(userData) {
        try {
            const response = await apiManager.put('/auth/profile', userData);
            this.user = response.user;
            return this.user;
        } catch (error) {
            throw new Error('Profile update failed: ' + error.message);
        }
    }

    async changePassword(currentPassword, newPassword) {
        try {
            await apiManager.post('/auth/change-password', {
                current_password: currentPassword,
                new_password: newPassword
            });
            return true;
        } catch (error) {
            throw new Error('Password change failed: ' + error.message);
        }
    }

    async requestPasswordReset(email) {
        try {
            await apiManager.post('/auth/forgot-password', { email });
            return true;
        } catch (error) {
            throw new Error('Password reset request failed: ' + error.message);
        }
    }

    async resetPassword(token, newPassword) {
        try {
            await apiManager.post('/auth/reset-password', {
                token,
                new_password: newPassword
            });
            return true;
        } catch (error) {
            throw new Error('Password reset failed: ' + error.message);
        }
    }

    async verifyEmail(token) {
        try {
            const response = await apiManager.post('/auth/verify-email', { token });
            this.user = response.user;
            return true;
        } catch (error) {
            throw new Error('Email verification failed: ' + error.message);
        }
    }

    async resendVerificationEmail() {
        try {
            await apiManager.post('/auth/resend-verification');
            return true;
        } catch (error) {
            throw new Error('Failed to resend verification email: ' + error.message);
        }
    }

    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    hasRole(role) {
        return this.user && this.user.roles && this.user.roles.includes(role);
    }

    hasPermission(permission) {
        return this.user && this.user.permissions && this.user.permissions.includes(permission);
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Authentication functionality
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
    }
});

function handleSignIn(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you would typically make an API call to verify credentials
    // For now, we'll just store the user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
}

function handleSignUp(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Here you would typically make an API call to create the user
    // For now, we'll just store the user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    window.location.href = 'index.html';
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('signin.html') && !window.location.pathname.includes('signup.html')) {
        window.location.href = 'signin.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html';
}

// Run auth check on page load
checkAuth(); 