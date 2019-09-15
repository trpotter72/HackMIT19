import psycopg2
def createDB():
    conn = None
    try:
        conn = psycopg2.connect(host="database-2.cjgssekceket.us-east-1.rds.amazonaws.com",
                                port=5432,
                                database="staketogether",
                                user="postgres",
                                password="Taco2019!")
        curr = conn.cursor()
        for command in commands:
            curr.execute(command)
        curr.close()
        conn.commit()
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

commands = [
    """
    CREATE TABLE house_data (
            address TEXT PRIMARY KEY,
            invested INTEGER,
            price INTEGER NOT NULL,
            value INTEGER,
            bed INTEGER NOT NULL,
            bath REAL NOT NULL,
            sqft INTEGER NOT NULL,
            exp_rent INTEGER,
            img_url TEXT NOT NULL,
            on_market INTEGER
    );
    """,
    """
    CREATE TABLE users (
        user_id UUID PRIMARY KEY,
        username TEXT NOT NULL,
        pass TEXT NOT NULL
    );
    """,
    """
    CREATE TABLE investments (
        invest_id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        FOREIGN KEY (user_id) 
            REFERENCES users (user_id),
        address TEXT NOT NULL,
        FOREIGN KEY (address)
            REFERENCES house_data (address),
        investment INTEGER NOT NULL
    );
    """
]

if __name__ == "__main__":
    createDB()