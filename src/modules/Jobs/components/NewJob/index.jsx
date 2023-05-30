// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import JobHeader from "./JobHeader";
import JobContent from "./JobContent";
import JobFooter from "./JobFooter";
import ModalCreateJob from "../ModalCreateJob";

// Utils
import classnames from "../../../../utils/classnames";

// Styles
import "./styles.css";

function NewJob({
  createJob,
  isCreatingJob,
  reloadSchedule,
  setReloadSchedule,
  newJobForm,
  clientsData
}) {
  const {
    ref,
    watch,
    submit,
    register,
    updateDate,
    updateDayAndMonth,
    appointment,
    handleSubmit,
    onTriggerWidth,
    handleOnChange,
    validateDay,
    setAppointments,
    removeAppointmentById,
    onToggleDay,
    onHideModal,
    onChangeTime,
    onChangeMonth,
    onChangeService,
    onChangeBooking,
    onChangeProperty,
    clearAppointments,
    isDisabledSubmitButton,
  } = newJobForm;

  return (
    <>
      <form
        ref={ref}
        noValidate
        className="new-job"
        onSubmit={handleSubmit(submit)}
      >
        <JobHeader
          active={watch("minimizeWidth")}
          onTriggerWidth={onTriggerWidth}
        />

        <div
          className={classnames([
            watch("minimizeWidth") ? "hidden" : null,
            "job-wrapper d-flex flex-column justify-content-between",
          ])}
        >
          <JobContent
            watch={watch}
            register={register}
            validateDay={validateDay}
            onToggleDay={onToggleDay}
            handleOnChange={handleOnChange}
            clientsData={clientsData}
            updateDate={updateDate}
            updateDayAndMonth={updateDayAndMonth}
            appointment={appointment}
            setAppointments={setAppointments}
            reloadSchedule={reloadSchedule}
            setReloadSchedule={setReloadSchedule}
            removeAppointmentById={removeAppointmentById}
            onChangeTime={onChangeTime}
            onChangeMonth={onChangeMonth}
            onChangeService={onChangeService}
            onChangeBooking={onChangeBooking}
            onChangeProperty={onChangeProperty}
          />

          <JobFooter isDisabledSubmitButton={isDisabledSubmitButton} />
        </div>
      </form>

      <ModalCreateJob
        createJob={createJob}
        onHideModal={onHideModal}
        isCreatingJob={isCreatingJob}
        show={watch("showCreateJobModal")}
        appointments={watch("appointments")}
        serviceType={watch("serviceType")}
        customerName={watch("customerName")}
        clearAppointments={clearAppointments}
      />
    </>
  );
}

NewJob.propTypes = {
  createJob: PropTypes.func.isRequired,
  isCreatingJob: PropTypes.bool.isRequired,
  reloadSchedule: PropTypes.bool.isRequired,
  newJobForm: PropTypes.object.isRequired,
  setReloadSchedule: PropTypes.func.isRequired,
};

export default memo(NewJob, (prevProps, nextProps) => {
  return (
    prevProps.newJobForm === nextProps.newJobForm &&
    prevProps.clientsData === nextProps.clientsData &&
    prevProps.isCreatingJob === nextProps.isCreatingJob
  );
});
