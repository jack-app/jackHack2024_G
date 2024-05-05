import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv

# .envファイルの内容を読み込み
load_dotenv()

def delete_data(id):
    try:
        # SSL証明書を使用してデータベースに接続
        connection = mysql.connector.connect(
            host=os.environ['CONNECTION_HOST'],
            user=os.environ['CONNECTION_USER'],
            password=os.environ['CONNECTION_PASSWORD'],  # 実際のパスワードに置き換えてください
            database=os.environ['CONNECTION_DATABASE'],

        )
        if connection.is_connected():
            db_info = connection.get_server_info()
            print("MySQLサーバーに接続しました:", db_info)
            # カーソルを作成
            cursor = connection.cursor()
            # 挿入するデータ
            # SQL INSERT文
            delete_query = f'''
            DELETE FROM lost_item WHERE id = {str(id)};
            '''
            # data = (id)
            # クエリの実行
            cursor.execute(delete_query)
            connection.commit()  # トランザクションのコミット
            print('レコードがデータベースから削除されました')
                
    except Error as e:
        print('エラーが発生しました:', e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print('MySQL接続は閉じられました')