import random

class TestCardGenerator:
    def __init__(self):
        # Card IIN (Issuer Identification Number) ranges for major card types
        self.card_prefixes = {
            'visa': ['4'],
            'mastercard': ['51', '52', '53', '54', '55'],
            'amex': ['34', '37'],
            'discover': ['6011']
        }
        
        # Fake but realistic details for demonstration
        self.first_names = ['John', 'Jane', 'Robert', 'Maria', 'David', 'Sarah']
        self.last_names = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Lee']
        self.cities = {
            'US': ['New York', 'Los Angeles', 'Chicago', 'Houston'],
            'GB': ['London', 'Manchester', 'Birmingham'],
            'BD': ['Dhaka', 'Chittagong', 'Khulna']
        }

    def luhn_checksum(self, card_number):
        """Calculate the check digit using the Luhn algorithm."""
        def digits_of(n):
            return [int(d) for d in str(n)]
        digits = digits_of(card_number)
        odd_digits = digits[-1::-2]
        even_digits = digits[-2::-2]
        checksum = sum(odd_digits)
        for d in even_digits:
            checksum += sum(digits_of(d * 2))
        return checksum % 10

    def calculate_luhn(self, partial_number):
        """Generate a valid check digit for a partial card number."""
        check_digit = self.luhn_checksum(partial_number + '0')
        return (10 - check_digit) % 10

    def generate_card_number(self, card_type):
        """Generate a valid card number that passes the Luhn check."""
        if card_type not in self.card_prefixes:
            return None
            
        prefix = random.choice(self.card_prefixes[card_type])
        
        # Generate remaining digits (excluding the final check digit)
        length = 16 if card_type != 'amex' else 15
        remaining_length = length - len(prefix) - 1
        
        partial_number = prefix
        for _ in range(remaining_length):
            partial_number += str(random.randint(0, 9))
            
        # Calculate and append the Luhn check digit
        check_digit = self.calculate_luhn(partial_number)
        return partial_number + str(check_digit)

    def generate_expiry_date(self):
        """Generate a future expiry date."""
        month = random.randint(1, 12)
        year = random.randint(2025, 2030)
        return f"{month:02d}/{year}"

    def generate_cvv(self, card_type):
        """Generate a CVV code."""
        length = 4 if card_type == 'amex' else 3
        cvv = ''.join([str(random.randint(0, 9)) for _ in range(length)])
        return cvv

    def generate_cardholder_name(self):
        """Generate a random cardholder name."""
        first_name = random.choice(self.first_names)
        last_name = random.choice(self.last_names)
        return f"{first_name} {last_name}"

    def generate_address(self, country):
        """Generate a fake address."""
        city = random.choice(self.cities.get(country, ['Unknown City']))
        street = f"{random.randint(1, 999)} Fake Street"
        zip_code = f"{random.randint(10000, 99999)}"
        return f"{street}, {city}, {zip_code}"

    def generate_test_card(self, card_type='visa', country='US'):
        """Generate a complete set of test card details."""
        card_number = self.generate_card_number(card_type)
        if not card_number:
            return None
            
        return {
            'number': card_number,
            'expiry': self.generate_expiry_date(),
            'cvv': self.generate_cvv(card_type),
            'cardholder': self.generate_cardholder_name(),
            'address': self.generate_address(country),
            'type': card_type.upper()
        }

def main():
    generator = TestCardGenerator()
    
    print("=== Test Card Generator ===")
    print("This tool generates VALID FORMATTED but FAKE card numbers for testing.")
    print("DO NOT use for real transactions!\n")
    
    # Generate multiple test cards
    card_types = ['visa', 'mastercard', 'amex']
    
    for i, card_type in enumerate(card_types, 1):
        card = generator.generate_test_card(card_type)
        if card:
            print(f"--- Test Card {i} ({card['type']}) ---")
            print(f"Number: {card['number']}")
            print(f"Expiry: {card['expiry']}")
            print(f"CVV: {card['cvv']}")
            print(f"Cardholder: {card['cardholder']}")
            print(f"Address: {card['address']}")
            print()

if __name__ == "__main__":
    main()
