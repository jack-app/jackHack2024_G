import { useState, useEffect } from "react";

const useSearch = (keyword) => {
  // jsonの形式に合わせる
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const searchData = async (keyword) => {
    try {
      const response = await fetch(URL, {
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
      setData(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, data };
};

export default useSearch;
