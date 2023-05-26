// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Button from "../../../../components/Button";

function JobFooter({ isDisabledSubmitButton }) {
  return (
    <div className="job-footer px-4 py-4">
      <Button
        type="submit"
        id="generate-job"
        className="d-block w-100 border-0"
        title="Generate Job"
        disabled={isDisabledSubmitButton}
      />
    </div>
  );
}

JobFooter.propTypes = {
  isDisabledSubmitButton: PropTypes.bool.isRequired,
};

export default memo(JobFooter, (prevProps, nextProps) => {
  return prevProps.isDisabledSubmitButton === nextProps.isDisabledSubmitButton;
});
