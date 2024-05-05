import { useState } from "react";
import propTypes from "prop-types";
import "../styles/LostForm.css";

const LostForm = (props) => {
  const { onSubmit, loading } = props;
  const [formData, setFormData] = useState({
    // フォームデータの初期値を設定する
  });
  return (
    <>
      <div className="container">
        <h1 className="form-title">落とし物追加フォーム</h1>
        <div className="columns">
          <div className="column is-6">
            <div className="file">
              <label className="file-label">
                <input className="file-input" type="file" name="photo" />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">画像を選択</span>
                </span>
              </label>
            </div>
          </div>
          <div className="column is-6">
            <h2 className="info">LOST PROPERTY</h2>
            <div className="field">
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
            <h2 className="info">PLACE</h2>
            <div className="field">
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
            <h2 className="info">PIN COLOR</h2>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select>
                    <option>赤</option>
                    <option>黄</option>
                    <option>緑</option>
                    <option>青</option>
                    <option>桃</option>
                    <option>紫</option>
                  </select>
                </div>
              </div>
            </div>
            <h2 className="info">DETAIL</h2>
            <div className="field">
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LostForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};

export default LostForm;
