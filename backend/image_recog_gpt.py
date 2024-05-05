from openai import OpenAI
import openai
import os
from dotenv import load_dotenv

#ChatGPTを使いタグを生成

openai.api_key = os.environ['CHATGPT_APIKEY']
client = OpenAI()

prompt = "この画像に対してタグ付けを行ってください。出力は半角のコンマ区切りで行ったください。ただし空白は入れないでください。"
image_url = "https://www.kamada.co.jp/storage/images/cfiles/121/mX8THkcauOjgn9HLGxPRyafYI0tO1IqmMySlcaTe_1024.jpg"
messages = [
    {
        "role": "user",
        "content": [
            {"type": "text", "text": prompt},
            {
                "type": "image_url",
                "image_url": image_url,
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
tags_list =  response.choices[0].message.content.split(',')
print(tags_list)
