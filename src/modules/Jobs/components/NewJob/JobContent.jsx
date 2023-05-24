// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Clients from "../Clients";
import Booking from "../Booking";
import Services from "../Services";
import Properties from "../Properties";

function JobContent({
  watch,
  register,
  onToggleDay,
  handleOnChange,
  validateDay,
  onChangeTime,
  onChangeMonth,
  onChangeClient,
  onChangeBooking,
  onChangeService,
  onChangeProperty
}) {
  return (
    <div className="job-content px-4 py-2">
      <Clients onChangeClient={onChangeClient} />

      <Properties
        clientId={watch('clientId')}
        propertyId={watch('propertyId')}
        onChangeProperty={onChangeProperty}
      />

      <Services
        jobCost={watch('jobCost')}
        services={watch('services')}
        serviceId={watch('serviceId')}
        onChangeService={onChangeService}
      />

      <Booking
        day={watch('day')}
        days={watch('days')}
        month={watch('month')}
        repeat={watch('repeat')}
        timeId={watch('timeId')}
        booking={watch('booking')}
        forMonthly={watch('forMonthly')}
        timeOptions={watch('timeOptions')}
        register={register}
        validateDay={validateDay}
        onToggleDay={onToggleDay}
        onChangeTime={onChangeTime}
        onChangeMonth={onChangeMonth}
        handleOnChange={handleOnChange}
        onChangeBooking={onChangeBooking}
      />
    </div>
  );
}

JobContent.propTypes = {
  watch: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  onToggleDay: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  validateDay: PropTypes.func.isRequired,
  onChangeMonth: PropTypes.func.isRequired,
  onChangeClient: PropTypes.func.isRequired,
  onChangeBooking: PropTypes.func.isRequired,
  onChangeProperty: PropTypes.func.isRequired
};

export default memo(JobContent);
