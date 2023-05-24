// Librarys
import { memo } from "react";
import PropTypes from "prop-types";
import classnames from "../../../../utils/classnames";
import { CLOSE_CIRCLE_ICON } from "../../../../assets/data/constants";

function AppointmentsList({ appointments }) {
  if (appointments.length === 0) {
    return <span className="no-appointments">No appointments added</span>;
  }

  return (
    <ul className="appointments-list list-unstyled">
      {appointments.map((item) => (
        <li
          key={item._id}
          className={classnames([
            item.active ? "active" : null,
            "appointment-item d-flex align-items-center justify-content-between",
          ])}
        >
          <div>
            <b className="customer-name">{item.customerName}</b>
            <span className="job-schedule">{item.jobSchedule}</span>
          </div>

          {item.active && <img src={CLOSE_CIRCLE_ICON} alt="close-circle-icon" />}
        </li>
      ))}
    </ul>
  );
}

AppointmentsList.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(AppointmentsList, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.appointments) ===
    JSON.stringify(nextProps.appointments)
  );
});
