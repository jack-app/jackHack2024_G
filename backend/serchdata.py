import mysql.connector
import pandas as pd
import os
from mysql.connector import Error
from dotenv import load_dotenv

# .envファイルの内容を読み込み
load_dotenv()

def search_mysql(keyword):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    ssl_ca_path = os.path.join(current_dir, os.environ['SSL'])

    try:
        connection = mysql.connector.connect(
            host=os.environ['CONNECTION_HOST'],
            user=os.environ['CONNECTION_USER'],
            password=os.environ['CONNECTION_PASSWORD'],
            database=os.environ['CONNECTION_DATABASE'],
            ssl_ca=ssl_ca_path,
            ssl_verify_cert=True
        )

        if connection.is_connected():
            db_info = connection.get_server_info()
            print("MySQLサーバーに接続しました:", db_info)

            query = """
            SELECT id, lost_item_name, latitude, longitude, place, detail, tag
            FROM lost_item
            WHERE lost_item_name LIKE %s OR place LIKE %s OR detail LIKE %s OR tag LIKE %s
            """
            keyword_pattern = f"%{keyword}%"
            cursor = connection.cursor()
            cursor.execute(query, [keyword_pattern] * 4)  # パラメータをリストで渡す
            result = cursor.fetchall()
            df = pd.DataFrame(result, columns=['id', 'lost_item_name', 'latitude', 'longitude', 'place', 'detail', 'tag'])
            return df
    except Error as e:
        print("エラーが発生しました:", e)
    finally:
        if connection.is_connected():
            connection.close()
            print("データベース接続が閉じられました")
    return pd.DataFrame()  # エラーが発生した場合は空のDataFrameを返す

# # 使用例
# df = search_mysql("あ")
# print(df)