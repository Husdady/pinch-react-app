// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";

// Styles
import "./styles.css";

function ModalDisconnectCalendar({
  show,
  onHideModal,
  disconnecting,
  disconnectToGoogleCalendar,
}) {
  return (
    <Modal
      show={show}
      onHide={onHideModal}
      className="disconnect-calendar-modal"
    >
      <div className="mt-1 text-center">
        <b className="d-block disconnect-title mb-4">DISCONNECT</b>

        <span className="d-block message px-4">
          Are you sure you want to disconnect the calendar?
        </span>

        <div className="d-flex justify-content-center">
          <Button
            type="button"
            title="Confirm"
            id="btn-confirm-disconnect-calendar"
            className="d-block py-2 px-4 me-2"
            onClick={disconnectToGoogleCalendar}
            isLoading={disconnecting}
          />

          <Button
            type="button"
            title="Cancel"
            id="btn-cancel-disconnect-calendar"
            className="d-block py-2 px-4"
            onClick={onHideModal}
          />
        </div>
      </div>
    </Modal>
  );
}

ModalDisconnectCalendar.propTypes = {
  show: PropTypes.bool.isRequired,
  disconnecting: PropTypes.bool.isRequired,
  onHideModal: PropTypes.func.isRequired,
  disconnectToGoogleCalendar: PropTypes.func.isRequired,
};

export default memo(ModalDisconnectCalendar, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.disconnecting === nextProps.disconnecting
  );
});
