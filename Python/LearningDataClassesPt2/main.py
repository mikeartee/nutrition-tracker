from pydantic import BaseModel , field_validator

#pydantic from BaseModel
class ItemOrigin(BaseModel):
    country: str
    production_date: str

    @field_validator ("country")
    @classmethod
    def check_valid_country(cls, country: str):
        assert country == "Ethiopia", "country name must be Ethiopia"


class InventoryItem(BaseModel):
    name: str
    quantity: int
    serial_num: str
    origin: ItemOrigin


#nested dataclass from here ItemOrigin now refers to the BaseModel
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