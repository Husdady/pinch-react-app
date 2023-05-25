// Components
import JobHeader from "./JobHeader";
import JobContent from "./JobContent";
import JobFooter from "./JobFooter";

// Hooks
import useNewJob from "./useNewJob";

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
    onToggleDay,
    onChangeTime,
    onChangeMonth,
    onChangeClient,
    onChangeService,
    onChangeBooking,
    onChangeProperty,
    isDisabledSubmitButton,
  } = useNewJob();

  return (
    <form
      ref={ref}
      className="new-job"
      noValidate
      onSubmit={handleSubmit(submit)}
    >
      <JobHeader
        active={watch("minimizeWidth")}
        onTriggerWidth={onTriggerWidth}
      />

      {!watch("minimizeWidth") && (
        <div className="job-wrapper d-flex flex-column justify-content-between">
          <JobContent
            watch={watch}
            register={register}
            validateDay={validateDay}
            onToggleDay={onToggleDay}
            handleOnChange={handleOnChange}
            updateDate={updateDate}
            appointment={appointment}
            onChangeTime={onChangeTime}
            onChangeMonth={onChangeMonth}
            onChangeClient={onChangeClient}
            onChangeService={onChangeService}
            onChangeBooking={onChangeBooking}
            onChangeProperty={onChangeProperty}
          />

          <JobFooter isDisabledSubmitButton={isDisabledSubmitButton} />
        </div>
      )}
    </form>
  );
}
