// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Day from "./Day";
import Months from "../Months";
import DayName from "./DayName";
import Time, { timeStyle } from "../Time";

function OneTime({
  day,
  month,
  timeId,
  register,
  timeOptions,
  validateDay,
  onChangeTime,
  onChangeMonth,
}) {
  return (
    <div className="one-time">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <b className="subtitle">Date:</b>

        <div className="d-flex align-items-center" style={{ width: "80%" }}>
          <DayName day={day} month={month} />
          <Months selectedMonth={month} onChange={onChangeMonth} />
          <Day register={register} validateDay={validateDay} />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between one-time-value">
        <b className="subtitle">Time:</b>

        <Time
          style={timeStyle}
          options={timeOptions}
          selectedTime={timeId}
          onChangeTime={onChangeTime}
        />
      </div>
    </div>
  );
}

OneTime.propTypes = {
  month: PropTypes.string.isRequired,
  timeId: PropTypes.string.isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  validateDay: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  onChangeMonth: PropTypes.func.isRequired,
};

export default memo(OneTime, (prevProps, nextProps) => {
  return (
    prevProps.day === nextProps.day &&
    prevProps.month === nextProps.month &&
    prevProps.timeId === nextProps.timeId &&
    prevProps.timeOptions === nextProps.timeOptions
  );
});
