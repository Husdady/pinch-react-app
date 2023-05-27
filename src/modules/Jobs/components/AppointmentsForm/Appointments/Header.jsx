// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Button from "../../../../../components/Button";
import Select from "../../../../../components/Select";
import ModalConnectCalendar from "../../ModalConnectCalendar";
import ModalDisconnectCalendar from "../../ModalDisconnectCalendar";

// Hooks
import useConnectCalendar from "./useConnectCalendar";

// Utils
import classnames from "../../../../../utils/classnames";

// Constants
import { filterAppointmentStatus } from "./constants";
import {
  CALENDAR_ICON,
  SMALL_GOOGLE_CALENDAR_ICON,
} from "../../../../../assets/data/constants";

function AppointmentsHeader({
  isFetching,
  isSuccesfully,
  filterActivated,
  filterAppointmentsByStatus,
  backupAppointments,
}) {
  const {
    connected,
    connecting,
    disconnecting,
    connectToGoogleCalendar,
    disconnectToGoogleCalendar,
    showConnectionCalendarModal,
    hideConnectCalendarModal,
    hideDisconnectCalendarModal,
    showingConnectCalendarModal,
    showingDisconnectCalendarModal,
  } = useConnectCalendar();

  return (
    <section className="appointments-header d-flex">
      <div className="appointments-wrapper d-flex align-items-center px-4">
        <span className="text-uppercase">APPOINTMENTS</span>

        {isFetching && (
          <div className="skeleton-animation appointments-filter-by-status"></div>
        )}

        {!isFetching && isSuccesfully && (
          <Select
            noSelectionLabel="All"
            className="appointments-filter-by-status"
            selectedValue={filterActivated}
            options={filterAppointmentStatus}
            onChange={filterAppointmentsByStatus}
            arrayDeps={backupAppointments}
          />
        )}
      </div>

      <Button
        type="button"
        disabled={isFetching}
        onClick={showConnectionCalendarModal}
        title={
          isFetching
            ? "Check connection..."
            : connected
            ? "Connected with"
            : "Connect"
        }
        className={classnames([
          "connect d-flex align-items-center px-3 flex-row-reverse",
          isFetching ? "checking-connection" : null,
          connected ? "connected" : null,
          !isSuccesfully ? "justify-content-center" : "justify-content-between",
        ])}
        icon={
          !isFetching &&
          isSuccesfully && (
            <img
              className="ms-1"
              alt={connected ? "calendar-connected" : "calendar-disconnected"}
              src={connected ? SMALL_GOOGLE_CALENDAR_ICON : CALENDAR_ICON}
            />
          )
        }
      />

      <ModalConnectCalendar
        show={showingConnectCalendarModal}
        onHideModal={hideConnectCalendarModal}
        connectToGoogleCalendar={connectToGoogleCalendar}
        connecting={connecting}
      />

      <ModalDisconnectCalendar
        show={showingDisconnectCalendarModal}
        onHideModal={hideDisconnectCalendarModal}
        disconnectToGoogleCalendar={disconnectToGoogleCalendar}
        disconnecting={disconnecting}
      />
    </section>
  );
}

AppointmentsHeader.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  filterActivated: PropTypes.string.isRequired,
  filterAppointmentsByStatus: PropTypes.func.isRequired,
  backupAppointments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(AppointmentsHeader, (prevProps, nextProps) => {
  return (
    prevProps.isFetching === nextProps.isFetching &&
    prevProps.isSuccesfully === nextProps.isSuccesfully &&
    prevProps.filterActivated === nextProps.filterActivated &&
    prevProps.backupAppointments === nextProps.backupAppointments
  );
});
