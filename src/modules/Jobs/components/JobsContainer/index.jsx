// Components
import NewJob from "../NewJob";
import AppointmentsForm from "../AppointmentsForm";
import ModalAppointmentCreated from "../ModalAppointmentCreated";

// Hooks
import useJobs from "./useJobs";

// Styles
import "./styles.css";

export default function JobsContainer() {
  const {
    isFetching,
    isSuccesfully,
    createJob,
    reloadAppointments,
    setReloadAppointments,
    hideAppointmentCreatedModal
  } = useJobs();

  return (
    <section className="jobs-container d-flex flex-wrap">
      <NewJob createJob={createJob} isCreatingJob={isFetching} />

      <AppointmentsForm
        reloadAppointments={reloadAppointments}
        setReloadAppointments={setReloadAppointments}
      />

      <ModalAppointmentCreated
        show={isSuccesfully}
        onHideModal={hideAppointmentCreatedModal}
      />
    </section>
  );
}
