import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import propTypes from "prop-types";

// 名古屋大学の緯度、経度
const defaultLatLng = {
  lat: 35.15396053659968,
  lng: 136.96864789075318,
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = (props) => {
  const { items } = props;
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        center={defaultLatLng}
        zoom={10}
        mapContainerStyle={containerStyle}
      >
        {items.map((item) => (
          <MarkerF key={item.id} position={{ lat: item.lat, lng: item.lng}}>
            <InfoWindowF position={{ lat: item.lat, lng: item.lng}}>
              <div>
                <h1>落とし物</h1>
                <h2>{item.name}</h2>
                <h1>発見場所</h1>
                <h2>{item.place}</h2>
                <h1>発見時刻</h1>
                <h2>~ここに日時が入る~</h2>
                <h1>詳細</h1>
                <h2>{item.detail}</h2>
                <h2>{item.tags}</h2>
              </div>
            </InfoWindowF>
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

Map.propTypes = {
  items: propTypes.array.isRequired,
};

export default Map;
