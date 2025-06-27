from pydantic import BaseModel, field_validator
from .Author import Author


class BookItem(BaseModel):
    name: str
    author: Author
    year_published: int
    
    @field_validator("year_published")
    @classmethod 
    def valid_year_published(cls, year_published: int):
        assert year_published >= 2023 >= -3000, "Year published should be in the future, up to the year 3000."
        return year_published