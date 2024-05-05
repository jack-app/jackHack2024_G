import { useEffect, useState } from "react";
import Map from "./Map";
import "../styles/Top.css";
import CirclarButton from "@common/components/CirclarButton";
import LostFormModal from "./LostFormModal";
// import useSearch from "../hooks/useSearch";
// import { searchLostItem } from "../hooks/useSearch";
// import useLostItem from "../hooks/useLostItem";

const Top = () => {
  const [isLostFormOpen, setIsLostFormOpen] = useState(false);
  const [lostItemList, setLostItemList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (keyword) => {
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
      // 緯度経度を数字に直す
      responseData.forEach((item) => {
        item.latitude = Number(item.latitude);
        item.longitude = Number(item.longitude);
      });
      setLostItemList(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData(keyword);
  }, []);

  // キーワード検索
  const handleClick = async () => {
    fetchData(keyword);
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
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="control">
          <button
            className="button is-danger is-outlined"
            onClick={() => handleClick()}
          >
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
        onSubmit={() => console.log("submit")}
        loading={loading}
      />
    </>
  );
};

export default Top;