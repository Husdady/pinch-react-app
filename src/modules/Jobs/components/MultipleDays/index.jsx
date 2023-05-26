// Librarys
import PropTypes from "prop-types";
import { memo, Fragment } from "react";

// Components
import CalendarModal from "../CalendarModal";
import AppointmentsScheduled from "./AppointmentsScheduled";

// Hooks
import useMultipleDays from "./useMultipleDays";

// Constants
import { CALENDAR_ICON } from "../../../../assets/data/constants";

// Styles
import "./styles.css";

function MultipleDays({
  timeId,
  timeOptions,
  appointment,
  appointments,
  updateDate,
  onChangeTime,
  setAppointments,
  removeAppointmentById,
}) {
  const { show, showModal, hideModal, schedule, isFetching, isSuccesfully } =
    useMultipleDays();

  return (
    <Fragment>
      <div className="multiple-days">
        {isFetching && (
          <div className="skeleton-animation btn-calendar-animation"></div>
        )}

        {!isFetching && isSuccesfully && (
          <button
            type="button"
            id="btn-calendar"
            className="py-2 px-3"
            onClick={showModal}
          >
            <img src={CALENDAR_ICON} alt="calendar-icon" />
            <span className="ms-2">Calendar</span>
          </button>
        )}
      </div>

      {!isFetching && isSuccesfully && appointments.length > 0 && (
        <AppointmentsScheduled appointments={appointments} />
      )}

      <CalendarModal
        show={show}
        onHide={hideModal}
        timeId={timeId}
        schedule={schedule}
        appointment={appointment}
        timeOptions={timeOptions}
        appointmentsForm={appointments}
        onChangeTime={onChangeTime}
        setAppointments={setAppointments}
        removeAppointmentById={removeAppointmentById}
        updateDate={updateDate}
      />
    </Fragment>
  );
}

MultipleDays.propTypes = {
  timeId: PropTypes.string.isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  appointment: PropTypes.object.isRequired,
  updateDate: PropTypes.func.isRequired,
  setAppointments: PropTypes.func.isRequired,
  removeAppointmentById: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
};

export default memo(MultipleDays, (prevProps, nextProps) => {
  return (
    prevProps.timeId === nextProps.timeId &&
    prevProps.appointment === nextProps.appointment &&
    prevProps.appointments === nextProps.appointments &&
    prevProps.timeOptions === nextProps.timeOptions
  );
});
