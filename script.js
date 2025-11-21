class BINGenerator {
    constructor() {
        this.generatedCards = new Set();
        this.totalGenerated = 0;
        this.uniqueCards = 0;
        
        this.countryBINs = {
            'US': ['4', '51', '52', '53', '54', '55', '34', '37'],
            'GB': ['4', '51', '52', '53', '54', '55', '67'],
            'CA': ['4', '51', '52', '53', '54', '55'],
            'BD': ['4', '51', '52', '67'],
            'CN': ['4', '62', '81'],
            'HK': ['4', '51', '52', '53', '54', '55'],
            'SG': ['4', '51', '52', '53', '54', '55'],
            'AU': ['4', '51', '52', '53', '54', '55'],
            'DE': ['4', '51', '52', '53', '54', '55', '67'],
            'FR': ['4', '51', '52', '53', '54', '55'],
            'JP': ['4', '36', '38', '39'],
            'IN': ['4', '60', '65'],
            'BR': ['4', '51', '52', '53', '54', '55', '60'],
            'MX': ['4', '51', '52', '53', '54', '55']
        };

        this.countryData = {
            'US': { name: "United States", flag: "🇺🇸", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"], states: ["NY", "CA", "IL", "TX", "AZ"], zipFormat: "#####" },
            'GB': { name: "United Kingdom", flag: "🇬🇧", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Glasgow"], states: ["ENG", "SCT", "WLS", "NIR"], zipFormat: "??# #??" },
            'CA': { name: "Canada", flag: "🇨🇦", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"], states: ["ON", "BC", "QC", "AB"], zipFormat: "?#? #?#" },
            'BD': { name: "Bangladesh", flag: "🇧🇩", cities: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet"], states: ["DHA", "CHI", "KHU", "RAJ"], zipFormat: "####" },
            'CN': { name: "China", flag: "🇨🇳", cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"], states: ["BJ", "SH", "GD", "SZ"], zipFormat: "######" },
            'HK': { name: "Hong Kong", flag: "🇭🇰", cities: ["Hong Kong", "Kowloon", "New Territories"], states: ["HK", "KL", "NT"], zipFormat: "??" },
            'SG': { name: "Singapore", flag: "🇸🇬", cities: ["Singapore"], states: ["SG"], zipFormat: "######" },
            'AU': { name: "Australia", flag: "🇦🇺", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"], states: ["NSW", "VIC", "QLD", "WA"], zipFormat: "####" },
            'DE': { name: "Germany", flag: "🇩🇪", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"], states: ["BE", "BY", "HH", "HE"], zipFormat: "#####" },
            'FR': { name: "France", flag: "🇫🇷", cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"], states: ["IDF", "PACA", "ARA", "OCC"], zipFormat: "#####" },
            'JP': { name: "Japan", flag: "🇯🇵", cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"], states: ["TY", "OS", "KY", "YK"], zipFormat: "###-####" },
            'IN': { name: "India", flag: "🇮🇳", cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"], states: ["MH", "DL", "KA", "TS"], zipFormat: "######" },
            'BR': { name: "Brazil", flag: "🇧🇷", cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"], states: ["SP", "RJ", "DF", "BA"], zipFormat: "#####-###" },
            'MX': { name: "Mexico", flag: "🇲🇽", cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"], states: ["CDMX", "JAL", "NL", "PUE"], zipFormat: "#####" }
        };

        this.firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Daniel", "Nancy", "Matthew", "Lisa", "Anthony", "Betty", "Donald", "Helen", "Mark", "Sandra"];
        this.lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];

        this.cardTypePrefixes = {
            'visa': ['4'],
            'mastercard': ['51', '52', '53', '54', '55', '22', '23', '24', '25', '26', '27'],
            'amex': ['34', '37'],
            'discover': ['6011', '65', '64', '622']
        };

        this.init();
    }

    init() {
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyAllBtn = document.getElementById('copyAllBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.resultDiv = document.getElementById('result');
        this.loadingDiv = document.getElementById('loading');
        this.copySuccess = document.getElementById('copySuccess');
        this.errorMessage = document.getElementById('errorMessage');
        this.totalGeneratedSpan = document.getElementById('totalGenerated');
        this.uniqueCardsSpan = document.getElementById('uniqueCards');
        this.lastCountrySpan = document.getElementById('lastCountry');

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateCards());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.copyAllBtn.addEventListener('click', () => this.copyAllToClipboard());
        this.exportBtn.addEventListener('click', () => this.exportToCSV());
    }

    generateCards() {
        const country = document.getElementById('country').value;
        const cardType = document.getElementById('cardType').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (quantity < 1 || quantity > 50) {
            this.showError("Please enter a quantity between 1 and 50");
            return;
        }

        this.showLoading();
        this.resultDiv.innerHTML = '';

        setTimeout(() => {
            try {
                const cards = [];
                let attempts = 0;
                const maxAttempts = quantity * 10;

                while (cards.length < quantity && attempts < maxAttempts) {
                    const card = this.generateSingleCard(country, cardType);
                    if (card && !this.generatedCards.has(card.number)) {
                        this.generatedCards.add(card.number);
                        cards.push(card);
                        this.uniqueCards++;
                    }
                    attempts++;
                }

                if (cards.length === 0) {
                    this.showError("Could not generate unique cards. Try generating fewer cards.");
                    this.hideLoading();
                    return;
                }

                this.displayCards(cards);
                this.updateStats(cards[0].country);
                this.hideLoading();

                if (cards.length < quantity) {
                    this.showError(`Generated ${cards.length} unique cards instead of ${quantity} due to uniqueness constraints.`);
                }

            } catch (error) {
                this.showError("An error occurred while generating cards: " + error.message);
                this.hideLoading();
            }
        }, 500);
    }

    generateSingleCard(country, cardType) {
        const selectedCountry = country === 'random' ? this.getRandomCountry() : country;
        const selectedCardType = cardType === 'random' ? this.getRandomCardType() : cardType;
        
        const countryInfo = this.countryData[selectedCountry];
        const binPrefixes = this.countryBINs[selectedCountry];
        const cardPrefixes = this.cardTypePrefixes[selectedCardType];
        
        // Find common prefixes between country and card type
        const commonPrefixes = binPrefixes.filter(prefix => 
            cardPrefixes.some(cardPrefix => prefix.startsWith(cardPrefix) || cardPrefix.startsWith(prefix))
        );

        if (commonPrefixes.length === 0) {
            // If no common prefixes, use card type prefixes
            const prefix = cardPrefixes[Math.floor(Math.random() * cardPrefixes.length)];
            const bin = this.generateBINFromPrefix(prefix);
            const cardNumber = this.generateValidCardNumber(bin);
            return this.createCardObject(cardNumber, selectedCountry, countryInfo, selectedCardType);
        } else {
            const prefix = commonPrefixes[Math.floor(Math.random() * commonPrefixes.length)];
            const bin = this.generateBINFromPrefix(prefix);
            const cardNumber = this.generateValidCardNumber(bin);
            return this.createCardObject(cardNumber, selectedCountry, countryInfo, selectedCardType);
        }
    }

    generateBINFromPrefix(prefix) {
        const remainingLength = 6 - prefix.length;
        if (remainingLength > 0) {
            return prefix + this.generateRandomNumber(remainingLength);
        }
        return prefix;
    }

    generateValidCardNumber(bin) {
        // Generate card number with Luhn algorithm
        let cardNumber = bin;
        const remainingLength = 15 - bin.length;
        
        for (let i = 0; i < remainingLength; i++) {
            cardNumber += Math.floor(Math.random() * 10);
        }

        // Calculate Luhn check digit
        const checkDigit = this.calculateLuhnCheckDigit(cardNumber);
        return cardNumber + checkDigit;
    }

    calculateLuhnCheckDigit(number) {
        let sum = 0;
        let isEven = false;

        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i));

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

    createCardObject(cardNumber, countryCode, countryInfo, cardType) {
        const expiryMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const expiryYear = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1);
        const cvv = this.generateRandomNumber(3);
        const cardholder = this.generateCardholderName();
        const address = this.generateAddress(countryCode, countryInfo);

        return {
            number: cardNumber,
            expiry: `${expiryMonth}/${expiryYear.slice(2)}`,
            cvv: cvv,
            cardholder: cardholder,
            country: countryCode,
            countryName: countryInfo.name,
            flag: countryInfo.flag,
            cardType: cardType.toUpperCase(),
            ...address
        };
    }

    generateCardholderName() {
        const firstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
        const lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
        return `${firstName} ${lastName}`;
    }

    generateAddress(countryCode, countryInfo) {
        const city = countryInfo.cities[Math.floor(Math.random() * countryInfo.cities.length)];
        const state = countryInfo.states[Math.floor(Math.random() * countryInfo.states.length)];
        const zipCode = this.generateZipCode(countryInfo.zipFormat);

        return {
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

    getRandomCountry() {
        const countries = Object.keys(this.countryData);
        return countries[Math.floor(Math.random() * countries.length)];
    }

    getRandomCardType() {
        const cardTypes = Object.keys(this.cardTypePrefixes);
        return cardTypes[Math.floor(Math.random() * cardTypes.length)];
    }

    generateRandomNumber(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    displayCards(cards) {
        this.totalGenerated += cards.length;
        
        cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            this.resultDiv.appendChild(cardElement);
        });

        this.updateStats(cards[0].country);
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-item';
        
        cardDiv.innerHTML = `
            <div class="card-number">${this.formatCardNumber(card.number)}</div>
            <div class="card-details">
                <div class="detail-item">
                    <strong>Expiry:</strong> ${card.expiry}
                </div>
                <div class="detail-item">
                    <strong>CVV:</strong> ${card.cvv}
                </div>
                <div class="detail-item">
                    <strong>Type:</strong> ${card.cardType}
                </div>
                <div class="detail-item">
                    <span class="country-flag">${card.flag}</span>
                    <strong>Country:</strong> ${card.countryName}
                </div>
                <div class="detail-item">
                    <strong>Cardholder:</strong> ${card.cardholder}
                </div>
                <div class="detail-item">
                    <strong>Address:</strong> ${card.city}, ${card.state} ${card.zipCode}
                </div>
            </div>
        `;
        
        return cardDiv;
    }

    formatCardNumber(number) {
        return number.replace(/(\d{4})/g, '$1 ').trim();
    }

    updateStats(lastCountry) {
        this.totalGeneratedSpan.textContent = this.totalGenerated;
        this.uniqueCardsSpan.textContent = this.uniqueCards;
        this.lastCountrySpan.textContent = this.countryData[lastCountry]?.name || lastCountry;
    }

    clearAll() {
        this.generatedCards.clear();
        this.totalGenerated = 0;
        this.uniqueCards = 0;
        this.resultDiv.innerHTML = '<div class="empty-state"><p>No cards generated yet. Click the generate button to start.</p></div>';
        this.updateStats('-');
        this.hideMessages();
    }

    async copyAllToClipboard() {
        const cards = Array.from(this.resultDiv.querySelectorAll('.card-item'));
        if (cards.length === 0) {
            this.showError("No cards to copy");
            return;
        }

        let textToCopy = '';
        cards.forEach(card => {
            const number = card.querySelector('.card-number').textContent.replace(/\s/g, '');
            const details = card.querySelector('.card-details').textContent;
            textToCopy += `${number}\n${details}\n\n`;
        });

        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showSuccess();
        } catch (err) {
            this.showError("Failed to copy to clipboard");
        }
    }

    exportToCSV() {
        const cards = Array.from(this.resultDiv.querySelectorAll('.card-item'));
        if (cards.length === 0) {
            this.showError("No cards to export");
            return;
        }

        let csvContent = "Card Number,Expiry,CVV,Type,Country,Cardholder,City,State,Zip Code\n";
        
        cards.forEach(card => {
            const number = card.querySelector('.card-number').textContent.replace(/\s/g, '');
            const details = card.querySelector('.card-details').textContent;
            const lines = details.split('\n').filter(line => line.trim());
            
            const expiry = lines[0].split(':')[1]?.trim() || '';
            const cvv = lines[1].split(':')[1]?.trim() || '';
            const type = lines[2].split(':')[1]?.trim() || '';
            const country = lines[3].split(':')[1]?.trim() || '';
            const cardholder = lines[4].split(':')[1]?.trim() || '';
            const address = lines[5].split(':')[1]?.trim() || '';
            const [city, stateZip] = address.split(',');
            const [state, zipCode] = stateZip ? stateZip.trim().split(' ') : ['', ''];

            csvContent += `"${number}","${expiry}","${cvv}","${type}","${country}","${cardholder}","${city}","${state}","${zipCode}"\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bin_cards_${new Date().getTime()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    showLoading() {
        this.loadingDiv.style.display = 'block';
        this.generateBtn.disabled = true;
    }

    hideLoading() {
        this.loadingDiv.style.display = 'none';
        this.generateBtn.disabled = false;
    }

    showSuccess() {
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
    new BINGenerator();
});
