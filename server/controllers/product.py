from flask import Blueprint, request, g
from models.product import Product
from serializers.product import ProductSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

product_schema = ProductSchema()

router = Blueprint('product', __name__)

@router.route("/products", methods=["GET"])
def get_all_products():
    products = Product.query.all()

    return product_schema.jsonify(products, many=True), 200

@router.route("/products/<int:product_id>", methods=["GET"])
def get_single_product(product_id):
    product = Product.query.get(product_id) 

    if not product:
        return { "message": "The product does not exist" }, 404 

    return product_schema.jsonify(product), 200