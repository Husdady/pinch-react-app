// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Constants
import classnames from "../../../../utils/classnames";
import getCurrentDate from "../../../../utils/getCurrentDate";

export const { today } = getCurrentDate();

function CalendarDaysNum({ daysNum, activeDay, setActiveDay }) {
  return (
    <ul className="days-num-list m-0 list-unstyled d-grid justify-content-center py-1 px-3">
      {daysNum.map((day, i) => (
        <li
          key={i}
          role="button"
          className="day-num-item"
          onClick={() => setActiveDay(day)}
        >
          {day !== null && (
            <b
              className={classnames([
                day.dateObject < today ? "blocked" : null,
                // typeof day === "number" && day <= 15 ? "blocked" : null,
                // typeof day === "number" && day === 16 ? "active" : null,
                activeDay !== null && activeDay.id === day.id
                  ? "selected"
                  : null,
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
  activeDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  daysNum: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(CalendarDaysNum, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.daysNum) === JSON.stringify(nextProps.daysNum)
  );
});
