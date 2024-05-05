from openai import OpenAI
import openai
import os
from dotenv import load_dotenv

# # .envファイルの内容を読み込み
# load_dotenv()
# #ChatGPTを使いタグを生成

# # 環境変数からAPIキーを取得
# api_key = os.getenv('CHATGPT_APIKEY')
# # OpenAIクライアントの初期化
# client = OpenAI(api_key=api_key)

# prompt = "この画像に対してタグ付けを行ってください。出力は半角のコンマ区切りで行ったください。ただし空白は入れないでください。"
# image_path = "./photo-folder/IMG_2275.jpg"
# messages = [
#     {
#         "role": "user",
#         "content": [
#             {"type": "text", "text": prompt},
#             {
#                 "type": "image_url",
#                 "image_url": image_path,
#             },
#         ],
#     }
# ]

# response = client.chat.completions.create(
#     model='gpt-4-vision-preview',
#     messages=messages,
#     max_tokens=500,
# )

# print(response.choices[0].message.content)
# tags_list =  response.choices[0].message.content.split(',')
# print(tags_list)

def gpt_tag(base64_string):
    # .envファイルの内容を読み込み
    load_dotenv()
    #ChatGPTを使いタグを生成

    # 環境変数からAPIキーを取得
    api_key = os.getenv('CHATGPT_APIKEY')
    # OpenAIクライアントの初期化
    client = OpenAI(api_key=api_key)

    prompt = "この画像に対してタグ付けを行ってください。出力は半角のコンマ区切りで行ったください。ただし空白は入れないでください。"
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {
                    "type": "image_url",
                    "image_url": f"data:image/jpeg;base64,{base64_string}"
                },
            ],
        }
    ]

    response = client.chat.completions.create(
        model='gpt-4-vision-preview',
        messages=messages,
        max_tokens=500,
    )
    print(response.choices[0].message.content)
    return response.choices[0].message.content

def read_base64_from_file(file_path):
    with open(file_path, 'r') as file:
        return file.read().strip()
    
path = 'output.txt'

txt = read_base64_from_file(path)

gpt_tag(txt)

