class Car:
    def __init__(self, brand, milage_km):                                   
        self.brand=brand
        self.milage_km=milage_km

    def drive(self, distance_km):
        self.milage_km = self.milage_km + distance_km


class ElectricCar(Car):
    def __init__(self, brand, milage_km, range, fuel_level):
        super().__init__(brand, milage_km)
        self.range=range
        self.fuel_level=fuel_level
    def drive(self, distance_km):
        super().drive(distance_km)
        self.range= self.range-distance_km
        self.fuel_level = (distance_km*self.fuel_level/100)

class IceCar(Car):
    def __init__(self, brand, milage_km, fuel_consumption, fuel_level):
        Car.__init__(self, brand, milage_km)
        self.fuel_consumption=fuel_consumption
        self.fuel_level=fuel_level
    def drive(self, distance_km):
        super().drive(distance_km)
        self.fuel_level= self.fuel_level-distance_km
        self.fuel_level = (distance_km*self.fuel_consumption/100)

my_ev = ElectricCar("Tesla", 80000, 300, 30)
my_ev.drive(distance_km=32.5)
my_ev1 = ElectricCar("Tesla", 80000, 300, 30)
my_ev1.drive(distance_km=75)
my_ev2 = ElectricCar("Tesla", 80000, 300, 30)
my_ev2.drive(distance_km=150)

my_icecar = IceCar("Mitsubishi", 25000, 7, 30)
my_icecar.drive(distance_km=150)
my_icecar1= IceCar("Mitsubishi", 25000, 7, 30)
my_icecar1.drive(distance_km=75)
my_icecar2 = IceCar("Mitsubishi", 25000, 7, 30)
my_icecar2.drive(distance_km=32.5)

print(my_ev.__dict__)
print("")
print(my_ev1.__dict__)
print("")
print(my_ev2.__dict__)
print("")
print(my_icecar.__dict__)
print("")
print(my_icecar1.__dict__)
print("")
print(my_icecar2.__dict__)