from app import db
from models.base import BaseModel
from datetime import *
from models.product_in_order_history import product_order_join
from models.product import Product

class OrderHistory(db.Model, BaseModel):

    __tablename__ = 'order_history'

    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))
    products = db.relationship('Product', backref='order_history', secondary=product_order_join)
