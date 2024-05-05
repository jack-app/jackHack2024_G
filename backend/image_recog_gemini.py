import google.generativeai as genai
import os, shutil
import urllib.request
import mysql.connector
from mysql.connector import Error
import random
from dotenv import load_dotenv

# .envファイルの内容を読み込み
load_dotenv()

API_KEY=os.environ['GEMINI_APIKEY']
genai.configure(api_key=API_KEY)

# タグを生成する関数
def image_recognition():

    # 画像保存
    file_path = "img/image3.jpg" 
    
    # 生成するタグの数を指定
    tag_count = 10

    # url = input('URL: ') # URLを入力

    # urllib.request.urlretrieve(url, file_path)

    file = genai.upload_file(
        path=file_path,
        display_name="image"
    )

    # モデル準備
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

    response = model.generate_content(
        [    
            f"この画像に対して{tag_count}個のタグを以下の例のように付けてください。ただし空白は含めないでください。tag1,tag2,tag3,tag4", 
            file
        ]
    )

    # 出力結果をリストに収納　ｰ>　リストを更にリストに収納
    tags_str = response.text
    # print(f'tag: {tag}')
    return tags_str

    #保存した画像を削除
    # target_dir = 'img'
    # shutil.rmtree(target_dir)
    # os.mkdir(target_dir)


tags_str = image_recognition()


def generate_id(length=36):
    # ランダムな数字列を生成する
    random_id = "".join([str(random.randint(0, 9)) for _ in range(length)])
    return random_id
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
        lost_item_name = 'add_tag_test'
        latitude = None
        longitude = None
        time = None
        id = generate_id()
        tags = image_recognition()
        # SQL INSERT文
        insert_query = '''
        INSERT INTO lost_item (id, name, latitude, longitude, time, tags)
        VALUES (%s, %s, %s, %s, %s,%s)
        '''
        data = (id, lost_item_name, latitude, longitude, time, tags)
        # クエリの実行
        cursor.execute(insert_query, data)
        connection.commit()  # トランザクションのコミット
        print('データがデータベースに挿入されました')
              
except Error as e:
    print('エラーが発生しました:', e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print('MySQL接続は閉じられました')