// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Hooks
import useDaysNum from "./useDaysNum";

// Constants
import classnames from "../../../../../../../utils/classnames";

function CalendarDaysNum({ daysNum, schedule, activeDay, handleSelectDay }) {
  // Execute hook for get flags
  const { isActive, isSelected } = useDaysNum({
    schedule: schedule,
    activeDay: activeDay,
  });

  return (
    <ul className="days-num-list m-0 list-unstyled d-grid justify-content-center py-1 px-3">
      {daysNum.map((day, i) => (
        <li
          key={i}
          className="day-num-item"
          // role={day === null || day.blocked ? "listitem" : "button"}
          // onClick={() => handleSelectDay(day)}
        >
          {day !== null && (
            <b
              role={day === null || day.blocked ? "listitem" : "button"}
              onClick={() => handleSelectDay(day)}
              className={classnames([
                day.blocked ? "blocked" : null,
                isActive(day) ? "active" : null,
                isSelected(day) ? "selected" : null,
                "day-num d-flex align-items-center justify-content-center",
              ])}
            >
              {day.index}
            </b>
          )}
        </li>
      ))}
    </ul>
  );
}

CalendarDaysNum.propTypes = {
  activeDay: PropTypes.object,
  handleSelectDay: PropTypes.func.isRequired,
  daysNum: PropTypes.arrayOf(PropTypes.object).isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(CalendarDaysNum, (prevProps, nextProps) => {
  return (
    prevProps.daysNum === nextProps.daysNum &&
    prevProps.schedule === nextProps.schedule &&
    prevProps.activeDay === nextProps.activeDay
  );
});
