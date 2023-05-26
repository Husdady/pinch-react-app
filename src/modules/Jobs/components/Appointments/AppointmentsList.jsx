// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Appointment from "./Appointment";

function AppointmentsList({ isError, isFetching, appointments }) {
  if (isFetching) return <p>Loading...</p>;
  if (isError) return <p>Error to show appointments</p>;

  if (appointments.length === 0) {
    return <span>Appointments not found</span>;
  }

  return (
    <div className="appointments-registered">
      <ul className="appointments-list list-unstyled mb-0">
        {appointments.map((appointment) => (
          <li key={appointment._id} className="appointment px-3">
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
