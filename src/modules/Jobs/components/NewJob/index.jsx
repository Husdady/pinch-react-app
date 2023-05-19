// Components
import JobHeader from "./JobHeader";
import JobContent from "./JobContent";
import JobFooter from "./JobFooter";

// Hooks
import useNewJob from "./useNewJob";

// Styles
import "./styles.css";

export default function NewJob() {
  const { ref, watch, onTriggerWidth, handleOnChange, onChangeProperty } =
    useNewJob();

  return (
    <section ref={ref} className="new-job">
      <JobHeader
        active={watch("minimizeWidth")}
        onTriggerWidth={onTriggerWidth}
      />

      {!watch("minimizeWidth") && (
        <div className="job-wrapper d-flex flex-column justify-content-between">
          <JobContent
            client={watch("client")}
            booking={watch("booking")}
            service={watch("service")}
            property={watch("property")}
            services={watch("services")}
            handleOnChange={handleOnChange}
            onChangeProperty={onChangeProperty}
          />

          <JobFooter />
        </div>
      )}
    </section>
  );
}
