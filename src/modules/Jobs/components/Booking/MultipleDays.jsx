// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Constants
// import { options } from "./options";

function MultipleDays({ onChangeBooking }) {
  return (
    <div className="multiple-days">
      <button id="btn-calendar" className="py-2 px-3">
        <img src="https://i.imgur.com/6HqmxDx.png" />
        <span className="ms-2">Calendar</span>
      </button>
    </div>
  );
}

export default memo(MultipleDays);
