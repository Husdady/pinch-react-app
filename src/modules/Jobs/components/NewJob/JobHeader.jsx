// Librarys
import { memo } from "react";
import PropTypes from "prop-types";
import { LEFT_ARROW, RIGHT_ARROW } from "../../../../assets/data/constants";

// Constants

function JobHeader({ active, onTriggerWidth }) {
  return (
    <div className="job-header ps-4 pe-3 py-2 d-flex align-items-center justify-content-between">
      <b className="text-uppercase">New job</b>

      <img
        onClick={onTriggerWidth}
        src={active ? RIGHT_ARROW : LEFT_ARROW}
        alt="arrow-trigger"
        role="button"
      />
    </div>
  );
}

JobHeader.propTypes = {
  active: PropTypes.bool.isRequired,
  onTriggerWidth: PropTypes.func.isRequired
};

export default memo(JobHeader, (prevProps, nextProps) => {
  return prevProps.active === nextProps.active;
});
