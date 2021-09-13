from app import db
from models.base import BaseModel

class ContactUs(db.Model, BaseModel):
    __tablename__ = "contact_us"

    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    reason = db.Column(db.String(4000), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.String(128), nullable=False)
