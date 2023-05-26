// Librarys
import { memo } from "react";
import PropTypes from "prop-types";
import { CLOSE_CIRCLE_ICON } from "../../../../assets/data/constants";

function AppointmentsScheduled({ appointments }) {
  return (
    <ul className="list-unstyled little-scrollbar appointments-scheduled m-0 mt-4">
      {appointments.map((appointment) => (
        <li key={appointment.id} className="appointment-scheduled d-flex align-items-center">
          <span className="appointment-time px-3 me-2 mt-2">
            {appointment.jobDate} | {appointment.timeLabel}
          </span>

          <img
            role="button"
            alt="close-circle-icon"
            src={CLOSE_CIRCLE_ICON}
            onClick={appointment.removeThis}
          />
        </li>
      ))}
    </ul>
  );
}

AppointmentsScheduled.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(AppointmentsScheduled, (prevProps, nextProps) => {
  return prevProps.appointments === nextProps.appointments;
});
