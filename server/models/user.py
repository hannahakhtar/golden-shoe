from app import db, bcrypt
from models.base import BaseModel
from models.wishlist import Wishlist
from models.order_history import OrderHistory
from sqlalchemy.ext.hybrid import hybrid_property
import jwt
from datetime import *
from config.environment import secret
from sqlalchemy.orm import validates

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    email = db.Column(db.Text, nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)

    wishlist = db.relationship('Wishlist', backref='users', cascade="all, delete")
    order_history = db.relationship('OrderHistory', backref='users', cascade="all, delete")

    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address, "You must have a valid email address"
        return address

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode('utf-8')
    def validate_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)
    def generate_token(self):
        payload = {
            "sub": self.id,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(days=1)
        } 
        token = jwt.encode(payload, secret, 'HS256')
        return token
