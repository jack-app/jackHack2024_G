import base64
import random
import os

def generate_id(length=36):
    # ランダムな数字列を生成する
    random_id = ''.join([str(random.randint(0, 9)) for _ in range(length)])
    return random_id

def image_file_to_base64(file_path, output_file_path):
    # ファイルをバイナリモードで読み込む
    with open(file_path, "rb") as image_file:
        data = base64.b64encode(image_file.read())

    # Base64エンコードされたデータをテキストファイルに書き込む
    with open(output_file_path, "w") as text_file:
        text_file.write(data.decode('utf-8'))

def convert_base64_to_image(base64_string, directory="photo-folder"):
    # ランダムなIDを生成してファイル名として使用
    image_filename = generate_id() + ".jpg"
    image_path = os.path.join(directory, image_filename)

    # ディレクトリが存在しなければ作成
    if not os.path.exists(directory):
        os.makedirs(directory)

    # Base64エンコードされたデータをデコードする
    base64_string = base64_string.split(",")[-1]
    image_data = base64.b64decode(base64_string)
    
    # デコードされた画像データをファイルに書き込む
    with open(image_path, "wb") as image_file:
        image_file.write(image_data)
    
    return image_path  # 生成した画像のパスを返す

def image_file_to_base64(file_path):
    # ファイルをバイナリモードで読み込む
    with open(file_path, "rb") as image_file:
        data = base64.b64encode(image_file.read())
    return data