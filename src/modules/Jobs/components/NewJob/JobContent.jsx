// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Clients from "./Clients";
import Booking from "./Booking";
import Services from "./Services";
import Properties from "./Properties";

// Services
import ApiProfile from "../../../../services/ApiProfile";

function JobContent({
  api,
  watch,
  register,
  updateDate,
  updateDayAndMonth,
  onToggleDay,
  appointment,
  clientsData,
  handleOnChange,
  validateDay,
  setAppointments,
  reloadSchedule,
  setReloadSchedule,
  removeAppointmentById,
  onChangeTime,
  onChangeMonth,
  onChangeBooking,
  onChangeService,
  onChangeProperty,
}) {
  return (
    <div className="job-content px-4 py-2">
      <Clients clientId={watch("clientId")} clientsData={clientsData} />

      <Properties
        api={api}
        clientId={watch("clientId")}
        propertyId={watch("propertyId")}
        onChangeProperty={onChangeProperty}
      />

      <Services
        jobCost={watch("jobCost")}
        services={watch("services")}
        serviceId={watch("serviceId")}
        onChangeService={onChangeService}
      />

      <Booking
        api={api}
        day={watch("day")}
        days={watch("days")}
        month={watch("month")}
        repeat={watch("repeat")}
        timeId={watch("timeId")}
        booking={watch("booking")}
        forMonthly={watch("forMonthly")}
        timeOptions={watch("timeOptions")}
        appointments={watch("appointments")}
        register={register}
        updateDate={updateDate}
        updateDayAndMonth={updateDayAndMonth}
        appointment={appointment}
        validateDay={validateDay}
        setAppointments={setAppointments}
        reloadSchedule={reloadSchedule}
        setReloadSchedule={setReloadSchedule}
        removeAppointmentById={removeAppointmentById}
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
  api: PropTypes.instanceOf(ApiProfile).isRequired,
  watch: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
  updateDayAndMonth: PropTypes.func.isRequired,
  onToggleDay: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  validateDay: PropTypes.func.isRequired,
  setAppointments: PropTypes.func.isRequired,
  removeAppointmentById: PropTypes.func.isRequired,
  onChangeMonth: PropTypes.func.isRequired,
  onChangeBooking: PropTypes.func.isRequired,
  onChangeProperty: PropTypes.func.isRequired,
};

export default memo(JobContent);
