import { useState } from "react";
import propTypes from "prop-types";
import { InfinitySpin, MagnifyingGlass } from "react-loader-spinner";

import LostForm from "@features/Form/components/LostForm";

const LostFormModal = (props) => {
  const { open, onClose } = props;
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div
        id="modal-id"
        className={`modal model-fx-normal ${open === true ? "is-active" : ""}`}
      >
        <div className="modal-background" onClick={() => onClose()}></div>
        <div className="modal-card parent">
          <section className="modal-card-body nested">
            <LostForm onClose={() => onClose()} setLoading={setLoading} />
          </section>
        </div>
      </div>
      {loading && (
        <>
          <div className="loading-over-lay"></div>
          <div className="loading">
            <InfinitySpin color="#ffa2a2" />
            <div style={{ color: "#ffffff" }}>落とし物を追加中です...</div>
          </div>
        </>
      )}
    </>
  );
};

LostFormModal.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
};

export default LostFormModal;
