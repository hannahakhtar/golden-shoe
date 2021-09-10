from models.order_history import OrderHistory
from models.product import Product

products = [
    Product(
        product_name="Pink Trainers",
        product_image="https://i.ibb.co/0YkH1Px/pumatrainers.jpg",
        outer_material="Suede",
        inner_material="Polyester",
        sole="Rubber",
        shoe_width="Normal",
        size="4",
        description="Pink Puma trainers",
        category="Sports",
        price=60.00,
        stock_level=34,
        gender="Women's"
    ),
    Product(
        product_name="Pink Trainers",
        product_image="https://i.ibb.co/0YkH1Px/pumatrainers.jpg",
        outer_material="Suede",
        inner_material="Polyester",
        sole="Rubber",
        shoe_width="Normal",
        size="9",
        description="Pink Puma trainers",
        category="Sports",
        price=60.00,
        stock_level=34,
        gender="Women's"
    ),
    Product(
        product_name="Smart Shoes",
        product_image="https://i.ibb.co/0YkH1Px/pumatrainers.jpg",
        outer_material="Leather",
        inner_material="An inner material",
        sole="Rubber",
        shoe_width="Normal",
        size="6",
        description="Black smart shoes with detailing",
        category="Evening Wear",
        price=55.00,
        stock_level=10,
        gender="Women's"
    )
]


list_order_history = [
    OrderHistory(user_id=1, products=products),
    OrderHistory(user_id=1, products=products),
    OrderHistory(user_id=2, products=products),
    OrderHistory(user_id=2, products=products),
    OrderHistory(user_id=3, products=products),
    OrderHistory(user_id=3, products=products),
    OrderHistory(user_id=4, products=products),
    OrderHistory(user_id=4, products=products)
]



