import propTypes from "prop-types";
import LostForm from "@features/Form/components/LostForm";

const LostFormModal = (props) => {
  const { open, onClose } = props;

  return (
    <div
      id="modal-id"
      className={`modal model-fx-normal ${open === true ? "is-active" : ""}`}
    >
      <div className="modal-background" onClick={() => onClose()}></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <div className="delete-button-container">
            <button className="luckiest-guy" onClick={() => onClose()}>
              x
            </button>
          </div>
          <LostForm />
        </section>
      </div>
    </div>
  );
};

LostFormModal.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func,
};

export default LostFormModal;
