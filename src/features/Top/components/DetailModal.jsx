import propTypes from "prop-types";

const DetailModal = (props) => {
  const { open, onClose, onSubmit, item } = props;

  const handleCollect = (id) => {
    if (confirm("本当に回収しましたか？")) {
      onSubmit(id);
      onClose();
    }
  };

  return (
    <div
      id="modal-id"
      className={`modal model-fx-normal ${open === true ? "is-active" : ""}`}
    >
      <div className="modal-background" onClick={() => onClose()}></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <div className="columns">
            <div className="column">
              <img
                src={`data:image/png;base64,${item.photo_path}`}
                width="200"
                height="200"
                alt="落とし物画像"
                className="pin-image"
              />
            </div>
            <div className="column">
              <h1 className="pin-text">落とし物</h1>
              <h2 className="pin-info">{item.name}</h2>
              <h1 className="pin-text">発見場所</h1>
              <h2 className="pin-info">{item.place}</h2>
              <h1 className="pin-text">発見時刻</h1>
              <h2 className="pin-info">~ここに日時が入る~</h2>
              <h1 className="pin-text">詳細</h1>
              <h2 className="pin-info">{item.detail}</h2>
              <h2 className="tag-info">{item.tag}</h2>
              <h2 className="tag-info">
                {item.tags.map((tag) => (
                  <span className="pin-tags">{tag}</span>
                ))}
              </h2>
            </div>
          </div>
          <div>
            <button className="button" onClick={() => handleCollect(item.id)}>
              回収しました
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

DetailModal.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
};

export default DetailModal;
