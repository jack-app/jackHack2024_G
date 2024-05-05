import folium
from getdatabase import get_data

# データの取得
df = get_data()

# 地図の初期化
initial_location = [df.loc[0, 'latitude'], df.loc[0, 'longitude']] 
map = folium.Map(location=initial_location, zoom_start=15)

# データフレームの各行に対して処理
for index, row in df.iterrows():
    folium.Marker(
        location=(row['latitude'], row['longitude']),
        popup=row['lost_item_name']
    ).add_to(map)

# 地図を HTML ファイルとして保存
map.save("map.html")