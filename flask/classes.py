class House:

    def __init__(self, address, price, bed, bath, sqft, img_url, invested, value, exp_rent, on_market):
        self.address = address 
        self.price = price 
        self.bed = bed 
        self.bath = bath 
        self.sqft = sqft 
        self.img_url = img_url 
        self.invested = invested 
        self.value = value 
        self.exp_rent = exp_rent 
        self.on_market = on_market

class User:
    
    def __init__(self, username, password):
        self.username = username
        self.password = password
        