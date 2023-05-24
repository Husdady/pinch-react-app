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
    register,
    onTriggerWidth,
    handleOnChange,
    validateDay,
    onToggleDay,
    onChangeTime,
    onChangeMonth,
    onChangeClient,
    onChangeService,
    onChangeBooking,
    onChangeProperty
  } = useNewJob();

  return (
    <section ref={ref} className="new-job">
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
            onChangeTime={onChangeTime}
            onChangeMonth={onChangeMonth}
            onChangeClient={onChangeClient}
            onChangeService={onChangeService}
            onChangeBooking={onChangeBooking}
            onChangeProperty={onChangeProperty}
          />

          <JobFooter />
        </div>
      )}
    </section>
  );
}
