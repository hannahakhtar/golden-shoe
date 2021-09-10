from flask import Blueprint, request, g
from models.order_history import OrderHistory
from models.user import User
from models.product_in_order_history import product_order_join
from serializers.order_history import OrderHistorySchema
from serializers.order_history import SimpleOrderHistorySchema
from serializers.product import ProductSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

order_history_schema = OrderHistorySchema()
simple_order_history_schema = SimpleOrderHistorySchema()

router = Blueprint('order_history', __name__)

@router.route('/users/<int:user_id>/orders', methods=["GET"])
@secure_route
def get_all_order_history(user_id):
    orders = OrderHistory.query.filter_by(user_id = user_id)
    if user_id != g.current_user.id:
        return {'errors': 'Sorry - you can not view this user\'s orders'}, 401
    if not orders.first():
        return {'errors': 'Could not find any orders by this ID'}, 401
    return order_history_schema.jsonify(orders, many=True), 200

@router.route('/users/<int:user_id>/orders/<int:order_history_id>', methods=["GET"])
@secure_route
def get_one_order_history(user_id, order_history_id):
    orders = OrderHistory.query.filter_by(user_id = user_id)
    orders = orders.filter_by(id = order_history_id)
    if user_id != g.current_user.id:
        return {'errors': 'Sorry - you can not view this user\'s orders'}, 401
    if not orders.first():
        return {'errors': 'Could not find an order by this ID'}, 401
    return order_history_schema.jsonify(orders, many=True), 200     

@router.route('/users/<int:user_id>/orders/', methods=["POST"])
@secure_route
def post_order(user_id):
    products_list = request.json
    print(products_list)

    if user_id != g.current_user.id:
        return {'errors': 'Sorry - you do not have access to this'}, 401
    try:
        ordered_products = { 'user_id': user_id, 'products': products_list }
        order_to_add = simple_order_history_schema.load(ordered_products)
        
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    order_to_add.save()
    return simple_order_history_schema.jsonify(order_to_add), 201