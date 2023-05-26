// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Appointment from "./Appointment";
import LoadingAppointments from "./LoadingAppointments";

function AppointmentsList({ isError, isFetching, appointments }) {
  if (isError) return <p>Error to show appointments</p>;

  if (!isFetching && appointments.length === 0) {
    return <span>Appointments not found</span>;
  }

  return (
    <div className="appointments-registered">
      <ul className="appointments-list list-unstyled mb-0">
        {isFetching && <LoadingAppointments />}

        {!isFetching &&
          appointments.map((appointment, i) => (
            <li key={appointment._id || i} className="appointment px-3">
              <Appointment {...appointment} />
            </li>
          ))}
      </ul>
    </div>
  );
}

AppointmentsList.propTypes = {
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(AppointmentsList, (prevProps, nextProps) => {
  return (
    prevProps.isError === nextProps.isError &&
    prevProps.isFetching === nextProps.isFetching &&
    prevProps.appointments === nextProps.appointments
  );
});
