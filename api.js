// Country Data API for BIN Generator
class CountryDataAPI {
    constructor() {
        this.countryBINs = {
            'US': { 
                name: "United States", 
                flag: "🇺🇸", 
                currency: "USD",
                bins: ['4', '51', '52', '53', '54', '55', '34', '37', '6011'],
                cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
                states: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
                zipFormat: "#####",
                phoneFormat: "+1 (###) ###-####"
            },
            'GB': { 
                name: "United Kingdom", 
                flag: "🇬🇧", 
                currency: "GBP",
                bins: ['4', '51', '52', '53', '54', '55', '67'],
                cities: ["London", "Manchester", "Birmingham", "Liverpool", "Glasgow", "Sheffield", "Leeds", "Edinburgh", "Bristol", "Cardiff"],
                states: ["ENG", "SCT", "WLS", "NIR"],
                zipFormat: "??# #??",
                phoneFormat: "+44 ## #### ####"
            },
            'CA': { 
                name: "Canada", 
                flag: "🇨🇦", 
                currency: "CAD",
                bins: ['4', '51', '52', '53', '54', '55'],
                cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Quebec City", "Hamilton", "Halifax"],
                states: ["ON", "BC", "QC", "AB", "MB", "SK", "NS", "NB", "NL", "PE"],
                zipFormat: "?#? #?#",
                phoneFormat: "+1 (###) ###-####"
            },
            'BD': { 
                name: "Bangladesh", 
                flag: "🇧🇩", 
                currency: "BDT",
                bins: ['4', '51', '52', '67'],
                cities: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"],
                states: ["DHA", "CHI", "KHU", "RAJ", "SYL", "BAR", "RAN", "COM"],
                zipFormat: "####",
                phoneFormat: "+880 ## ###-####"
            },
            'CN': { 
                name: "China", 
                flag: "🇨🇳", 
                currency: "CNY",
                bins: ['4', '62', '81'],
                cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Chongqing", "Tianjin", "Nanjing", "Wuhan", "Xi'an"],
                states: ["BJ", "SH", "GD", "SZ", "SC", "CQ", "TJ", "JS", "HB", "SN"],
                zipFormat: "######",
                phoneFormat: "+86 ### #### ####"
            },
            'HK': { 
                name: "Hong Kong", 
                flag: "🇭🇰", 
                currency: "HKD",
                bins: ['4', '51', '52', '53', '54', '55'],
                cities: ["Hong Kong", "Kowloon", "New Territories", "Central", "Tsim Sha Tsui", "Mong Kok", "Causeway Bay"],
                states: ["HK", "KL", "NT"],
                zipFormat: "??",
                phoneFormat: "+852 #### ####"
            },
            'SG': { 
                name: "Singapore", 
                flag: "🇸🇬", 
                currency: "SGD",
                bins: ['4', '51', '52', '53', '54', '55'],
                cities: ["Singapore", "Jurong East", "Woodlands", "Tampines", "Bedok", "Pasir Ris", "Clementi"],
                states: ["SG"],
                zipFormat: "######",
                phoneFormat: "+65 #### ####"
            },
            'AU': { 
                name: "Australia", 
                flag: "🇦🇺", 
                currency: "AUD",
                bins: ['4', '51', '52', '53', '54', '55'],
                cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong"],
                states: ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"],
                zipFormat: "####",
                phoneFormat: "+61 # #### ####"
            },
            'DE': { 
                name: "Germany", 
                flag: "🇩🇪", 
                currency: "EUR",
                bins: ['4', '51', '52', '53', '54', '55', '67'],
                cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig"],
                states: ["BE", "BY", "HH", "HE", "NW", "RP", "BW", "SL", "SN", "ST", "TH"],
                zipFormat: "#####",
                phoneFormat: "+49 ### #######"
            },
            'FR': { 
                name: "France", 
                flag: "🇫🇷", 
                currency: "EUR",
                bins: ['4', '51', '52', '53', '54', '55'],
                cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
                states: ["IDF", "PACA", "ARA", "OCC", "PL", "GE", "NOR", "CVL", "BFC", "BRE"],
                zipFormat: "#####",
                phoneFormat: "+33 # ## ## ## ##"
            },
            'JP': { 
                name: "Japan", 
                flag: "🇯🇵", 
                currency: "JPY",
                bins: ['4', '36', '38', '39'],
                cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Sapporo", "Kobe", "Fukuoka", "Kawasaki", "Hiroshima"],
                states: ["TY", "OS", "KY", "YK", "NG", "SP", "KB", "FK", "KW", "HS"],
                zipFormat: "###-####",
                phoneFormat: "+81 ## #### ####"
            },
            'IN': { 
                name: "India", 
                flag: "🇮🇳", 
                currency: "INR",
                bins: ['4', '60', '65'],
                cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"],
                states: ["MH", "DL", "KA", "TS", "TN", "WB", "GJ", "RJ", "UP", "PB"],
                zipFormat: "######",
                phoneFormat: "+91 #### ### ###"
            },
            'BR': { 
                name: "Brazil", 
                flag: "🇧🇷", 
                currency: "BRL",
                bins: ['4', '51', '52', '53', '54', '55', '60'],
                cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],
                states: ["SP", "RJ", "DF", "BA", "CE", "MG", "AM", "PR", "PE", "RS"],
                zipFormat: "#####-###",
                phoneFormat: "+55 ## #####-####"
            },
            'MX': { 
                name: "Mexico", 
                flag: "🇲🇽", 
                currency: "MXN",
                bins: ['4', '51', '52', '53', '54', '55'],
                cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Ciudad Juárez", "Torreón", "Querétaro", "Merida"],
                states: ["CDMX", "JAL", "NL", "PUE", "BC", "GTO", "CHH", "COA", "QUE", "YUC"],
                zipFormat: "#####",
                phoneFormat: "+52 ### ### ####"
            }
        };

        this.cardTypeData = {
            'visa': {
                name: "Visa",
                icon: "💳",
                prefixes: ['4'],
                lengths: [16],
                cvvLength: 3
            },
            'mastercard': {
                name: "Mastercard",
                icon: "💳",
                prefixes: ['51', '52', '53', '54', '55', '22', '23', '24', '25', '26', '27'],
                lengths: [16],
                cvvLength: 3
            },
            'amex': {
                name: "American Express",
                icon: "💳",
                prefixes: ['34', '37'],
                lengths: [15],
                cvvLength: 4
            },
            'discover': {
                name: "Discover",
                icon: "💳",
                prefixes: ['6011', '65', '64', '622'],
                lengths: [16],
                cvvLength: 3
            },
            'unionpay': {
                name: "UnionPay",
                icon: "💳",
                prefixes: ['62'],
                lengths: [16, 17, 18, 19],
                cvvLength: 3
            },
            'jcb': {
                name: "JCB",
                icon: "💳",
                prefixes: ['35'],
                lengths: [16],
                cvvLength: 3
            }
        };
    }

    // Get all countries
    getAllCountries() {
        return Object.keys(this.countryBINs).map(code => ({
            code: code,
            ...this.countryBINs[code]
        }));
    }

    // Get country by code
    getCountryByCode(code) {
        return this.countryBINs[code] || null;
    }

    // Get random country
    getRandomCountry() {
        const codes = Object.keys(this.countryBINs);
        const randomCode = codes[Math.floor(Math.random() * codes.length)];
        return {
            code: randomCode,
            ...this.countryBINs[randomCode]
        };
    }

    // Get all card types
    getAllCardTypes() {
        return Object.keys(this.cardTypeData).map(type => ({
            type: type,
            ...this.cardTypeData[type]
        }));
    }

    // Get card type by name
    getCardType(type) {
        return this.cardTypeData[type] || null;
    }

    // Get random card type
    getRandomCardType() {
        const types = Object.keys(this.cardTypeData);
        const randomType = types[Math.floor(Math.random() * types.length)];
        return {
            type: randomType,
            ...this.cardTypeData[randomType]
        };
    }

    // Validate BIN for country and card type
    validateBIN(bin, countryCode, cardType) {
        const country = this.getCountryByCode(countryCode);
        const cardTypeInfo = this.getCardType(cardType);
        
        if (!country || !cardTypeInfo) return false;

        // Check if BIN matches any country prefix
        const countryMatch = country.bins.some(prefix => bin.startsWith(prefix));
        // Check if BIN matches any card type prefix
        const cardTypeMatch = cardTypeInfo.prefixes.some(prefix => bin.startsWith(prefix));

        return countryMatch && cardTypeMatch;
    }

    // Generate BIN for specific country and card type
    generateBIN(countryCode, cardType) {
        const country = this.getCountryByCode(countryCode);
        const cardTypeInfo = this.getCardType(cardType);
        
        if (!country || !cardTypeInfo) return null;

        // Find common prefixes between country and card type
        const commonPrefixes = country.bins.filter(prefix => 
            cardTypeInfo.prefixes.some(cardPrefix => prefix.startsWith(cardPrefix) || cardPrefix.startsWith(prefix))
        );

        let prefix;
        if (commonPrefixes.length > 0) {
            prefix = commonPrefixes[Math.floor(Math.random() * commonPrefixes.length)];
        } else {
            // If no common prefixes, use card type prefix
            prefix = cardTypeInfo.prefixes[Math.floor(Math.random() * cardTypeInfo.prefixes.length)];
        }

        // Generate remaining BIN digits to make 6 digits total
        const remainingLength = 6 - prefix.length;
        if (remainingLength > 0) {
            let remaining = '';
            for (let i = 0; i < remainingLength; i++) {
                remaining += Math.floor(Math.random() * 10);
            }
            return prefix + remaining;
        }

        return prefix;
    }

    // Generate phone number for country
    generatePhoneNumber(countryCode) {
        const country = this.getCountryByCode(countryCode);
        if (!country) return '';

        let phone = country.phoneFormat;
        for (let i = 0; i < phone.length; i++) {
            if (phone[i] === '#') {
                phone = phone.replace('#', Math.floor(Math.random() * 10));
            }
        }
        return phone;
    }

    // Get country by currency
    getCountriesByCurrency(currency) {
        return Object.keys(this.countryBINs)
            .filter(code => this.countryBINs[code].currency === currency)
            .map(code => ({
                code: code,
                ...this.countryBINs[code]
            }));
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountryDataAPI;
}
