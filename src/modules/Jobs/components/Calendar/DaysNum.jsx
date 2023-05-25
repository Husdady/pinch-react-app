// Librarys
import { memo, useCallback } from "react";
import PropTypes from "prop-types";

// Constants
import classnames from "../../../../utils/classnames";

function CalendarDaysNum({ daysNum, schedule, activeDay, handleSelectDay }) {
  // Check if day its active
  const isActive = useCallback(
    (day) => schedule.some((item) => item.active && item.date === day.date),
    [schedule]
  );

  // Check if day its selected
  const isSelected = useCallback(
    (day) => activeDay !== null && activeDay.id === day.id,
    [activeDay]
  );

  return (
    <ul className="days-num-list m-0 list-unstyled d-grid justify-content-center py-1 px-3">
      {daysNum.map((day, i) => (
        <li
          key={i}
          className="day-num-item"
          role={day === null ? "listitem" : "button"}
          onClick={() => handleSelectDay(day)}
        >
          {day !== null && (
            <b
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
    prevProps.activeDay === nextProps.activeDay &&
    JSON.stringify(prevProps.daysNum) === JSON.stringify(nextProps.daysNum) &&
    JSON.stringify(prevProps.schedule) === JSON.stringify(nextProps.schedule)
  );
});
