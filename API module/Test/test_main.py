#pytest

from fastapi.testclient import TestClient
from main import app

# Looks for files named with test_*.py
# $ pytest def test_*(): << is the definition. Aurora DB example?

#unittests. Side effect tests can miss messages to Third Party on request/response tests. End-to-end tests can help mitigate.
def test_basic_example():
    #pass
    assert(True)

client = TestClient(app)

def test_put_api():
    response = client.put("/items/23yde", json = {
        "name": "BarryBook",
        "quantity": 5,
        "serial_num": "23yde",
        "origin": {
            "country": "Ethiopia",
            "production_date": "2023"
    }
    })
    assert response.status_code == 200