import mysql.connector
import pandas as pd
import os
from mysql.connector import Error
from dotenv import load_dotenv

from photo_decode import image_file_to_base64

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
            SELECT id, name, latitude, longitude, place, detail, tags, photo_path
            FROM lost_item
            WHERE name LIKE %s OR place LIKE %s OR detail LIKE %s OR tags LIKE %s
            """
            keyword_pattern = f"%{keyword}%"
            cursor = connection.cursor()
            cursor.execute(query, [keyword_pattern] * 4)  # パラメータをリストで渡す
            result = cursor.fetchall()
            columns = ['id', 'name', 'latitude', 'longitude', 'place', 'detail', 'tags', 'photo_path']
            df = pd.DataFrame(result, columns=columns)

            # photo_pathのBase64エンコーディング
            # print(df['photo_path'][:100])
            df['photo_path'] = df['photo_path'].apply(lambda x: image_file_to_base64(x if x else None))
            # print(df['photo_path'])
            df['photo_path'] = df['photo_path'].apply(lambda x: str(x)[1:].replace("'", "") if x else None)
            # print(df['photo_path'])

            # DataFrameをJSON形式の文字列に変換
            json_result = df.to_json(orient='records')
            return json_result
    except Error as e:
        print("エラーが発生しました:", e)
        return {"error": str(e)}
    finally:
        if connection.is_connected():
            connection.close()
            print("データベース接続が閉じられました")
    return '[]'  # エラーが発生した場合は空のJSON配列を返す


# # 使用例
# df = search_mysql("あ")
# print(df)
