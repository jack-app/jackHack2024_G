import { useState } from "react";

const usePosition = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  // 緯度経度の取得
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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
  return [position, { getPosition }];
};

export default usePosition;
