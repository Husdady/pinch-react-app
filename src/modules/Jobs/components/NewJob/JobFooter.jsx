// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

function JobFooter({ isDisabledSubmitButton }) {
  return (
    <div className="job-footer px-4 py-4">
      <button
        type="submit"
        id="generate-job"
        className="d-block w-100 border-0"
        disabled={isDisabledSubmitButton}
      >
        Generate Job
      </button>
    </div>
  );
}

JobFooter.propTypes = {
  isDisabledSubmitButton: PropTypes.bool.isRequired,
};

export default memo(JobFooter, (prevProps, nextProps) => {
  return prevProps.isDisabledSubmitButton === nextProps.isDisabledSubmitButton;
});
