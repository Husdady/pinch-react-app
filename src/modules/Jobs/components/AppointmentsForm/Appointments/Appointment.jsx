// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../../components/Select";

// Constants
import { statusOptions } from "./constants";

function Appointment({
  _id,
  status,
  clientId,
  customerName,
  propertyName,
  dateTime,
  currentClientId,
  updateAppointmentStatus,
}) {
  return (
    <div className="d-flex align-items-center">
      <span className="field-client">{customerName}</span>
      <span className="field-property">{propertyName}</span>
      <span className="field-date">{dateTime}</span>

      <div className="ms-4 field-status">
        <Select
          selectedValue={status}
          arrayDeps={[currentClientId]}
          noSelectValues={['rebook']}
          options={statusOptions[status.trim()]}
          onChange={updateAppointmentStatus({
            appointmentId: _id,
            appointmentClientId: clientId,
            currentStatus: status,
          })}
        />
      </div>
    </div>
  );
}

Appointment.propTypes = {
  _id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  currentClientId: PropTypes.string.isRequired,
  updateAppointmentStatus: PropTypes.func.isRequired,
};

export default memo(Appointment, (prevProps, nextProps) => {
  return prevProps.currentClientId === nextProps.currentClientId;
});
