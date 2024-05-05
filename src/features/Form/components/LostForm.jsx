import { useState } from "react";
import propTypes from "prop-types";
import "../styles/LostForm.css";
import dummy_image from "../../../assets/no_image.png";

const LostForm = (props) => {
  const { onSubmit, loading, onClose } = props;
  const [previewImage, setPreviewImage] = useState(dummy_image);
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    detail: "",
    picture: "",
  });
  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, picture: reader.result }));
    };
  };
  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column is-8">
            <h1 className="form-title">落とし物追加フォーム</h1>
          </div>
          <div className="delete-button-container column">
            <button className="button luckiest-guy" onClick={() => onClose()}>
              x
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <div className="file center">
              <label className="file-label">
                <input
                  className="file-input"
                  accept="image/*"
                  type="file"
                  name="picture"
                  onChange={handleImage}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">画像を選択</span>
                </span>
              </label>
            </div>
            <div className="preview">
              <img
                className="preview-img"
                src={previewImage}
                alt="preview"
                height="200px"
                width="200px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="column is-6">
            <h2 className="info">落とし物</h2>
            <div className="field">
              <div className="control">
                <input
                  name="name"
                  onChange={handleFormData}
                  className="input"
                  type="text"
                />
              </div>
            </div>
            <h2 className="info">場所</h2>
            <div className="field">
              <div className="control">
                <input
                  name="place"
                  onChange={handleFormData}
                  className="input"
                  type="text"
                />
              </div>
            </div>
            <h2 className="info">詳細</h2>
            <div className="field">
              <div className="control">
                <input
                  name="detail"
                  onChange={handleFormData}
                  className="input"
                  type="text"
                />
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
  onClose: propTypes.func.isRequired,
};

export default LostForm;
