import propTypes from "prop-types";
import LostForm from "@features/Form/components/LostForm";

const LostFormModal = (props) => {
  const { open, onClose, onSubmit, loading } = props;

  return (
    <div
      id="modal-id"
      className={`modal model-fx-normal ${open === true ? "is-active" : ""}`}
    >
      <div className="modal-background" onClick={() => onClose()}></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <LostForm
            onClose={() => onClose()}
            onSubmit={onSubmit}
            loading={loading}
          />
        </section>
      </div>
    </div>
  );
};

LostFormModal.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};

export default LostFormModal;
