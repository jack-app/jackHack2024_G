import mysql.connector
from mysql.connector import Error
import os
import random
from datetime import datetime
from photo_decode import convert_base64_to_image
from gpt_tag import gpt_tag
from dotenv import load_dotenv
def increment_like_count(item_id):
    try:
        connection = mysql.connector.connect(
            host=os.environ['CONNECTION_HOST'],
            user=os.environ['CONNECTION_USER'],
            password=os.environ['CONNECTION_PASSWORD'],
            database=os.environ['CONNECTION_DATABASE'],
        )
        if connection.is_connected():
            print("MySQLサーバーに接続しました:", connection.get_server_info())
            cursor = connection.cursor()
            # `like`をバッククォートで囲むことでエラーを解消
            update_query = """
            UPDATE lost_item
            SET `like_count` = `like_count` + 1
            WHERE id = %s
            """
            cursor.execute(update_query, (item_id,))
            connection.commit()
            print("いいね数が更新されました。")
    except Error as e:
        print("エラーが発生しました:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL接続は閉じられました")