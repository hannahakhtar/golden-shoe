from app import app, db
import json
from tests.lib import login

def test_get_all_order_history():

    client = app.test_client()
    token = login(client)
    request_headers = {"Authorization": f"Bearer {token}"}
    response = client.get(
        "/api/users/1/orders",
        headers=request_headers,
        )
    print(response.json)
    assert len(response.json) == 2
    assert response.status_code == 200

def test_get_one_order_history():
    
    client = app.test_client()
    token = login(client)
    request_headers = {"Authorization": f"Bearer {token}"}
    response = client.get(
        "/api/users/1/orders/1",
        headers=request_headers,
        )

    assert len(response.json) == 1
    assert response.status_code == 200
