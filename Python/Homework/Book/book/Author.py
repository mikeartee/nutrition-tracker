from pydantic import BaseModel
from .BookItem import BookItem

class Author(BaseModel):
    name: str
    author_id: str
    
@validate("name")
@classmethod
def validate_author(cls, name: str):
    assert name.istitle(), "The name of the author should look like a normal name, e.g. 'John Doe'"
    return name
