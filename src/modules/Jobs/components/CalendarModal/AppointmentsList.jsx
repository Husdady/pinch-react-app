// Librarys
import { memo } from "react";
import PropTypes from "prop-types";
import classnames from "../../../../utils/classnames";
import { CLOSE_CIRCLE_ICON } from "../../../../assets/data/constants";

function AppointmentsList({
  appointments,
  activeAppointment,
  onSelectAppointment,
  onRemoveAppointment,
}) {
  if (appointments.length === 0) {
    return <span className="no-appointments">No appointments added</span>;
  }

  return (
    <ul className="appointments-list m-0 w-100 list-unstyled">
      {appointments.map((item) => (
        <li
          key={item.id}
          role={item.isNew ? "button" : "listitem"}
          onClick={item.isNew ? onSelectAppointment(item.id) : undefined}
          className={classnames([
            activeAppointment === item.id ? "active" : null,
            "appointment-item d-flex align-items-center justify-content-between",
          ])}
        >
          <div>
            <b className="customer-name">{item.clientName}</b>
            <span className="job-schedule">{item.jobSchedule}</span>
          </div>

          {activeAppointment === item.id && (
            <img
              role="button"
              alt="close-circle-icon"
              src={CLOSE_CIRCLE_ICON}
              onClick={onRemoveAppointment}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

AppointmentsList.propTypes = {
  activeAppointment: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectAppointment: PropTypes.func.isRequired,
  onRemoveAppointment: PropTypes.func.isRequired,
};

export default memo(AppointmentsList, (prevProps, nextProps) => {
  return (
    prevProps.activeAppointment === nextProps.activeAppointment &&
    JSON.stringify(prevProps.appointments) ===
      JSON.stringify(nextProps.appointments)
  );
});
