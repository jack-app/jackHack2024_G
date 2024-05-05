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
        {items.map(
          (item) => (
            console.log(item),
            (
              <MarkerF
                key={item.id}
                position={{ lat: item.latitude, lng: item.longitude }}
              >
                <InfoWindowF
                  position={{ lat: item.latitude, lng: item.longitude }}
                >
                  <div>hello</div>
                </InfoWindowF>
              </MarkerF>
            )
          )
        )}
      </GoogleMap>
    </LoadScript>
  );
};

Map.propTypes = {
  items: propTypes.array.isRequired,
};

export default Map;
