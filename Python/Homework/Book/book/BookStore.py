class BookStore(BaseModel):
    name_of_store: str
    book_shelve: list[BookItem]