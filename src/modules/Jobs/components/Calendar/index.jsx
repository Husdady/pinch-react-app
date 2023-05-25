// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Days from "./Days";
import DaysNum from "./DaysNum";

// Hooks
import useCalendar from "./useCalendar";

// Utils
import classnames from "../../../../utils/classnames";

// Constants
import { CHEVRON_LEFT, CHEVRON_RIGHT } from "../../../../assets/data/constants";

// Styles
import "./styles.css";

function Calendar({ schedule, onSelectDay, onLoadActiveDay }) {
  const {
    month,
    daysNum,
    prevMonth,
    nextMonth,
    activeDay,
    handleSelectDay,
    disablePrevChevronIcon,
    disableNextChevronIcon,
  } = useCalendar({
    onSelectDay: onSelectDay,
    onLoadActiveDay: onLoadActiveDay,
  });

  return (
    <div className="calendar">
      <div className="calendar-month px-4 d-flex align-items-center justify-content-between">
        <button
          onClick={prevMonth}
          className={classnames([
            "bg-transparent",
            disablePrevChevronIcon ? "disable-chevron" : null,
          ])}
        >
          <img
            width={8}
            height={12}
            src={CHEVRON_LEFT}
            alt="chevron-left-icon"
          />
        </button>

        <span className="day">{month.name}</span>

        <button
          onClick={nextMonth}
          className={classnames([
            "bg-transparent",
            disableNextChevronIcon ? "disable-chevron" : null,
          ])}
        >
          <img
            width={8}
            height={12}
            src={CHEVRON_RIGHT}
            alt="chevron-right-icon"
          />
        </button>
      </div>

      <div className="calendar-days">
        <Days />

        <DaysNum
          daysNum={daysNum}
          schedule={schedule}
          activeDay={activeDay}
          handleSelectDay={handleSelectDay}
        />
      </div>
    </div>
  );
}

Calendar.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectDay: PropTypes.func.isRequired,
};

export default memo(Calendar, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.schedule) === JSON.stringify(nextProps.schedule)
  );
});
