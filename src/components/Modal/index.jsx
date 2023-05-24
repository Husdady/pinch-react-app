// Librarys
import { memo } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

// Constants
import { CLOSE_ICON } from "./constants";

// Styles
import "./styles.css";

function CustomModal({ show, onHide, children, className }) {
  return (
    <Modal show={show} onHide={onHide} className={className}>
      <div className="d-flex justify-content-end">
        <img
          role="button"
          width={8}
          height={8}
          src={CLOSE_ICON}
          alt="modal-close-icon"
          onClick={onHide}
        />
      </div>

      <div className="content">{children}</div>
    </Modal>
  );
}

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default memo(CustomModal, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show;
});