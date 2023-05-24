// Librarys
import PropTypes from "prop-types";
import { memo, Fragment } from "react";

// Components
import CalendarModal from "../CalendarModal";

// Hooks
import useMultipleDays from "./useMultipleDays";

// Constants
import { CALENDAR_ICON } from "../../../../assets/data/constants";

function MultipleDays({ timeId, timeOptions, onChangeTime }) {
  const { show, showModal, hideModal } = useMultipleDays();

  return (
    <Fragment>
      <div className="multiple-days">
        <button type="button" id="btn-calendar" className="py-2 px-3" onClick={showModal}>
          <img src={CALENDAR_ICON} alt="calendar-icon" />
          <span className="ms-2">Calendar</span>
        </button>
      </div>

      <CalendarModal
        show={show}
        onHide={hideModal}
        timeId={timeId}
        timeOptions={timeOptions}
        onChangeTime={onChangeTime}
      />
    </Fragment>
  );
}

MultipleDays.propTypes = {
  timeId: PropTypes.string.isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeTime: PropTypes.func.isRequired,
};

export default memo(MultipleDays, (prevProps, nextProps) => {
  return (
    prevProps.timeId === nextProps.timeId &&
    JSON.stringify(prevProps.timeOptions) === JSON.stringify(nextProps.timeOptions)
  );
});
