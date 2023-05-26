// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Costs from "./Costs";
import Buttons from "./Buttons";
import Optional from "./Optional";
import TopContent from "./TopContent";
import Modal from "../../../../components/Modal";

// Hooks
import useCreateJob from "./useCreateJob";

// Styles
import "./styles.css";

function ModalCreateJob({
  show,
  createJob,
  onHideModal,
  serviceType,
  customerName,
  appointments,
  isCreatingJob,
}) {
  const { watch, onSubmit, onToggleCheckboxOption, onChangeConfirmationBy } =
    useCreateJob({
      createJob: createJob,
      appointments: appointments,
      onHideModal: onHideModal,
    });

  return (
    <Modal
      centered
      show={show}
      onHide={onHideModal}
      className="create-job-modal"
    >
      <TopContent serviceType={serviceType} customerName={customerName} />
      <Costs data={appointments} />

      <Optional
        notifications={watch("notifications")}
        confirmation={watch("confirmation")}
        confirmationBy={watch("confirmationBy")}
        onToggleCheckboxOption={onToggleCheckboxOption}
        onChangeConfirmationBy={onChangeConfirmationBy}
      />

      <Buttons
        onSubmit={onSubmit}
        onHideModal={onHideModal}
        isCreatingJob={isCreatingJob}
      />
    </Modal>
  );
}

ModalCreateJob.propTypes = {
  show: PropTypes.bool.isRequired,
  createJob: PropTypes.func.isRequired,
  isCreatingJob: PropTypes.bool.isRequired,
  serviceType: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onHideModal: PropTypes.func.isRequired,
};

export default memo(ModalCreateJob, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.serviceType === nextProps.serviceType &&
    prevProps.customerName === nextProps.customerName &&
    prevProps.isCreatingJob === nextProps.isCreatingJob &&
    prevProps.appointments === nextProps.appointments
  );
});
