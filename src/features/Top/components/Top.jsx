import { useState } from "react";
import Map from "./Map";
import "../styles/Top.css";
import CirclarButton from "@common/components/CirclarButton";
import LostFormModal from "./LostFormModal";
// import useLostItem from "../hooks/useLostItem";

const tmpItemList = [
  {
    id: 1,
    lat: 35.15396053659968,
    lng: 136.96864789075318,
    picture: "https://japaclip.com/files/long-wallet-bills.png",
    name: "財布",
    place: "名大図書館前",
    detail: "犬のストラップがついている",
    tags: ["赤い","財布","革","四角","古い"],

  }
];

const Top = () => {
  const [isLostFormOpen, setIsLostFormOpen] = useState(false);
  const [lostItemList, setLostItemList] = useState(tmpItemList);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (keyword) => {};

  // 追加
  const handleSubmit = async (formData) => {
    setLoading(true);
    const responceItemList = await useLostItem(formData);
    setLostItemList(responceItemList);
    setLoading(false);
    // POSTリクエスト後の処理をここに追加する
  };

  return (
    <>
      <div>
        <h1 className="heading luckiest-guy">LOST & FOUND</h1>
      </div>
      <div className="search-form-container field has-addons">
        <div className="control is-expanded">
          <input
            className="input luckiest-guy"
            type="text"
            placeholder="SEARCH"
          />
        </div>
        <div className="control">
          <button className="button is-danger is-outlined">
            <span>&nbsp;</span>
            <i className="fas fa-search"></i>
            <span>&nbsp;</span>
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-10">
          <Map items={lostItemList} />
        </div>
        <div className="column is-2 button-container" style={{ margin: "1em" }}>
          <CirclarButton
            color="#FFE127"
            icon="star"
            onClick={() => console.log("star")}
          />
          <CirclarButton
            color="#7181FF"
            icon="question"
            onClick={() => console.log("question")}
          />
          <CirclarButton
            color="#6FF75B"
            icon="plus"
            onClick={() => setIsLostFormOpen(true)}
          />
        </div>
      </div>

      <LostFormModal
        open={isLostFormOpen}
        onClose={() => setIsLostFormOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default Top;
