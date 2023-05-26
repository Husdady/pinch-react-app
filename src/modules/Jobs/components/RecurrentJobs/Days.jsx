// Librarys
import { memo } from "react";
import PropTypes from 'prop-types'

// Utils
import classnames from "../../../../utils/classnames";

// Constants
import { daysOptions } from "./constants";

function Days({ days, onToggleDay }) {
  return (
    <ul className="days d-flex justify-content-center list-unstyled">
      {daysOptions.map((day) => (
        <li key={day.id} className="day me-1">
          <button
            type="button"
            onClick={() => onToggleDay(day.id)}
            className={classnames([
              "btn-day",
              days.includes(day.id) ? "active" : null,
            ])}
          >
            {day.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

Days.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleDay: PropTypes.func.isRequired
}

export default memo(Days, (prevProps, nextProps) => {
  return prevProps.days === nextProps.days
});
