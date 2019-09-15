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
    zip_code = int(request.args.get('zip_code'))
    radius = int(request.args.get('radius'))
    bounds = gmaps.get_bounds(zip_code, radius)
    return str([serialize(h) for h in zillow.get_houses(bounds)]), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
