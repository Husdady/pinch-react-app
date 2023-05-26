// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Costs from "./Costs";
import Buttons from "./Buttons";
import Optional from "./Optional";
import TopContent from "./TopContent";
import Modal from "../../../../components/Modal";

// Styles
import "./styles.css";
import useCreateJob from "./useCreateJob";

function ModalCreateJob({
  show,
  onHideModal,
  serviceType,
  customerName,
  appointments,
}) {
  const {
    watch,
    submit,
    handleSubmit,
    onToggleCheckboxOption,
    onChangeConfirmationBy,
  } = useCreateJob({ appointments });

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
        onHideModal={onHideModal}
        onSubmit={() => handleSubmit(submit)()}
      />
    </Modal>
  );
}

ModalCreateJob.propTypes = {
  show: PropTypes.bool.isRequired,
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
    prevProps.appointments === nextProps.appointments
  );
});
