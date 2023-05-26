// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Button from "../../../../components/Button";

function Buttons({ isCreatingJob, onSubmit, onHideModal }) {
  return (
    <div className="buttons d-flex justify-content-between">
      <Button
        title="Edit"
        id="edit-job"
        className="py-2 px-4"
        onClick={onHideModal}
      />

      <Button
        id="confirm-job"
        className="py-2 px-4"
        title="Confirm"
        onClick={onSubmit}
        isLoading={isCreatingJob}
      />
    </div>
  );
}

Buttons.propTypes = {
  isCreatingJob: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
};

export default memo(Buttons, (prevProps, nextProps) => {
  return prevProps.isCreatingJob === nextProps.isCreatingJob;
});
