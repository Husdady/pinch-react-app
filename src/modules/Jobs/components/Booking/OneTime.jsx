// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Constants
// import { options } from "./options";

function OneTime() {
  return (
    <div className="one-time">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <b className="subtitle">Date:</b>

        <div className="d-flex align-items-center" style={{ width: '80%' }}>
          <span className="day me-2">Tuesday</span>

          <Select options={[]} className="me-2 pick-day" style={{ width: '100%' }} />

          <input
            type="text"
            value="12"
            className="text-center day-num"
            style={{ width: 30, height: 30 }}
          />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between one-time-value">
        <b className="subtitle">Time:</b>
        <Select options={[]} className="schedule" style={{ width: '80%' }} />
      </div>
    </div>
  );
}

export default memo(OneTime);
