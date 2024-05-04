import Map from "./Map";
import "../styles/Top.css";
import CirclarButton from "@common/components/CirclarButton";

const Top = () => {
  return (
    <>
      <div>
        <h1 className="heading">LOST & FOUND</h1>
      </div>
      <div className="search-form-container field">
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="e.g smartphone" />
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-10">
          <Map />
        </div>
        <div className="column is-2 button-container" style={{ margin: "1em" }}>
          <CirclarButton color="#FFE127" icon="star" />
          <CirclarButton color="#7181FF" icon="question" />
          <CirclarButton color="#6FF75B" icon="plus" />
        </div>
      </div>
    </>
  );
};

export default Top;
