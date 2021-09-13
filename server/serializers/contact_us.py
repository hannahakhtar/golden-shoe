from app import ma
from models.contact_us import ContactUs
from marshmallow import fields

class ContactUsSchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = ContactUs
        load_instance = True