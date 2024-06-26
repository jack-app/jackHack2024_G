import { useEffect, useState } from "react";
import Map from "./Map";
import "../styles/Top.css";
import CirclarButton from "@common/components/CirclarButton";
import DisabledCirclarButton from "@common/components/DisabledCirclarButton";
import LostFormModal from "./LostFormModal";
import useSearch from "../hooks/useSearch";

const Top = () => {
  const [isLostFormOpen, setIsLostFormOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [lostItemList, { fetchData }] = useSearch(keyword);
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
        <h1 className="heading luckiest-guy">Lost Navi</h1>
      </div>
      <div className="search-form-container field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="キーワードを入力してください"
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
      <div className="columns" style={{ height: "70vh" }}>
        <div className="column is-10">
          <Map items={lostItemList} fetchData={() => fetchData(keyword)} />
        </div>
        <div className="column is-2 button-container" style={{ margin: "1em" }}>
          <DisabledCirclarButton
            icon="star"
            onClick={() => {
              window.alert("まだ解放されていないようだ...");
            }}
          />
          <DisabledCirclarButton
            icon="question"
            onClick={() => {
              window.alert("まだ解放されていないようだ...");
            }}
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
        onClose={() => {
          setIsLostFormOpen(false);
          fetchData(keyword);
        }}
      />
    </>
  );
};

export default Top;
