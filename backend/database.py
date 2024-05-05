import mysql.connector
from mysql.connector import Error
import os

# 現在のスクリプトのディレクトリパスを取得
current_dir = os.path.dirname(os.path.abspath(__file__))

# SSL証明書のパスを設定
ssl_ca_path = os.path.join(current_dir, 'DigiCertGlobalRootCA.crt.pem')


try:
    # 接続の作成
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

        # 接続を閉じる
        connection.close()
except Error as e:
    print("エラーが発生しました:", e)