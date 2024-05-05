import { useState, useEffect } from "react";

const useLostItem = (formData) => {
  // jsonの形式に合わせる
  const { name, place, detail, picture } = formData;
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // 緯度経度の取得
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error);
            alert("位置情報が取得できませんでした");
          }
        );
      } else {
        alert("位置情報が取得できませんでした");
      }
    };

    getLocation();
  }, []);

  const postData = async (url) => {
    try {
      const response = await fetch(url, {
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
            latitude: position.lat,
            longitude: position.lng,
            time: new Date(),
          }
        ),
      });
      if (!response.ok) {
        throw new Error("Failed to post data");
      }
      const responseData = await response.json();
      setData(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, data, postData };
};

export default useLostItem;
