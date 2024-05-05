from flask import Flask, request, jsonify
from serchdata import search_mysql  # search_mysql ?��֐�?��?��?��C?��?��?��|?��[?��g?��?��?��?��p?��X?��?��?��m?��F
from insertdb import save_mysql
from flask_cors import CORS
from delete_data import delete_data
from serchdata import search_mysql
from insertdb import save_mysql

app = Flask(__name__)

@app.route('/')
def hello():
    hello = "Hello world"
    return hello

@app.route('/search', methods=['GET','POST'])  # 正しいエンド�?�イント名とメソ�?ドを�?�?
def search():
    data = request.get_json()
    keyword = data['keyword']
    print(keyword)
    if keyword == None:
        return jsonify({'error': 'No keyword provided'}), 400  # キーワードがな�?場合�?�エラーメ�?セージを返す
    try:
        # search_mysql 関数を呼び出して DataFrame を取�?
        df = search_mysql(keyword)
        return df
        # # DataFrame �? JSON 形式に変換
        # result = df.to_dict(orient='records')  # レコードごとに辞書形式で出�?
        # print(result)
        # return jsonify(result)  # JSON 形式で結果を返す
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 予期せぬエラーが発生した�?��?
    
@app.route('/insert',methos = ['GET'])
def insert():
    data = request.get_json()
    name = data['name']
    latitude = data['latitude']
    longitude = data['longitude']
    base64_string = data['base64_string']
    detail = data['detail']
    save_mysql(name,latitude,longitude,base64_string,detail)
    
@app.route('/delete',methos = ['GET'])
def delete():
    data = request.get_json()
    id = data['id']
    delete_data(id)

@app.route('/insert', methods = ['GET', 'POST'])
def insert():
    data = request.get_json()
    name = data['name']
    latitude = str(data['latitude'])
    longitude = str(data['longitude'])
    base64_string = data['picture']
    detail = data['detail']
    place = data['place']
    print(name, latitude, longitude,  detail, place)
    try:
        save_mysql(name, latitude, longitude, base64_string, detail, place)
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 予期せぬエラーが発生した場合

if __name__ == "__main__":
    app.run()