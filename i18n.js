// Internationalization and Localization Manager
class I18nManager {
    constructor() {
        this.translations = new Map();
        this.currentLocale = 'en';
        this.fallbackLocale = 'en';
        this.loadedLocales = new Set();
        this.dateFormats = new Map();
        this.numberFormats = new Map();
        this.init();
    }

    init() {
        // Load user's preferred locale from storage
        const savedLocale = storageManager.get('preferred_locale');
        if (savedLocale) {
            this.setLocale(savedLocale);
        } else {
            // Use browser's preferred locale
            const browserLocale = navigator.language.split('-')[0];
            this.setLocale(browserLocale);
        }

        // Setup default date and number formats
        this.setupDefaultFormats();
    }

    setupDefaultFormats() {
        // Date formats
        this.dateFormats.set('short', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        this.dateFormats.set('medium', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        this.dateFormats.set('long', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        });

        // Number formats
        this.numberFormats.set('decimal', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        this.numberFormats.set('currency', {
            style: 'currency',
            currency: 'USD'
        });

        this.numberFormats.set('percent', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    async loadLocale(locale) {
        if (this.loadedLocales.has(locale)) {
            return;
        }

        try {
            const response = await fetch(`/locales/${locale}.json`);
            const translations = await response.json();
            this.translations.set(locale, translations);
            this.loadedLocales.add(locale);
        } catch (error) {
            console.error(`Failed to load locale ${locale}:`, error);
            if (locale !== this.fallbackLocale) {
                await this.loadLocale(this.fallbackLocale);
            }
        }
    }

    async setLocale(locale) {
        if (locale === this.currentLocale) {
            return;
        }

        await this.loadLocale(locale);
        this.currentLocale = locale;
        document.documentElement.lang = locale;
        storageManager.set('preferred_locale', locale);

        // Trigger locale change event
        const event = new CustomEvent('locale:change', {
            detail: { locale }
        });
        document.dispatchEvent(event);

        // Update all translated elements
        this.updateTranslations();
    }

    getLocale() {
        return this.currentLocale;
    }

    t(key, params = {}) {
        const translation = this.getTranslation(key);
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }

        return this.interpolate(translation, params);
    }

    getTranslation(key) {
        const localeTranslations = this.translations.get(this.currentLocale);
        if (!localeTranslations) {
            return null;
        }

        const keys = key.split('.');
        let translation = localeTranslations;

        for (const k of keys) {
            translation = translation[k];
            if (!translation) {
                return null;
            }
        }

        return translation;
    }

    interpolate(text, params) {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    formatDate(date, format = 'medium') {
        const dateFormat = this.dateFormats.get(format);
        if (!dateFormat) {
            throw new Error(`Date format ${format} not found`);
        }

        return new Intl.DateTimeFormat(this.currentLocale, dateFormat)
            .format(new Date(date));
    }

    formatNumber(number, format = 'decimal') {
        const numberFormat = this.numberFormats.get(format);
        if (!numberFormat) {
            throw new Error(`Number format ${format} not found`);
        }

        return new Intl.NumberFormat(this.currentLocale, numberFormat)
            .format(number);
    }

    formatCurrency(amount, currency = 'USD') {
        return this.formatNumber(amount, {
            style: 'currency',
            currency
        });
    }

    formatPercent(value) {
        return this.formatNumber(value, 'percent');
    }

    formatPlural(number, forms) {
        const pluralRules = new Intl.PluralRules(this.currentLocale);
        const form = pluralRules.select(number);
        return forms[form] || forms.other;
    }

    updateTranslations() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const params = this.getTranslationParams(element);
            element.textContent = this.t(key, params);
        });

        // Update elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const params = this.getTranslationParams(element);
            element.placeholder = this.t(key, params);
        });

        // Update elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const params = this.getTranslationParams(element);
            element.title = this.t(key, params);
        });
    }

    getTranslationParams(element) {
        const params = {};
        for (const attr of element.attributes) {
            if (attr.name.startsWith('data-i18n-param-')) {
                const paramName = attr.name.replace('data-i18n-param-', '');
                params[paramName] = attr.value;
            }
        }
        return params;
    }

    // Utility method to get available locales
    getAvailableLocales() {
        return Array.from(this.loadedLocales);
    }

    // Utility method to check if a locale is loaded
    isLocaleLoaded(locale) {
        return this.loadedLocales.has(locale);
    }

    // Utility method to get the direction of the current locale
    getDirection() {
        const rtlLocales = ['ar', 'he', 'fa', 'ur'];
        return rtlLocales.includes(this.currentLocale) ? 'rtl' : 'ltr';
    }

    // Utility method to get the language name
    getLanguageName(locale = this.currentLocale) {
        return new Intl.DisplayNames([locale], { type: 'language' })
            .of(locale);
    }

    // Utility method to get the region name
    getRegionName(region, locale = this.currentLocale) {
        return new Intl.DisplayNames([locale], { type: 'region' })
            .of(region);
    }

    // Utility method to get the currency name
    getCurrencyName(currency, locale = this.currentLocale) {
        return new Intl.DisplayNames([locale], { type: 'currency' })
            .of(currency);
    }
}

// Initialize i18n manager
const i18n = new I18nManager(); 