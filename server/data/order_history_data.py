from models.order_history import OrderHistory
from models.product import Product

products = [
    Product(
        product_name="Green Slippers",
        product_image="https://res.cloudinary.com/da3rlixzz/image/upload/v1631656079/AND%20DIgital/bu4wbjsQrWOJGGiZelkp_Kip_2BCo_AW21_DAYONE_PRODUCT_0396_fsdtnf.jpg",
        outer_material="Fur",
        inner_material="Fur",
        sole="Rubber",
        shoe_width="Normal",
        size="5",
        description="Smart green slippers",
        category="Slippers",
        price=100.00,
        stock_level=5,
        gender="Women's"
    ),
    Product(
        product_name="Green Slippers",
        product_image="https://res.cloudinary.com/da3rlixzz/image/upload/v1631656079/AND%20DIgital/bu4wbjsQrWOJGGiZelkp_Kip_2BCo_AW21_DAYONE_PRODUCT_0396_fsdtnf.jpg",
        outer_material="Fur",
        inner_material="Fur",
        sole="Rubber",
        shoe_width="Normal",
        size="8",
        description="Smart green slippers",
        category="Slippers",
        price=100.00,
        stock_level=67,
        gender="Women's"
    ),
    Product(
        product_name="Lovely Sandals",
        product_image="https://res.cloudinary.com/da3rlixzz/image/upload/v1631656140/AND%20DIgital/71ohkUA58yL._SL1500__ewhnmm.jpg",
        outer_material="Leather",
        inner_material="Leather",
        sole="Rubber",
        shoe_width="Wide",
        size="2",
        description="Smart sandals",
        category="Slippers",
        price=63.00,
        stock_level=6,
        gender="Women's"
    ),
    Product(
        product_name="Lovely Sandals",
        product_image="https://res.cloudinary.com/da3rlixzz/image/upload/v1631656220/AND%20DIgital/sandals-1622127128.jpg_hdfaj7.jpg",
        outer_material="Leather",
        inner_material="Leather",
        sole="Rubber",
        shoe_width="Normal",
        size="4",
        description="Smart sandals",
        category="Slippers",
        price=63.00,
        stock_level=7,
        gender="Women's"
    ),
    Product(
        product_name="High Heels",
        product_image="https://res.cloudinary.com/da3rlixzz/image/upload/v1631655933/AND%20DIgital/5515750_1059682_npwfg1.jpg",
        outer_material="Leather",
        inner_material="Leather",
        sole="Rubber",
        shoe_width="Normal",
        size="5",
        description="Black high heels",
        category="High Heels",
        price=40.00,
        stock_level=7,
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



