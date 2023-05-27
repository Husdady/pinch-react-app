// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Days from "./Days";
import Time, { timeStyle } from "../../../Time";
import Select from "../../../../../../components/Select";

// Constants
import { repeatOptions, forMonthlyOptions } from "./constants";

function RecurrentJobs({
  days,
  repeat,
  timeId,
  forMonthly,
  timeOptions,
  onToggleDay,
  onChangeTime,
  handleOnChange,
}) {
  return (
    <div className="recurrent-jobs">
      <b className="subtitle mb-1">Days</b>
      <Days days={days} onToggleDay={onToggleDay} />

      <div className="d-flex align-items-center mb-2">
        <b className="subtitle me-3 me-lg-2">Time:</b>

        <Time
          style={timeStyle}
          options={timeOptions}
          selectedTime={timeId}
          onChangeTime={onChangeTime}
        />
      </div>

      <div className="d-flex align-items-center mb-2">
        <b className="subtitle me-3 me-lg-2">Repeat:</b>

        <Select
          options={repeatOptions}
          selectedValue={repeat}
          onChange={handleOnChange("repeat")}
          style={{ width: "40%" }}
        />
      </div>

      <div className="d-flex align-items-center">
        <b className="subtitle me-3 me-lg-2">For:</b>

        <Select
          options={forMonthlyOptions}
          selectedValue={forMonthly}
          onChange={handleOnChange("forMonthly")}
          style={{ width: "45%" }}
        />
      </div>
    </div>
  );
}

RecurrentJobs.propTypes = {
  repeat: PropTypes.string.isRequired,
  timeId: PropTypes.string.isRequired,
  forMonthly: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleDay: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default memo(RecurrentJobs, (prevProps, nextProps) => {
  return (
    prevProps.repeat === nextProps.repeat &&
    prevProps.timeId === nextProps.timeId &&
    prevProps.forMonthly === nextProps.forMonthly &&
    prevProps.days === nextProps.days &&
    prevProps.timeOptions === nextProps.timeOptions
  );
});
