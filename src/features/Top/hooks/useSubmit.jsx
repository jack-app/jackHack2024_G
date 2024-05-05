import { useState, useEffect } from "react";
import usePosition from "../../../common/hooks/usePosition";

const addItem = async (formData) => {
  // jsonの形式に合わせる
  const { name, place, detail, picture } = formData;
  const [position, { getPosition }] = usePosition();
  useEffect(() => {
    getPosition();
  }, []);
  const postData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 他に必要なヘッダーがあれば追加する
        },
        body: JSON.stringify(
          // 送信するデータをjson形式に変換する
          {
            name: name,
            place: place,
            detail: detail,
            picture: picture,
            latitude: position.latitude,
            longitude: position.longitude,
            time: new Date(),
          }
        ),
      });
      if (!response.ok) {
        throw new Error("Failed to post data");
      }
    } catch (error) {
      console.log(error.messege);
    }
  };

  return [{ postData }];
};

export default addItem;
