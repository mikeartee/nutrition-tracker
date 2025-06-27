from book import Author, BookItem, BookStore

def main():
    #First example of flow, invalid name
    try:
        invalid_name = Author(name="john doe")
    except ValidationError as ve:
        print("Demonstrating that the Author name has to be valid")
    else:
        print(Author.__dict__)

    #Invalid Year Published
    try:
        invalid_year = BookItem(name = "Booky Book", author = Author(name = "John Doe"), year_published = 3008)
    except YearError as ye:
        print("Demonstrating wrong year range")
    else:
        print(year_published.__dict__)