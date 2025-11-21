// Enhanced BIN Generator with all features
class AdvancedBINGenerator {
    constructor() {
        this.api = new CountryDataAPI();
        this.validation = new ValidationUtils();
        this.storage = new StorageManager();
        
        this.generatedCards = new Set();
        this.currentBatch = [];
        
        this.init();
    }

    init() {
        this.initializeElements();
        this.attachEventListeners();
        this.loadSettings();
        this.updateStatsDisplay();
    }

    initializeElements() {
        // Form elements
        this.countrySelect = document.getElementById('country');
        this.cardTypeSelect = document.getElementById('cardType');
        this.quantityInput = document.getElementById('quantity');
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyAllBtn = document.getElementById('copyAllBtn');
        this.exportBtn = document.getElementById('exportBtn');
        
        // Display elements
        this.resultDiv = document.getElementById('result');
        this.loadingDiv = document.getElementById('loading');
        this.copySuccess = document.getElementById('copySuccess');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Stats elements
        this.totalGeneratedSpan = document.getElementById('totalGenerated');
        this.uniqueCardsSpan = document.getElementById('uniqueCards');
        this.lastCountrySpan = document.getElementById('lastCountry');

        // Initialize country dropdown
        this.populateCountryDropdown();
    }

    populateCountryDropdown() {
        const countries = this.api.getAllCountries();
        this.countrySelect.innerHTML = '<option value="random">🌎 Random Country</option>';
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.flag} ${country.name} (${country.currency})`;
            this.countrySelect.appendChild(option);
        });
    }

    attachEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateCards());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.copyAllBtn.addEventListener('click', () => this.copyAllToClipboard());
        this.exportBtn.addEventListener('click', () => this.exportToCSV());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.generateCards();
            }
            if (e.ctrlKey && e.key === 'c') {
                this.copyAllToClipboard();
            }
        });
    }

    loadSettings() {
        const settings = this.storage.getSettings();
        
        // Apply settings to UI
        if (settings.defaultCountry && settings.defaultCountry !== 'random') {
            this.countrySelect.value = settings.defaultCountry;
        }
        if (settings.defaultCardType && settings.defaultCardType !== 'random') {
            this.cardTypeSelect.value = settings.defaultCardType;
        }
        if (settings.defaultQuantity) {
            this.quantityInput.value = settings.defaultQuantity;
        }
    }

    async generateCards() {
        const country = this.countrySelect.value;
        const cardType = this.cardTypeSelect.value;
        const quantity = parseInt(this.quantityInput.value);

        // Validation
        if (quantity < 1 || quantity > 50) {
            this.showError("Please enter a quantity between 1 and 50");
            return;
        }

        this.showLoading();
        this.currentBatch = [];

        try {
            const cards = [];
            let attempts = 0;
            const maxAttempts = quantity * 20; // Prevent infinite loop

            while (cards.length < quantity && attempts < maxAttempts) {
                const card = this.generateSingleCard(country, cardType);
                if (card && this.validation.isCardUnique(card.number)) {
                    cards.push(card);
                    this.storage.addToHistory(card);
                }
                attempts++;
            }

            if (cards.length === 0) {
                this.showError("Could not generate unique cards. Try generating fewer cards.");
                this.hideLoading();
                return;
            }

            this.currentBatch = cards;
            this.displayCards(cards);
            this.updateStats(cards);
            this.hideLoading();

            if (cards.length < quantity) {
                this.showError(`Generated ${cards.length} unique cards instead of ${quantity} due to uniqueness constraints.`);
            }

            // Auto-copy if enabled
            const settings = this.storage.getSettings();
            if (settings.autoCopy && cards.length > 0) {
                setTimeout(() => this.copyAllToClipboard(), 500);
            }

        } catch (error) {
            this.showError("An error occurred while generating cards: " + error.message);
            this.hideLoading();
        }
    }

    generateSingleCard(country, cardType) {
        const selectedCountry = country === 'random' ? this.api.getRandomCountry().code : country;
        const selectedCardType = cardType === 'random' ? this.api.getRandomCardType().type : cardType;
        
        const countryInfo = this.api.getCountryByCode(selectedCountry);
        const cardTypeInfo = this.api.getCardType(selectedCardType);
        
        if (!countryInfo || !cardTypeInfo) {
            return null;
        }

        // Generate BIN
        const bin = this.api.generateBIN(selectedCountry, selectedCardType);
        if (!bin) return null;

        // Generate card number
        const cardNumber = this.generateCardNumber(bin, cardTypeInfo.lengths[0]);
        
        // Generate other details
        const expiry = this.validation.generateExpiryDate(1, 5);
        const cvv = this.validation.generateRandomNumber(cardTypeInfo.cvvLength);
        const cardholder = this.generateCardholderName();
        const address = this.generateAddress(selectedCountry, countryInfo);
        const phone = this.api.generatePhoneNumber(selectedCountry);

        return {
            number: cardNumber,
            formattedNumber: this.validation.formatCardNumber(cardNumber),
            expiry: `${expiry.month}/${expiry.year.slice(2)}`,
            fullExpiry: `${expiry.month}/${expiry.year}`,
            cvv: cvv,
            cardholder: cardholder,
            country: selectedCountry,
            countryName: countryInfo.name,
            flag: countryInfo.flag,
            currency: countryInfo.currency,
            cardType: selectedCardType,
            cardTypeName: cardTypeInfo.name,
            phone: phone,
            ...address,
            timestamp: new Date().toISOString(),
            id: this.storage.generateId()
        };
    }

    generateCardNumber(bin, length) {
        // Generate the main part of the card number
        let cardNumber = bin;
        const remainingLength = length - bin.length - 1; // -1 for check digit
        
        for (let i = 0; i < remainingLength; i++) {
            cardNumber += Math.floor(Math.random() * 10);
        }

        // Calculate and add Luhn check digit
        const checkDigit = this.validation.generateLuhnCheckDigit(cardNumber);
        return cardNumber + checkDigit;
    }

    generateCardholderName() {
        const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
        const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
        
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${firstName} ${lastName}`;
    }

    generateAddress(countryCode, countryInfo) {
        const city = countryInfo.cities[Math.floor(Math.random() * countryInfo.cities.length)];
        const state = countryInfo.states[Math.floor(Math.random() * countryInfo.states.length)];
        const zipCode = this.generateZipCode(countryInfo.zipFormat);

        // Generate street address
        const streetNumbers = ['123', '456', '789', '100', '200', '300', '400', '500'];
        const streetNames = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine St', 'Elm St', 'Washington Ave', 'Park Blvd'];
        const street = `${streetNumbers[Math.floor(Math.random() * streetNumbers.length)]} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`;

        return {
            street: street,
            city: city,
            state: state,
            zipCode: zipCode
        };
    }

    generateZipCode(format) {
        let zipCode = '';
        for (let char of format) {
            if (char === '#') {
                zipCode += Math.floor(Math.random() * 10);
            } else if (char === '?') {
                zipCode += String.fromCharCode(65 + Math.floor(Math.random() * 26));
            } else {
                zipCode += char;
            }
        }
        return zipCode;
    }

    displayCards(cards) {
        this.resultDiv.innerHTML = '';
        
        cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            this.resultDiv.appendChild(cardElement);
        });

        this.generatedCards = new Set([...this.generatedCards, ...cards.map(c => c.number)]);
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-item';
        cardDiv.setAttribute('data-card-id', card.id);
        
        const settings = this.storage.getSettings();
        const showDetails = settings.showDetails !== false;

        cardDiv.innerHTML = `
            <div class="card-header">
                <div class="card-number">${card.formattedNumber}</div>
                <div class="card-type-badge">${card.cardTypeName}</div>
            </div>
            <div class="card-details">
                <div class="detail-row">
                    <div class="detail-item">
                        <strong>Expiry:</strong> ${card.expiry}
                    </div>
                    <div class="detail-item">
                        <strong>CVV:</strong> ${card.cvv}
                    </div>
                    <div class="detail-item">
                        <span class="country-flag">${card.flag}</span>
                        <strong>Country:</strong> ${card.countryName}
                    </div>
                </div>
                ${showDetails ? `
                <div class="detail-row">
                    <div class="detail-item">
                        <strong>Cardholder:</strong> ${card.cardholder}
                    </div>
                    <div class="detail-item">
                        <strong>Currency:</strong> ${card.currency}
                    </div>
                </div>
                <div class="detail-row">
                    <div class="detail-item">
                        <strong>Address:</strong> ${card.street}, ${card.city}, ${card.state} ${card.zipCode}
                    </div>
                </div>
                <div class="detail-row">
                    <div class="detail-item">
                        <strong>Phone:</strong> ${card.phone}
                    </div>
                </div>
                ` : ''}
            </div>
            <div class="card-actions">
                <button class="btn copy-card-btn" data-card-id="${card.id}">📋 Copy</button>
                <button class="btn validate-card-btn" data-card-id="${card.id}">✓ Validate</button>
            </div>
        `;

        // Add event listeners to action buttons
        cardDiv.querySelector('.copy-card-btn').addEventListener('click', () => this.copySingleCard(card));
        cardDiv.querySelector('.validate-card-btn').addEventListener('click', () => this.validateCard(card));

        return cardDiv;
    }

    updateStats(cards) {
        const stats = this.storage.getStats();
        this.totalGeneratedSpan.textContent = stats.totalGenerated;
        this.uniqueCardsSpan.textContent = stats.uniqueCards;
        
        if (cards.length > 0) {
            this.lastCountrySpan.textContent = cards[0].countryName;
        }

        // Update storage stats
        this.storage.updateStats(cards.length, cards.length);
    }

    updateStatsDisplay() {
        const stats = this.storage.getStats();
        this.totalGeneratedSpan.textContent = stats.totalGenerated;
        this.uniqueCardsSpan.textContent = stats.uniqueCards;
        this.lastCountrySpan.textContent = stats.lastGenerated ? 'Previously used' : '-';
    }

    async copyAllToClipboard() {
        if (this.currentBatch.length === 0) {
            this.showError("No cards to copy");
            return;
        }

        let textToCopy = "Generated BIN Cards\n\n";
        this.currentBatch.forEach((card, index) => {
            textToCopy += `Card ${index + 1}:\n`;
            textToCopy += `Number: ${card.formattedNumber}\n`;
            textToCopy += `Expiry: ${card.expiry}\n`;
            textToCopy += `CVV: ${card.cvv}\n`;
            textToCopy += `Cardholder: ${card.cardholder}\n`;
            textToCopy += `Country: ${card.countryName}\n`;
            textToCopy += `Type: ${card.cardTypeName}\n`;
            textToCopy += `Address: ${card.street}, ${card.city}, ${card.state} ${card.zipCode}\n`;
            textToCopy += `Phone: ${card.phone}\n\n`;
        });

        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showSuccess("All cards copied to clipboard!");
        } catch (err) {
            this.showError("Failed to copy to clipboard");
        }
    }

    async copySingleCard(card) {
        const textToCopy = `Card Number: ${card.formattedNumber}\nExpiry: ${card.expiry}\nCVV: ${card.cvv}\nCardholder: ${card.cardholder}`;
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showSuccess("Card details copied!");
        } catch (err) {
            this.showError("Failed to copy card details");
        }
    }

    validateCard(card) {
        const isValid = this.validation.luhnCheck(card.number);
        const message = isValid ? 
            "✅ Card number passed Luhn validation" : 
            "❌ Card number failed Luhn validation";
        
        this.showSuccess(message);
    }

    exportToCSV() {
        if (this.currentBatch.length === 0) {
            this.showError("No cards to export");
            return;
        }

        let csvContent = "Card Number,Expiry,CVV,Cardholder,Country,Currency,Type,Street,City,State,Zip Code,Phone\n";
        
        this.currentBatch.forEach(card => {
            csvContent += `"${card.number}","${card.expiry}","${card.cvv}","${card.cardholder}","${card.countryName}","${card.currency}","${card.cardTypeName}","${card.street}","${card.city}","${card.state}","${card.zipCode}","${card.phone}"\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bin_cards_${new Date().getTime()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        this.showSuccess("Cards exported successfully!");
    }

    clearAll() {
        this.currentBatch = [];
        this.generatedCards.clear();
        this.validation.clearHistory();
        this.resultDiv.innerHTML = '<div class="empty-state"><p>No cards generated yet. Click the generate button to start.</p></div>';
        this.updateStatsDisplay();
        this.hideMessages();
    }

    showLoading() {
        this.loadingDiv.style.display = 'block';
        this.generateBtn.disabled = true;
        this.generateBtn.textContent = 'Generating...';
    }

    hideLoading() {
        this.loadingDiv.style.display = 'none';
        this.generateBtn.disabled = false;
        this.generateBtn.textContent = '🔄 Generate Unique Cards';
    }

    showSuccess(message) {
        this.copySuccess.textContent = message;
        this.copySuccess.style.display = 'block';
        setTimeout(() => {
            this.copySuccess.style.display = 'none';
        }, 3000);
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 5000);
    }

    hideMessages() {
        this.copySuccess.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedBINGenerator();
});
