// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Modal from "../../../../components/Modal";

// Constants
import { GOOGLE_CALENDAR_ICON } from "../../../../assets/data/constants";

// Styles
import "./styles.css";
import Button from "../../../../components/Button";

function ModalConnectCalendar({
  show,
  onHideModal,
  connecting,
  connectToGoogleCalendar,
}) {
  return (
    <Modal className="connect-calendar-modal" show={show} onHide={onHideModal}>
      <div className="pt-2 text-center">
        <b className="d-block connect-calendar-title">CONNECT CALENDAR</b>

        <img
          alt="calendar-check-icon"
          className="d-block mx-auto mb-2"
          src={GOOGLE_CALENDAR_ICON}
        />

        <b className="d-block google-calendar-title">Google Calendar</b>

        <Button
          type="button"
          title="Connect"
          id="btn-connect-calendar"
          className="d-block mx-auto py-2 px-4"
          isLoading={connecting}
          onClick={connectToGoogleCalendar}
        />
      </div>
    </Modal>
  );
}

ModalConnectCalendar.propTypes = {
  show: PropTypes.bool.isRequired,
  connecting: PropTypes.bool.isRequired,
  onHideModal: PropTypes.func.isRequired,
  connectToGoogleCalendar: PropTypes.func.isRequired,
};

export default memo(ModalConnectCalendar, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.connecting === nextProps.connecting
  );
});
