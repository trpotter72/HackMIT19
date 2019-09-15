import psycopg2
from classes import House
def getConnection():
    conn = psycopg2.connect(host="database-2.cjgssekceket.us-east-1.rds.amazonaws.com",
                                port=5432,
                                database="staketogether",
                                user="postgres",
                                password="Taco2019!")
    return conn

def __addHouse__(h, cur):
    cmd = """ INSERT INTO house_data (address, price, bed, bath, sqft, img_url, invested, value, exp_rent, on_market)
    VALUES ({}, {}, {}, {}, {}, {}, {}, {}, {}, {});""".format(
        h.address,
        h.price,
        h.bed,
        h.bath,
        h.sqft,
        h.img_url,
        h.invested,
        h.value,
        h.exp_rent,
        h.on_market)

def addHouses(hs):
    conn = None
    try:
        conn = getConnection()
        curr = conn.cursor()
        for h in hs:
            __addHouse__(h, curr)
        curr.close()
        conn.commit
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    