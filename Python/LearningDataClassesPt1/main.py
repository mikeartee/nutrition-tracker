from dataclasses import dataclass

@dataclass
class ItemOrigin:
    country: str
    production_date: str


@dataclass
class InventoryItem:
    name: str
    quantity: int
    serial_num: str
    origin: ItemOrigin


#nested dataclass from here
def main():
    item_origin = ItemOrigin(country = "Ethiopia", production_date = "30/12/2023")
    my_item1 = InventoryItem(name ="printer", 
                             quantity = 5, 
                             serial_num = "HADOUKEN111",
                             origin = item_origin)

    my_serialised_obj1 = my_item1.__dict__
    print(my_serialised_obj1)
    my_item2 = InventoryItem(**my_serialised_obj1)
    print(my_item2.__dict__)

if __name__ == "__main__":
    main()