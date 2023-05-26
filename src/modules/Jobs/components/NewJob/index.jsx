// Components
import JobHeader from "./JobHeader";
import JobContent from "./JobContent";
import JobFooter from "./JobFooter";
import ModalCreateJob from "../ModalCreateJob";

// Hooks
import useNewJob from "./useNewJob";

// Utils
import classnames from "../../../../utils/classnames";

// Styles
import "./styles.css";

export default function NewJob() {
  const {
    ref,
    watch,
    submit,
    register,
    updateDate,
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
    onChangeClient,
    onChangeService,
    onChangeBooking,
    onChangeProperty,
    isDisabledSubmitButton,
  } = useNewJob();

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
            updateDate={updateDate}
            appointment={appointment}
            setAppointments={setAppointments}
            removeAppointmentById={removeAppointmentById}
            onChangeTime={onChangeTime}
            onChangeMonth={onChangeMonth}
            onChangeClient={onChangeClient}
            onChangeService={onChangeService}
            onChangeBooking={onChangeBooking}
            onChangeProperty={onChangeProperty}
          />

          <JobFooter isDisabledSubmitButton={isDisabledSubmitButton} />
        </div>
      </form>

      <ModalCreateJob
        onHideModal={onHideModal}
        show={watch("showCreateJobModal")}
        appointments={watch("appointments")}
        serviceType={watch("serviceType")}
        customerName={watch("customerName")}
      />
    </>
  );
}
