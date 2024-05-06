import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import propTypes from "prop-types";
import "../styles/pin.css";
import DetailModal from "./DetailModal";

// 名古屋大学の緯度、経度
const defaultLatLng = {
  lat: 35.15396053659968,
  lng: 136.96864789075318,
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = React.memo(function MapMemo(props) {
  const { items, fetchData } = props;
  const [open, setOpen] = useState(Array(items.length).fill(false));
  const [detailVisible, setDetailVisible] = useState(
    Array(items.length).fill(false)
  );
  // useEffect(() => {
  //   setOpen(Array(items.length).fill(false));
  //   // setDetailVisible(Array(items.length).fill(true));
  // }, [items]);
  const handleOpen = (index) => {
    const newOpen = [...open];
    newOpen[index] = true;
    setOpen(newOpen);
  };
  const handleClose = (index) => {
    const newOpen = [...open];
    newOpen[index] = false;
    setOpen(newOpen);
  };
  const handleDetailOpen = (index) => {
    const newDetailVisible = [...detailVisible];
    newDetailVisible[index] = !newDetailVisible[index];
    setDetailVisible(newDetailVisible);
  };
  const handleDetailClose = (index) => {
    const newDetailVisible = [...detailVisible];
    newDetailVisible[index] = false;
    setDetailVisible(newDetailVisible);
  };
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        center={defaultLatLng}
        zoom={14}
        mapContainerStyle={containerStyle}
      >
        {items.map((item, index) => (
          <>
            <div key={item.id} onClick={() => handleOpen(index)}>
              <MarkerF
                position={{ lat: item.latitude, lng: item.longitude }}
                onClick={() => handleDetailOpen(index)}
              >
                {detailVisible[index] && (
                  <InfoWindowF
                    position={{ lat: item.latitude, lng: item.longitude }}
                    onCloseClick={() => handleDetailClose(index)}
                  >
                    <div>
                      <img
                        src={`data:image/png;base64,${item.photo_path}`}
                        width="200"
                        height="200"
                        alt="落とし物画像"
                        className="pin-image"
                      />
                      <h1 className="pin-text">落とし物</h1>
                      <h2 className="pin-info">{item.name}</h2>
                      <h1 className="pin-text">発見場所</h1>
                      <h2 className="pin-info">{item.place}</h2>
                      <h1 className="pin-text">発見時刻</h1>
                      <h2 className="pin-info">{item.time}</h2>
                      <h1 className="pin-text">詳細</h1>
                      <h2 className="pin-info">{item.detail}</h2>
                      <h2 className="tag-info">
                        {item.tags.map((tag, index) => (
                          <span key={`tag-${index}`} className="pin-tags">
                            {tag}
                          </span>
                        ))}
                      </h2>
                      {/* <h2 className="tag-info">{item.tag}</h2> */}
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            </div>
            <DetailModal
              open={open[index]}
              onClose={() => {
                handleClose(index);
                fetchData();
              }}
              // onSubmit={() => fetchData()}
              item={item}
            />
          </>
        ))}
      </GoogleMap>
    </LoadScript>
  );
});

Map.propTypes = {
  items: propTypes.array.isRequired,
  fetchData: propTypes.func.isRequired,
};

export default Map;
