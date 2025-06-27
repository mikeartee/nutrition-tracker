class TomatoSauce:
    def __init__(self, storage_location):
        self.storage_location = storage_location
        self.score = 100  # Start with a perfect score

    def age_sauce(self, days):
        # Over time, sauce may degrade differently based on storage location
        if self.storage_location == 'fridge':
            self.score -= days * 0.5  # Fridge slows down degradation
        elif self.storage_location == 'pantry':
            self.score -= days * 2  # Pantry speeds up degradation

    def get_quality(self):
        # A simple method to determine the quality based on the score
        if self.score > 75:
            return 'Good'
        elif 50 <= self.score <= 75:
            return 'Fair'
        else:
            return 'Poor'

# Test the quality of sauce after storing for 30 days
fridge_sauce = TomatoSauce('fridge')
pantry_sauce = TomatoSauce('pantry')

fridge_sauce.age_sauce(30)
pantry_sauce.age_sauce(30)

print(f"Fridge Sauce Quality: {fridge_sauce.get_quality()} - Score: {fridge_sauce.score}")
print(f"Pantry Sauce Quality: {pantry_sauce.get_quality()} - Score: {pantry_sauce.score}")
