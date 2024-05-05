import mysql.connector
from mysql.connector import Error
import os
import random
from datetime import datetime
from photo_decode import convert_base64_to_image
from gpt_tag import gpt_tag
from dotenv import load_dotenv
# .envファイルの内容を読み込み
load_dotenv()

def generate_id(length=36):
    # ランダムな数字列を生成する
    random_id = ''.join([str(random.randint(0, 9)) for _ in range(length)])
    return random_id

def generate_time():
    pickup_time = datetime.now()
    return pickup_time

def save_mysql(lost_item_name,latitude,longitude,base64_string,detail):
    # データベースへ接続
    try:
        # SSL証明書を使用してデータベースに接続
        connection = mysql.connector.connect(
            host=os.environ['CONNECTION_HOST'],
            user=os.environ['CONNECTION_USER'],
            password=os.environ['CONNECTION_PASSWORD'],  # 実際のパスワードに置き換えてください
            database=os.environ['CONNECTION_DATABASE'],  # 接続したいデータベース名を指定
        )

        if connection.is_connected():
            db_info = connection.get_server_info()
            print("MySQLサーバーに接続しました:", db_info)

            # カーソルを作成
            cursor = connection.cursor()

            # 挿入するデータ
            # lost_item_name = "c"
            # latitude = 35.15641491577097
            # longitude = 136.96419518693924
            time = generate_time()
            id = generate_id()
            # photo_path  = "/photo-folder/IMG_2275.JPG"  # 画像のパス
            convert_base64_to_image(base64_string, directory="photo-folder")

            photo_path = convert_base64_to_image(base64_string, directory="photo-folder")

            tags = gpt_tag(base64_string)

            # SQL INSERT文
            insert_query = """
            INSERT INTO lost_item (id, name, latitude, longitude, time, photo_path, detail, tags)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            data = (id, lost_item_name, latitude, longitude, time, photo_path, detail, tags)

            # クエリの実行
            cursor.execute(insert_query, data)
            connection.commit()  # トランザクションのコミット
            print("データがデータベースに挿入されました")

    except Error as e:
        print("エラーが発生しました:", e)

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL接続は閉じられました")

