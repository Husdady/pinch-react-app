// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Modal from "../../../../components/Modal";

// Constants
import { CALENDAR_CHECK_ICON } from "../../../../assets/data/constants";

// Styles
import "./styles.css";

function ModalAppointmentCreated({ show, onHideModal }) {
  return (
    <Modal show={show} onHide={onHideModal} className="appointment-created">
      <img
        src={CALENDAR_CHECK_ICON}
        alt="calendar-check-icon"
        className="d-block mx-auto mb-3"
      />

      <b className="message text-center d-block">
        Thank you, your appointments have already been created and scheduled,
        you can see your created appointment in your appointment list
      </b>

      <button
        type="button"
        id="btn-close-modal"
        className="d-block mx-auto"
        onClick={onHideModal}
      >
        Close
      </button>
    </Modal>
  );
}

ModalAppointmentCreated.propTypes = {
  show: PropTypes.bool.isRequired,
  onHideModal: PropTypes.func.isRequired,
};

export default memo(ModalAppointmentCreated, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show;
});
