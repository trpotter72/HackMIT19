import psycopg2
from classes import House
def getConnection():
    conn = psycopg2.connect(host="database-2.cjgssekceket.us-east-1.rds.amazonaws.com",
                                port=5432,
                                database="staketogether",
                                user="postgres",
                                password="Taco2019!")
    return conn

def __addHouse__(h, curr):
    cmd = """ INSERT INTO house_data (address, price, bed, bath, sqft, img_url, invested, value, exp_rent, on_market)
    VALUES ({}, {}, {}, {}, {}, {}, {}, {}, {}, {});""".format(list(*h.__dict__.values()))
    curr.execute(cmd)

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

def addInvestment(i)
    conn = None
    try:
        conn = getConnection()
        curr = conn.cursor()
        cmd = """ INSERT INTO investments (invest_id, user_id, address, investment)
            VALUES ({}, {}, {}, {});""".format(list(*i.__dict__.values()))
        curr.execute(cmd)
        curr.close()
        conn.commit
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def addUser(u)
    conn = None
    try:
        conn = getConnection()
        curr = conn.cursor()
        cmd = """ INSERT INTO investments (user_id, username, pass)
            VALUES ({}, {}, {});""".format(list(*u.__dict__.values()))
        curr.execute(cmd)
        curr.close()
        conn.commit
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()