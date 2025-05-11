// Form Handling and Validation
class FormManager {
    constructor() {
        this.forms = new Map();
        this.validators = new Map();
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmissions();
    }

    setupFormValidation() {
        document.querySelectorAll('form').forEach(form => {
            this.forms.set(form, {
                isValid: false,
                errors: new Map()
            });

            form.addEventListener('input', (e) => {
                this.validateField(e.target);
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    this.handleSubmit(form);
                }
            });
        });
    }

    setupFormSubmissions() {
        // Add custom form submission handlers
        this.addFormHandler('login', this.handleLogin);
        this.addFormHandler('register', this.handleRegister);
        this.addFormHandler('contact', this.handleContact);
    }

    validateField(field) {
        const form = field.form;
        const validators = this.getValidators(field);
        let isValid = true;
        let errors = [];

        validators.forEach(validator => {
            const result = validator(field.value);
            if (!result.isValid) {
                isValid = false;
                errors.push(result.message);
            }
        });

        this.updateFieldValidation(field, isValid, errors);
        return isValid;
    }

    validateForm(form) {
        let isValid = true;
        const formData = this.forms.get(form);

        form.querySelectorAll('input, select, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        formData.isValid = isValid;
        return isValid;
    }

    updateFieldValidation(field, isValid, errors) {
        const form = field.form;
        const formData = this.forms.get(form);

        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }

        // Update error message
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.textContent = errors.join(', ');
        }

        formData.errors.set(field.name, errors);
    }

    getValidators(field) {
        const validators = [];
        const rules = field.dataset.validate ? field.dataset.validate.split(' ') : [];

        rules.forEach(rule => {
            if (this.validators.has(rule)) {
                validators.push(this.validators.get(rule));
            }
        });

        return validators;
    }

    addFormHandler(formId, handler) {
        const form = document.querySelector(`form[data-form="${formId}"]`);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    handler(form);
                }
            });
        }
    }

    // Form submission handlers
    async handleLogin(form) {
        const formData = new FormData(form);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                window.location.href = '/dashboard';
            } else {
                this.showFormError(form, data.message);
            }
        } catch (error) {
            this.showFormError(form, 'An error occurred. Please try again.');
        }
    }

    async handleRegister(form) {
        const formData = new FormData(form);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                window.location.href = '/login';
            } else {
                this.showFormError(form, data.message);
            }
        } catch (error) {
            this.showFormError(form, 'An error occurred. Please try again.');
        }
    }

    async handleContact(form) {
        const formData = new FormData(form);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                this.showFormSuccess(form, 'Message sent successfully!');
                form.reset();
            } else {
                this.showFormError(form, data.message);
            }
        } catch (error) {
            this.showFormError(form, 'An error occurred. Please try again.');
        }
    }

    showFormError(form, message) {
        const errorElement = form.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');
        }
    }

    showFormSuccess(form, message) {
        const successElement = form.querySelector('.form-success');
        if (successElement) {
            successElement.textContent = message;
            successElement.classList.remove('d-none');
        }
    }
}

// Initialize form manager
const formManager = new FormManager(); 