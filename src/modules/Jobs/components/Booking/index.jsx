// Librarys
import PropTypes from "prop-types";
import { memo, Fragment } from "react";

// Components
import OneTime from "../OneTime";
import MultipleDays from "../MultipleDays";
import RecurrentJobs from "../RecurrentJobs";
import Select from "../../../../components/Select";

// Constants
import { bookingOptions } from "./options";

// Styles
import "./styles.css";

function Booking({
  day,
  days,
  month,
  repeat,
  timeId,
  booking,
  forMonthly,
  timeOptions,
  register,
  appointment,
  updateDate,
  validateDay,
  onToggleDay,
  onChangeTime,
  onChangeMonth,
  onChangeBooking,
  handleOnChange,
}) {
  return (
    <Fragment>
      <Select
        textLabel="Booking"
        className="mb-3"
        selectedValue={booking}
        options={bookingOptions}
        onChange={onChangeBooking}
      />

      {booking === "one-time" && (
        <OneTime
          day={day}
          month={month}
          timeId={timeId}
          register={register}
          timeOptions={timeOptions}
          validateDay={validateDay}
          onChangeTime={onChangeTime}
          onChangeMonth={onChangeMonth}
        />
      )}

      {booking === "multiple-days" && (
        <MultipleDays
          timeId={timeId}
          timeOptions={timeOptions}
          onChangeTime={onChangeTime}
          updateDate={updateDate}
          appointment={appointment}
        />
      )}

      {booking === "recurrent-jobs" && (
        <RecurrentJobs
          days={days}
          repeat={repeat}
          timeId={timeId}
          forMonthly={forMonthly}
          timeOptions={timeOptions}
          onToggleDay={onToggleDay}
          onChangeTime={onChangeTime}
          handleOnChange={handleOnChange}
        />
      )}
    </Fragment>
  );
}

Booking.propTypes = {
  repeat: PropTypes.string.isRequired,
  timeId: PropTypes.string.isRequired,
  forMonthly: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  booking: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  updateDate: PropTypes.func.isRequired,
  onToggleDay: PropTypes.func.isRequired,
  validateDay: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  onChangeMonth: PropTypes.func.isRequired,
  onChangeBooking: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default memo(Booking, (prevProps, nextProps) => {
  return (
    prevProps.day === nextProps.day &&
    prevProps.repeat === nextProps.repeat &&
    prevProps.timeId === nextProps.timeId &&
    prevProps.appointment === nextProps.appointment &&
    prevProps.forMonthly === nextProps.forMonthly &&
    prevProps.month === nextProps.month &&
    prevProps.booking === nextProps.booking &&
    JSON.stringify(prevProps.days) === JSON.stringify(nextProps.days) &&
    JSON.stringify(prevProps.timeOptions) ===
      JSON.stringify(nextProps.timeOptions)
  );
});
