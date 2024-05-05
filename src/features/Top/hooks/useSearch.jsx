import { useState, useEffect } from "react";

const searchLostItem = (keyword) => {
  // jsonの形式に合わせる
  const [data, setData] = useState(null);
  const searchData = async () => {
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
      setData(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };
  searchData();
};

export default searchLostItem;
