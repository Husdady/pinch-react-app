// Components
import Select from "../../../../components/Select";

// Constants
import { appointmentStatus } from "./constants";

export default function Appointment({
  status,
  customerName,
  propertyName,
  dateTime,
}) {
  return (
    <div className="d-flex align-items-center">
      <span className="field-client">{customerName}</span>
      <span className="field-property">{propertyName}</span>
      <span className="field-date">{dateTime}</span>

      <div className="ms-4" style={{ width: "50%" }}>
        <Select options={appointmentStatus} selectedValue={status} />
      </div>
    </div>
  );
}
