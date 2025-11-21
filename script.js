document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const copySuccess = document.getElementById('copySuccess');
    
    // Country data for generating details
    const countries = [
        { name: "United States", code: "US", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"], states: ["NY", "CA", "IL", "TX", "AZ"], zipFormat: "#####" },
        { name: "United Kingdom", code: "UK", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Glasgow"], states: ["ENG", "SCT", "WLS", "NIR"], zipFormat: "??# #??" },
        { name: "Canada", code: "CA", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"], states: ["ON", "BC", "QC", "AB"], zipFormat: "?#? #?#" },
        { name: "Australia", code: "AU", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"], states: ["NSW", "VIC", "QLD", "WA"], zipFormat: "####" },
        { name: "Germany", code: "DE", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"], states: ["BE", "BY", "HH", "HE"], zipFormat: "#####" },
        { name: "France", code: "FR", cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"], states: ["IDF", "PACA", "ARA", "OCC"], zipFormat: "#####" },
        { name: "Japan", code: "JP", cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"], states: ["TY", "OS", "KY", "YK"], zipFormat: "###-####" },
        { name: "India", code: "IN", cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"], states: ["MH", "DL", "KA", "TS"], zipFormat: "######" },
        { name: "Brazil", code: "BR", cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"], states: ["SP", "RJ", "DF", "BA"], zipFormat: "#####-###" },
        { name: "Mexico", code: "MX", cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"], states: ["CDMX", "JAL", "NL", "PUE"], zipFormat: "#####" }
    ];
    
    // First names for cardholders
    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Daniel", "Nancy", "Matthew", "Lisa", "Anthony", "Betty", "Donald", "Helen", "Mark", "Sandra"];
    
    // Last names for cardholders
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];
    
    // Generate a random number with specified length
    function generateRandomNumber(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }
    
    // Generate a random cardholder name
    function generateCardholderName() {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${firstName} ${lastName}`;
    }
    
    // Generate a random CVV
    function generateCVV() {
        return generateRandomNumber(3);
    }
    
    // Generate a random country with details
    function generateCountryDetails() {
        const country = countries[Math.floor(Math.random() * countries.length)];
        const city = country.cities[Math.floor(Math.random() * country.cities.length)];
        const state = country.states[Math.floor(Math.random() * country.states.length)];
        
        // Generate zip code based on format
        let zipCode = '';
        for (let char of country.zipFormat) {
            if (char === '#') {
                zipCode += Math.floor(Math.random() * 10);
            } else if (char === '?') {
                zipCode += String.fromCharCode(65 + Math.floor(Math.random() * 26));
            } else {
                zipCode += char;
            }
        }
        
        return {
            country: country.name,
            state: state,
            city: city,
            zipCode: zipCode
        };
    }
    
    // Generate a valid credit card number using Luhn algorithm
    function generateCreditCardNumber(bin) {
        // Generate the remaining digits (excluding the check digit)
        let cardNumber = bin;
        for (let i = 0; i < 9; i++) {
            cardNumber += Math.floor(Math.random() * 10);
        }
        
        // Calculate check digit using Luhn algorithm
        let sum = 0;
        let isEven = false;
        
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
        
        const checkDigit = (10 - (sum % 10)) % 10;
        return cardNumber + checkDigit;
    }
    
    // Generate BINs based on user input
    function generateBINs() {
        const binsInput = document.getElementById('bins').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const cvvInput = document.getElementById('cvv').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        
        if (!binsInput.trim()) {
            alert("Please enter at least one BIN");
            return;
        }
        
        // Show loading
        loadingDiv.style.display = 'block';
        resultDiv.innerHTML = '';
        
        // Process after a short delay to show loading animation
        setTimeout(() => {
            const bins = binsInput.split(';').map(bin => bin.trim()).filter(bin => bin.length > 0);
            let resultsHTML = '';
            
            bins.forEach(bin => {
                for (let i = 0; i < quantity; i++) {
                    const cardNumber = generateCreditCardNumber(bin);
                    const cvv = cvvInput === 'XXX' ? generateCVV() : cvvInput;
                    const countryDetails = generateCountryDetails();
                    const cardholderName = generateCardholderName();
                    
                    resultsHTML += `
                        <div class="bin-item">
                            <strong>${cardNumber} | ${month} | ${year} | ${cvv}</strong>
                            <div class="bin-details">
                                <strong>BIN:</strong> ${bin} | 
                                <strong>Country:</strong> ${countryDetails.country} | 
                                <strong>State:</strong> ${countryDetails.state} | 
                                <strong>City:</strong> ${countryDetails.city} | 
                                <strong>Zip Code:</strong> ${countryDetails.zipCode} | 
                                <strong>Cardholder:</strong> ${cardholderName}
                            </div>
                        </div>
                    `;
                }
            });
            
            resultDiv.innerHTML = resultsHTML;
            loadingDiv.style.display = 'none';
        }, 1000);
    }
    
    // Copy all results to clipboard
    function copyToClipboard() {
        const binItems = document.querySelectorAll('.bin-item');
        let textToCopy = '';
        
        binItems.forEach(item => {
            const mainText = item.querySelector('strong').textContent;
            const detailsText = item.querySelector('.bin-details').textContent;
            textToCopy += `${mainText}\n${detailsText}\n\n`;
        });
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            copySuccess.style.display = 'block';
            setTimeout(() => {
                copySuccess.style.display = 'none';
            }, 3000);
        });
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generateBINs);
    copyBtn.addEventListener('click', copyToClipboard);
});
