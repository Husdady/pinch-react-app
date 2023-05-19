// Librarys
import { memo } from "react";
// import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Constants
import { days, forMonthly, repeat } from "./days";
// import { options } from "./options";

function RecurrentJobs({ onChangeBooking }) {
  return (
    <div className="recurrent-jobs">
      <b className="subtitle mb-1">Days</b>

      <ul className="days d-flex justify-content-center list-unstyled">
        {days.map((day) => (
          <li key={day.id} className="day me-1">
            <button type="button" className="btn-day">
              {day.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex align-items-center mb-2">
        <b className="subtitle" style={{ width: "20%" }}>
          Time:
        </b>

        <Select options={[]} style={{ width: "80%" }} />
      </div>

      <div className="d-flex align-items-center mb-2">
        <b className="subtitle" style={{ width: "20%" }}>
          Repeat:
        </b>

        <Select
          options={repeat}
          selectedValue="weekly"
          style={{ width: "40%" }}
        />
      </div>

      <div className="d-flex align-items-center">
        <b className="subtitle" style={{ width: "20%" }}>
          For:
        </b>

        <Select
          options={forMonthly}
          selectedValue="2-month"
          style={{ width: "40%" }}
        />
      </div>
    </div>
  );
}

export default memo(RecurrentJobs);
