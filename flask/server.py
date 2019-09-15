from flask import Flask, request
import zillow
from db_access import *
import gmaps
app = Flask(__name__)

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
        return "BAD REQUEST"
    elif userExists(name):
        return "USER EXISTS"
    else:
        addUser(User(name, password))
    return "USER ADDED"

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
        return "BAD REQUEST"
    elif not userExists(name):
        return "USER DOESN'T EXISTS"
    elif passwordMatches(name, password):
        return "VALID PASSWORD"
    else:
        return "INVALID PASSWORD"

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
        return "BAD REQUEST"
    elif not homeExists(address):
        return "BAD ADDRESS"
    elif not userExists(name):
        return "BAD USER"
    elif int(amount) < 1:
        return "AMOUNT MUST BE POSITIVE"
    else:
        user_id = getUserID(name)
        addInvestment(Investment(user_id,address,amount))
        return "SUCCESS"
    
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
        return 'Missing parameters', 400

    zip_code = int(request.args.get('zip_code'))
    radius = int(request.args.get('radius'))
    price_range = request.args.get('price_range')
    bed = request.args.get('bed')
    bath = request.args.get('bath')

    bounds = gmaps.get_bounds(zip_code, radius)
    return str([serialize(h) for h in zillow.get_houses(bounds, price_range, bed, bath)]), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
