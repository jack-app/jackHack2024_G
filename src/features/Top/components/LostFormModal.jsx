import { useState } from "react";
import propTypes from "prop-types";
import { MagnifyingGlass } from "react-loader-spinner";

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
        <div className="modal-card">
          <section className="modal-card-body">
            <LostForm onClose={() => onClose()} setLoading={setLoading} />
          </section>
        </div>
      </div>
      {loading && (
        <>
          <div className="loading-over-lay"></div>
          <div className="loading">
            <MagnifyingGlass />
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
