// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Constnts
import { TIMES_CIRCLE_ICON } from "../../../../assets/data/constants";

function AppointmentsScheduled({ appointments, removeAppointmentById }) {
  return (
    <ul className="list-unstyled little-scrollbar appointments-scheduled m-0 mt-4">
      {appointments.map((appointment, i) => (
        <li key={appointment.id || i} className="appointment-scheduled d-flex align-items-center">
          <span className="appointment-time px-3 me-2 mt-2">
            {appointment.jobDate} | {appointment.timeLabel}
          </span>

          <img
            role="button"
            alt="close-circle-icon"
            src={TIMES_CIRCLE_ICON}
            onClick={() => removeAppointmentById(appointment.id)}
          />
        </li>
      ))}
    </ul>
  );
}

AppointmentsScheduled.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeAppointmentById: PropTypes.func.isRequired
};

export default memo(AppointmentsScheduled, (prevProps, nextProps) => {
  return prevProps.appointments === nextProps.appointments;
});
