from app import db

product_order_join = db.Table('product_in_order_history',
    db.Column('order_id', db.Integer, db.ForeignKey('order_history.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True)
)
