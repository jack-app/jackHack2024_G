import mysql.connector
import pandas as pd
import os
from mysql.connector import Error
from dotenv import load_dotenv

# .envファイルの内容を読み込見込む
load_dotenv()

def get_data():
    # 現在のスクリプトのディレクトリパスを取得
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # SSL証明書のパスを設定
    ssl_ca_path = os.path.join(current_dir, os.environ['SSL'])

    try:
        # SSL証明書を使用してデータベースに接続
        connection = mysql.connector.connect(
            host=os.environ['CONNECTION_HOST'],
            user=os.environ['CONNECTION_USER'],
            password=os.environ['CONNECTION_PASSWORD'],  # 実際のパスワードに置き換えてください
            database=os.environ['CONNECTION_DATABASE'],  # 接続したいデータベース名を指定
            ssl_ca=ssl_ca_path,
            ssl_verify_cert=True
        )

        if connection.is_connected():
            db_info = connection.get_server_info()
            print("MySQLサーバーに接続しました:", db_info)

            # データの読み込み
            query = "SELECT id, lost_item_name, latitude, longitude FROM lost_item"
            df = pd.read_sql(query, connection)
            return df
    except Error as e:
        print("エラーが発生しました:", e)
    finally:
        if connection.is_connected():
            connection.close()
            print("データベース接続が閉じられました")
    return pd.DataFrame()  # エラーが発生した場合は空のDataFrameを返す