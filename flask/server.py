from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import zillow
from db_access import *
import gmaps
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def build_response(message, status):
    response = Response(message, status)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/')
def hello_world():
    return('Hello, World!')

@app.route('/users/add_user', methods=['POST'])
def add_user():
    """
    POST Request:
    {
        'username' : <string>,
        'password' : <string>
    }
    """
    req_data = request.get_json()
    name = req_data.get('username')
    password = req_data.get('password')
    if name is None or password is None:
        return build_response(jsonify("BAD REQUEST"), 400)
    elif userExists(name):
        return build_response(jsonify("USER EXISTS"), 400)
    else:
        addUser(User(name, password))
    return build_response(jsonify("USER ADDED"), 200)

@app.route('/users/check_password', methods=['POST'])
def check_password():
    """
    {
        'username' : <string>,
        'password' : <string>
    }
    """
    req_data = request.get_json()
    name = req_data.get('username')
    password = req_data.get('password')
    if name is None or password is None:
        return build_response(jsonify("BAD REQUEST"), 400)
    elif not userExists(name):
        return build_response(jsonify("USER DOESN'T EXISTS"), 404)
    elif passwordMatches(name, password):
        return build_response(jsonify("VALID PASSWORD"), 200)
    else:
        return build_response(jsonify("INVALID PASSWORD"), 400)

@app.route('/investment/add')
def invest():
    """
    {
        'username' : <string>,
        'address'  : <string>,
        'amount'   : <integer>
    }
    """
    req_data = request.get_json()
    name = req_data.get('username')
    address = req_data.get('address')
    amount = req_data.get('amount')
    if name is None or address is None or amount is None:
        return build_response(jsonify("BAD REQUEST"), 400)
    elif not homeExists(address):
        return build_response(jsonify("BAD ADDRESS"), 400)
    elif not userExists(name):
        return build_response(jsonify("BAD USER"), 400)
    elif int(amount) < 1:
        return build_response(jsonify("AMOUNT MUST BE POSITIVE"), 400)
    else:
        user_id = getUserID(name)
        addInvestment(Investment(user_id,address,amount))
        return build_response(jsonify("SUCCESS"), 200)
    
@app.route('/houses/', methods=['GET'])
def get_houses():
    def serialize(house):
        return {'address': house.address,
        'price': house.price,
        'bed': house.bed,
        'bath': house.bath,
        'sqft': house.sqft,
        'img_url': house.img_url,
        'invested': house.invested,
        'value': house.value,
        'exp_rent': house.exp_rent}
    
    if 'zip_code' not in request.args or 'radius' not in request.args or 'price_range' not in request.args or 'bed' not in request.args or 'bath' not in request.args:
        return build_response('Missing parameters', 400)

    zip_code = int(request.args.get('zip_code'))
    radius = int(request.args.get('radius'))
    price_range = request.args.get('price_range')
    bed = int(request.args.get('bed'))
    bath = int(request.args.get('bath'))

    bounds = gmaps.get_bounds(zip_code, radius)
    return build_response(str([serialize(h) for h in zillow.get_houses(bounds, price_range, bed, bath)]), 200)

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
