from .Car import Car

class IceCar(Car):
    def __init__(self, brand, milage_km, fuel_consumption, fuel_level):
        Car.__init__(self, brand, milage_km)
        self.fuel_consumption=fuel_consumption
        self.fuel_level=fuel_level
    def drive(self, distance_km):
        super().drive(distance_km)
        self.fuel_level= self.fuel_level-distance_km
        self.fuel_level = (distance_km*self.fuel_consumption/100)