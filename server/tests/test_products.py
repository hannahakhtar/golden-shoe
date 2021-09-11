from app import app, db
import json
from tests.lib import login

def test_get_products():

    client = app.test_client()
    response = client.get("/api/products")

    assert len(response.json) == 27
    assert response.status_code == 200

def test_get_single_product():

    client = app.test_client()
    response = client.get("/api/products/1")

    assert response.json["product_name"] == "White Trainers"
    assert response.status_code == 200    