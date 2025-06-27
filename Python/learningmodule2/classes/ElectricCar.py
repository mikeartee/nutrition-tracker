from .Car import Car

class ElectricCar(Car):
    def __init__(self, brand, milage_km, range, fuel_level):
        super().__init__(brand, milage_km)
        self.range=range
        self.fuel_level=fuel_level
    def drive(self, distance_km):
        super().drive(distance_km)
        self.range= self.range-distance_km
        self.fuel_level = (distance_km*self.fuel_level/100)