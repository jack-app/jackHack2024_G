import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// 名古屋大学の緯度、経度
const defaultLatLng = {
  lat: 35.15396053659968,
  lng: 136.96864789075318,
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        center={defaultLatLng}
        zoom={10}
        mapContainerStyle={containerStyle}
      ></GoogleMap>
    </LoadScript>
  );
};

export default Map;
