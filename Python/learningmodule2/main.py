from classes import IceCar, ElectricCar

def main():
    
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

if __name__ == "__main__":
    main() 