// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Appointment from "./Appointment";
import LoadingAppointments from "./LoadingAppointments";

// Utils
import classnames from "../../../../../utils/classnames";

function AppointmentsList({
  isError,
  isFetching,
  isSuccesfully,
  appointments,
  currentClientId,
  updateAppointmentStatus,
}) {
  if (!isFetching && isError) return <p>Error to show appointments</p>;

  if (!isFetching && isSuccesfully && appointments.length === 0) {
    return <span>Appointments not found</span>;
  }

  return (
    <div className="appointments-registered">
      <ul className="appointments-list list-unstyled mb-0">
        {isFetching && <LoadingAppointments />}

        {!isFetching &&
          appointments.map((appointment, i) => (
            <li
              key={appointment._id || i}
              className={classnames([
                "appointment px-3",
                appointments.length <= 4 ? "to-top" : null,
              ])}
            >
              <Appointment
                {...appointment}
                currentClientId={currentClientId}
                updateAppointmentStatus={updateAppointmentStatus}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

AppointmentsList.propTypes = {
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSuccesfully: PropTypes.bool.isRequired,
  currentClientId: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateAppointmentStatus: PropTypes.func.isRequired,
};

export default memo(AppointmentsList, (prevProps, nextProps) => {
  return (
    prevProps.isError === nextProps.isError &&
    prevProps.isFetching === nextProps.isFetching &&
    prevProps.isSuccesfully === nextProps.isSuccesfully &&
    prevProps.appointments === nextProps.appointments &&
    prevProps.currentClientId === nextProps.currentClientId
  );
});
