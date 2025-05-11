// Form Validation Manager
class ValidationManager {
    constructor() {
        this.validators = new Map();
        this.setupDefaultValidators();
    }

    setupDefaultValidators() {
        // Required field validation
        this.addValidator('required', (value) => {
            if (value === null || value === undefined || value === '') {
                return 'This field is required';
            }
            return null;
        });

        // Email validation
        this.addValidator('email', (value) => {
            if (!value) return null;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Please enter a valid email address';
            }
            return null;
        });

        // Password validation
        this.addValidator('password', (value) => {
            if (!value) return null;
            if (value.length < 8) {
                return 'Password must be at least 8 characters long';
            }
            if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
            }
            if (!/[a-z]/.test(value)) {
                return 'Password must contain at least one lowercase letter';
            }
            if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
            }
            if (!/[!@#$%^&*]/.test(value)) {
                return 'Password must contain at least one special character (!@#$%^&*)';
            }
            return null;
        });

        // Min length validation
        this.addValidator('minLength', (value, min) => {
            if (!value) return null;
            if (value.length < min) {
                return `Must be at least ${min} characters long`;
            }
            return null;
        });

        // Max length validation
        this.addValidator('maxLength', (value, max) => {
            if (!value) return null;
            if (value.length > max) {
                return `Must be no more than ${max} characters long`;
            }
            return null;
        });

        // Number validation
        this.addValidator('number', (value) => {
            if (!value) return null;
            if (isNaN(value)) {
                return 'Must be a valid number';
            }
            return null;
        });

        // Min value validation
        this.addValidator('min', (value, min) => {
            if (!value) return null;
            if (Number(value) < min) {
                return `Must be at least ${min}`;
            }
            return null;
        });

        // Max value validation
        this.addValidator('max', (value, max) => {
            if (!value) return null;
            if (Number(value) > max) {
                return `Must be no more than ${max}`;
            }
            return null;
        });

        // URL validation
        this.addValidator('url', (value) => {
            if (!value) return null;
            try {
                new URL(value);
                return null;
            } catch {
                return 'Please enter a valid URL';
            }
        });

        // Phone number validation
        this.addValidator('phone', (value) => {
            if (!value) return null;
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(value)) {
                return 'Please enter a valid phone number';
            }
            return null;
        });

        // Date validation
        this.addValidator('date', (value) => {
            if (!value) return null;
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                return 'Please enter a valid date';
            }
            return null;
        });

        // Custom regex validation
        this.addValidator('pattern', (value, pattern) => {
            if (!value) return null;
            if (!new RegExp(pattern).test(value)) {
                return 'Invalid format';
            }
            return null;
        });

        // Match field validation
        this.addValidator('match', (value, fieldName, form) => {
            if (!value) return null;
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) return null;
            if (value !== field.value) {
                return `Must match ${fieldName}`;
            }
            return null;
        });
    }

    addValidator(name, validator) {
        this.validators.set(name, validator);
    }

    validateField(value, rules) {
        const errors = [];

        for (const [rule, params] of Object.entries(rules)) {
            const validator = this.validators.get(rule);
            if (validator) {
                const error = validator(value, params);
                if (error) {
                    errors.push(error);
                }
            }
        }

        return errors;
    }

    validateForm(form) {
        const errors = new Map();
        const formData = new FormData(form);

        // Get all form fields
        const fields = form.querySelectorAll('[name]');
        
        fields.forEach(field => {
            const fieldName = field.getAttribute('name');
            const value = formData.get(fieldName);
            const rules = this.getFieldRules(field);

            if (rules) {
                const fieldErrors = this.validateField(value, rules);
                if (fieldErrors.length > 0) {
                    errors.set(fieldName, fieldErrors);
                }
            }
        });

        return errors;
    }

    getFieldRules(field) {
        const rules = {};
        const dataRules = field.getAttribute('data-validate');
        
        if (dataRules) {
            dataRules.split(' ').forEach(rule => {
                const [name, params] = rule.split(':');
                rules[name] = params ? params.split(',') : true;
            });
        }

        return Object.keys(rules).length > 0 ? rules : null;
    }

    setupFormValidation(form) {
        const fields = form.querySelectorAll('[name]');
        
        fields.forEach(field => {
            // Validate on blur
            field.addEventListener('blur', () => {
                const rules = this.getFieldRules(field);
                if (rules) {
                    const errors = this.validateField(field.value, rules);
                    this.showFieldErrors(field, errors);
                }
            });

            // Clear errors on input
            field.addEventListener('input', () => {
                this.clearFieldErrors(field);
            });
        });

        // Validate on submit
        form.addEventListener('submit', (event) => {
            const errors = this.validateForm(form);
            
            if (errors.size > 0) {
                event.preventDefault();
                this.showFormErrors(form, errors);
            }
        });
    }

    showFieldErrors(field, errors) {
        this.clearFieldErrors(field);

        if (errors.length > 0) {
            field.classList.add('is-invalid');
            
            const errorContainer = document.createElement('div');
            errorContainer.className = 'invalid-feedback';
            errorContainer.textContent = errors[0];
            
            field.parentNode.appendChild(errorContainer);
        } else {
            field.classList.add('is-valid');
        }
    }

    clearFieldErrors(field) {
        field.classList.remove('is-invalid', 'is-valid');
        
        const errorContainer = field.parentNode.querySelector('.invalid-feedback');
        if (errorContainer) {
            errorContainer.remove();
        }
    }

    showFormErrors(form, errors) {
        // Clear all existing errors
        form.querySelectorAll('.is-invalid').forEach(field => {
            this.clearFieldErrors(field);
        });

        // Show new errors
        errors.forEach((fieldErrors, fieldName) => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.showFieldErrors(field, fieldErrors);
            }
        });

        // Focus first invalid field
        const firstInvalidField = form.querySelector('.is-invalid');
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }

    // Utility method to check if a form is valid
    isFormValid(form) {
        const errors = this.validateForm(form);
        return errors.size === 0;
    }

    // Utility method to get all form data as an object
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
}

// Initialize validation manager
const validationManager = new ValidationManager(); 