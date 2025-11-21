// Validation utilities for BIN Generator
class ValidationUtils {
    constructor() {
        this.generatedCards = new Set();
    }

    // Luhn algorithm for card validation
    luhnCheck(cardNumber) {
        let sum = 0;
        let isEven = false;

        // Remove spaces and non-digit characters
        cardNumber = cardNumber.replace(/\D/g, '');

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    // Generate Luhn check digit
    generateLuhnCheckDigit(partialCardNumber) {
        let sum = 0;
        let isEven = false;

        for (let i = partialCardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(partialCardNumber.charAt(i));

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return (10 - (sum % 10)) % 10;
    }

    // Validate card number format
    validateCardNumber(cardNumber, cardType) {
        cardNumber = cardNumber.replace(/\s/g, '');
        
        const cardPatterns = {
            'visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
            'mastercard': /^(5[1-5][0-9]{14}|2(2[2-9][1-9][0-9]{12}|[3-6][0-9]{13}|7[0-1][0-9]{12}|720[0-9]{12}))$/,
            'amex': /^3[47][0-9]{13}$/,
            'discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            'unionpay': /^62[0-9]{14,17}$/,
            'jcb': /^(?:2131|1800|35\d{3})\d{11}$/
        };

        if (cardType && cardPatterns[cardType]) {
            return cardPatterns[cardType].test(cardNumber);
        }

        // Generic length check
        return cardNumber.length >= 13 && cardNumber.length <= 19;
    }

    // Validate expiry date
    validateExpiryDate(month, year) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const expMonth = parseInt(month);
        const expYear = parseInt(year);

        if (expMonth < 1 || expMonth > 12) return false;
        if (expYear < currentYear) return false;
        if (expYear === currentYear && expMonth < currentMonth) return false;

        return true;
    }

    // Validate CVV
    validateCVV(cvv, cardType) {
        const cvvLengths = {
            'visa': 3,
            'mastercard': 3,
            'amex': 4,
            'discover': 3,
            'unionpay': 3,
            'jcb': 3
        };

        const expectedLength = cardType ? cvvLengths[cardType] : 3;
        return /^\d+$/.test(cvv) && cvv.length === expectedLength;
    }

    // Check if card is unique (not generated before)
    isCardUnique(cardNumber) {
        const normalizedNumber = cardNumber.replace(/\s/g, '');
        if (this.generatedCards.has(normalizedNumber)) {
            return false;
        }
        this.generatedCards.add(normalizedNumber);
        return true;
    }

    // Clear generated cards history
    clearHistory() {
        this.generatedCards.clear();
    }

    // Format card number with spaces
    formatCardNumber(cardNumber) {
        cardNumber = cardNumber.replace(/\s/g, '');
        const formatted = cardNumber.replace(/(\d{4})/g, '$1 ').trim();
        return formatted;
    }

    // Generate random number with specific length
    generateRandomNumber(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    // Generate random expiry date
    generateExpiryDate(minYears = 1, maxYears = 5) {
        const currentDate = new Date();
        const year = currentDate.getFullYear() + Math.floor(Math.random() * (maxYears - minYears + 1)) + minYears;
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        return { month, year: String(year) };
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate zip code format
    validateZipCode(zipCode, countryCode) {
        const zipPatterns = {
            'US': /^\d{5}(-\d{4})?$/,
            'GB': /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
            'CA': /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
            'BD': /^\d{4}$/,
            'CN': /^\d{6}$/,
            'HK': /^[A-Z]{2}$/i,
            'SG': /^\d{6}$/,
            'AU': /^\d{4}$/,
            'DE': /^\d{5}$/,
            'FR': /^\d{5}$/,
            'JP': /^\d{3}-\d{4}$/,
            'IN': /^\d{6}$/,
            'BR': /^\d{5}-\d{3}$/,
            'MX': /^\d{5}$/
        };

        if (countryCode && zipPatterns[countryCode]) {
            return zipPatterns[countryCode].test(zipCode);
        }

        return zipCode.length > 0;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationUtils;
}
