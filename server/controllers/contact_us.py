from flask import Blueprint, request, g
from models.contact_us import ContactUs
from serializers.contact_us import ContactUsSchema
from marshmallow.exceptions import ValidationError

contact_us_schema = ContactUsSchema()

router = Blueprint('contact_us', __name__)

@router.route('/contact-us', methods=["POST"])
def post_comment():
    contact_dict = request.json
    print('submission', contact_dict)
    try: 
        comment_to_add = contact_us_schema.load(contact_dict)
    
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}  

    comment_to_add.save()
    return contact_us_schema.jsonify(comment_to_add), 201