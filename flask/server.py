from flask import Flask, request
from db_access import *
app = Flask(__name__)

@app.route('/')
def hello_world():
    return('Hello, World!')

@app.route('flask/add_user', methods=['POST'])
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

@app.route('flask/check_password', methods=['POST'])
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

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
