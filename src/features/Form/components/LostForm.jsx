import { useEffect, useState } from "react";
import propTypes from "prop-types";
import "../styles/LostForm.css";
import dummy_image from "../../../assets/no_image.png";
import usePosition from "@common/hooks/usePosition";

const LostForm = (props) => {
  const { onClose, setLoading } = props;
  const [previewImage, setPreviewImage] = useState(dummy_image);
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    detail: "",
    picture: "",
  });
  const [position, { getPosition }] = usePosition();
  useEffect(() => {
    getPosition();
  }, []);
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

  const insertData = async (formData) => {
    setLoading(true);
    try {
      console.log(formData);
      console.log(position);
      const response = await fetch("http://127.0.0.1:5000/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 他に必要なヘッダーがあれば追加する
        },
        body: JSON.stringify(
          // 送信するデータをjson形式に変換する
          {
            name: formData.name,
            place: formData.place,
            detail: formData.detail,
            picture: formData.picture,
            latitude: position.latitude,
            longitude: position.longitude,
          }
        ),
      });
      if (!response.ok) {
        throw new Error("Failed to post data");
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
    onClose();
  };
  return (
    <>
      <div className="container lost-form-container">
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
          <div
            className="column is-6 has-text-centered"
            style={{ textAlignLast: "center" }}
          >
            <div className="file">
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
            <div>
              <button className="button" onClick={() => insertData(formData)}>
                送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LostForm.propTypes = {
  onClose: propTypes.func.isRequired,
  setLoading: propTypes.func.isRequired,
};

export default LostForm;
