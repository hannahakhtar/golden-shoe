from app import db
from models.base import BaseModel
# from models.order_history import OrderHistory
from models.wishlist import Wishlist


class Product(db.Model, BaseModel):
    __tablename__ = "product"

    product_name = db.Column(db.Text, nullable=False)
    product_image = db.Column(db.Text, nullable=False)
    outer_material = db.Column(db.Text, nullable=True)
    inner_material = db.Column(db.Text, nullable=True)
    sole = db.Column(db.Text, nullable=True)
    shoe_width = db.Column(db.Text, nullable=True)
    size = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock_level = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.Text, nullable=False)

    wishlist = db.relationship('Wishlist', backref='product', cascade="all, delete")
