import { useState } from "react";

const useSearch = () => {
  // jsonの形式に合わせる
  const [lostItemList, setLostItemList] = useState([]);
  const fetchData = async (keyword) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 他に必要なヘッダーがあれば追加する
        },
        body: JSON.stringify(
          // 送信するデータをjson形式に変換する
          {
            keyword: keyword,
          }
        ),
      });
      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }
      const responseData = await response.json();
      console.log(responseData);

      responseData.forEach((item) => {
        // 緯度経度を数字に直す
        item.latitude = Number(item.latitude);
        item.longitude = Number(item.longitude);

        // タグを配列に直す
        item.tags = item.tags.split(",");

        // 日付を整形する
        const date = new Date(item.time - 32400000); // 日本時間に合わせる
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        item.time = `${year}/${month}/${day} ${hours}:${("0" + minutes).slice(
          -2
        )}`;
      });

      setLostItemList(responseData);
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return [lostItemList, { fetchData }];
};

export default useSearch;
