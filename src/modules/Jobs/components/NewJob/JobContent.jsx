// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Clients from "../Clients";
import Booking from "../Booking";
import Services from "../Services";
import Properties from "../Properties";

function JobContent({
  client,
  booking,
  property,
  service,
  services,
  handleOnChange,
  onChangeProperty,
}) {
  return (
    <div className="job-content px-4 py-2">
      <Clients onChangeClient={handleOnChange("client")} />

      <Properties
        client={client}
        property={property}
        onChangeProperty={onChangeProperty}
      />

      <Services
        service={service}
        options={services}
        onChangeService={handleOnChange("service")}
      />

      <Booking booking={booking} onChangeBooking={handleOnChange("booking")} />
    </div>
  );
}

JobContent.propTypes = {
  client: PropTypes.string.isRequired,
  booking: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  onChangeProperty: PropTypes.func.isRequired,
};

export default memo(JobContent);
