// Components
import Modal from "../../../../components/Modal";

// Constants
import { CALENDAR_CHECK_ICON } from "./constants";

// Styles
import "./styles.css";

export default function ModalAppointmentCreated() {
  return (
    <Modal className="appointment-created" show onHide={() => alert(2)}>
      <img src={CALENDAR_CHECK_ICON} alt="calendar-check-icon" className="d-block mx-auto mb-3" />

      <b className="message text-center d-block">
        Thank you, your appointments have already been created and scheduled,
        you can see your created appointment in your appointment list
      </b>

      <button id="btn-close-modal" className="d-block mx-auto">Close</button>
    </Modal>
  );
}
