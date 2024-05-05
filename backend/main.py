from flask import Flask, request, jsonify
from serchdata import search_mysql  # search_mysql �֐����C���|�[�g����p�X���m�F


app = Flask(__name__)

@app.route('/')
def hello():
    hello = "Hello world"
    return hello

@app.route('/search', methods=['GET'])  # 正しいエンドポイント名とメソッドを指定
def search():
    keyword = request.args.get('keyword')  # クエリパラメータから keyword を取得
    if not keyword:
        return jsonify({'error': 'No keyword provided'}), 400  # キーワードがない場合はエラーメッセージを返す
    
    try:
        # search_mysql 関数を呼び出して DataFrame を取得
        df = search_mysql(keyword)
        # DataFrame を JSON 形式に変換
        result = df.to_dict(orient='records')  # レコードごとに辞書形式で出力
        return jsonify(result)  # JSON 形式で結果を返す
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 予期せぬエラーが発生した場合


if __name__ == "__main__":
    app.run()