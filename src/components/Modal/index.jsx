// Librarys
import { memo } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

// Constants
import { TIMES_ICON } from "../../assets/data/constants";

// Styles
import "./styles.css";

function CustomModal({ show, onHide, children, centered, className }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered={centered}
      className={className}
    >
      <div className="d-flex justify-content-end close-modal">
        <img
          role="button"
          width={8}
          height={8}
          src={TIMES_ICON}
          alt="modal-close-icon"
          onClick={onHide}
        />
      </div>

      <div className="content">{children}</div>
    </Modal>
  );
}

CustomModal.propTypes = {
  centered: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default memo(CustomModal, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
  );
});
