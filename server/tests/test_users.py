from app import app, db
import json
from tests.lib import login

def test_get_user():

    client = app.test_client()
    response = client.get("/api/users")

    assert len(response.json) == 4
    assert response.status_code == 200

def test_single_user():

    client = app.test_client()
    response = client.get("/api/users/1")

    assert response.json['email'] == 'bob@smith.com'
    assert response.status_code == 200 

def test_signup():

    client = app.test_client()

    user_data = {"email": "sophieh@akhtar.com", "password": "sophie123", "first_name": "Sophie", "last_name": "Akhtar"}
    user_response = client.post(
        "/api/signup",
        data=json.dumps(user_data),
        content_type="application/json"
    )

    assert user_response.json['first_name'] == 'Sophie'
    assert user_response.status_code == 201

def test_login():

    client = app.test_client()

    login_data = {"email": "bob@smith.com", "password": "bobsmith123"}
    response = client.post(
        "/api/login",
        data=json.dumps(login_data),
        content_type="application/json"
    )

    assert response.json["message"] == "Welcome back!"
    assert response.status_code == 200

def test_delete_user():

    client = app.test_client()

    login_data = {"email": "sophieh@akhtar.com", "password": "sophie123"}
    login_response = client.post(
        "/api/login", data=json.dumps(login_data), content_type="application/json"
    )
    token = login_response.json["token"]

    user_data = {"email": "sophieh@akhtar.com", "password": "sophie123", "first_name": "Sophie", "last_name": "Akhtar"}
    request_headers = {"Authorization": f"Bearer {token}"}

    user_response = client.delete(
        "/api/users/5",
        data=json.dumps(user_data),
        content_type="application/json",
        headers=request_headers,
    )

    assert user_response.json['message'] == 'User deleted successfully'
    assert user_response.status_code == 200

def test_update_user():

    client = app.test_client()  
    token = login(client)
    update_request = {"last_name": "Jones"}
    request_headers = {"Authorization": f"Bearer {token}"}
    user_response = client.put(
        "/api/users/1",
        data=json.dumps(update_request),
        content_type="application/json",
        headers=request_headers,
    )
    
    assert user_response.json["last_name"] == "Jones"
    assert user_response.status_code == 200
  