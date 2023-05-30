// Librarys
import PropTypes from "prop-types";
import { memo, Fragment } from "react";

// Components
import CalendarModal from "./CalendarModal";
import AppointmentsScheduled from "./AppointmentsScheduled";

// Hooks
import useMultipleDays from "./useMultipleDays";

// Services
import ApiProfile from "../../../../../../services/ApiProfile";

// Constants
import { CALENDAR_ICON } from "../../../../../../assets/data/constants";

// Styles
import "./styles.css";

function MultipleDays({
  api,
  timeId,
  timeOptions,
  appointment,
  appointments,
  updateDate,
  updateDayAndMonth,
  onChangeTime,
  setAppointments,
  reloadSchedule,
  setReloadSchedule,
  removeAppointmentById,
}) {
  const {
    show,
    showModal,
    hideModal,
    schedule,
    isFetching,
    isSuccesfully,
    validAppointments,
  } = useMultipleDays({
    api: api,
    appointments: appointments,
    reloadSchedule: reloadSchedule,
    setReloadSchedule: setReloadSchedule,
  });

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

      {!isFetching && isSuccesfully && validAppointments > 0 && (
        <AppointmentsScheduled
          appointments={appointments}
          removeAppointmentById={removeAppointmentById}
        />
      )}

      {!isFetching && (
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
          updateDayAndMonth={updateDayAndMonth}
          updateDate={updateDate}
        />
      )}
    </Fragment>
  );
}

MultipleDays.propTypes = {
  api: PropTypes.instanceOf(ApiProfile).isRequired,
  timeId: PropTypes.string.isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  appointment: PropTypes.object.isRequired,
  updateDate: PropTypes.func.isRequired,
  updateDayAndMonth: PropTypes.func.isRequired,
  setAppointments: PropTypes.func.isRequired,
  removeAppointmentById: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
};

export default memo(MultipleDays, (prevProps, nextProps) => {
  return (
    prevProps.timeId === nextProps.timeId &&
    prevProps.appointment === nextProps.appointment &&
    prevProps.appointments === nextProps.appointments &&
    prevProps.timeOptions === nextProps.timeOptions &&
    prevProps.reloadSchedule === nextProps.reloadSchedule
  );
});
