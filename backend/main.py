from flask import Flask
from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS

from serchdata import search_mysql
from insertdb import save_mysql
from delete_data import delete_data
from increment_like_count import increment_like_count


app = Flask(__name__)
CORS(app) #Cross Origin Resource Sharing

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
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 予期せぬエラーが発生した�?��?

    
@app.route('/delete',methods = ['GET', 'POST'])
def delete():
    data = request.get_json()
    id = data['id']
    try:
        delete_data(id)
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 予期せぬエラーが発生した場合

@app.route('/insert', methods = ['GET', 'POST'])
def insert():
    data = request.get_json()
    name = data['name']
    latitude = str(data['latitude'])
    longitude = str(data['longitude'])
    base64_string = data['picture']
    detail = data['detail']
    place = data['place']
    try:
        save_mysql(name, latitude, longitude, base64_string, detail, place)
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 予期せぬエラーが発生した場合
    
@app.route('/like_count',methods = ['GET', 'POST'])
def like_count():
    data = request.get_json()
    id = data['id']
    try:
        increment_like_count(id)
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 予期せぬエラーが発生した場合







if __name__ == "__main__":
    app.run()