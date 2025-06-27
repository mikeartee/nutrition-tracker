from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, item: Item,q: Union[str, None] = None):
    return {"item_id": item_id, "q": q, "item": item}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return{"item_id": item_id, "item": item}


