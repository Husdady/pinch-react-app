// Librarys
import { memo } from "react";

// Constants
import { daysOptions } from "./constants";

function CalendarDays() {
  return <ul className="days-list m-0 list-unstyled d-grid justify-content-center py-2 px-3">
    {daysOptions.map((day) => (
      <li key={day.toLowerCase()}>
        <b className="day pt-2">{day.toUpperCase()}</b>
      </li>
    ))}
  </ul>;
}

export default memo(CalendarDays);
