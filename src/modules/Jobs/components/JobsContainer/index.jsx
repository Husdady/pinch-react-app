// Components
import NewJob from "../NewJob";
import AppointmentsForm from "../AppointmentsForm";
import ModalAppointmentCreated from "../ModalAppointmentCreated";

// Hooks
import useJobs from "./useJobs";
import useNewJob from "./useNewJob";
import useClients from "../NewJob/Clients/useClients";

// Styles
import "./styles.css";

export default function JobsContainer() {
  const {
    isFetching,
    isSuccesfully,
    createJob,
    reloadSchedule,
    reloadAppointments,
    setReloadSchedule,
    setReloadAppointments,
    hideAppointmentCreatedModal,
  } = useJobs();

  const newJobForm = useNewJob({
    reloadSchedule: reloadSchedule,
    setReloadSchedule: setReloadSchedule,
  });

  const clientsData = useClients({ onChangeClient: newJobForm.onChangeClient });

  return (
    <section className="jobs-container d-flex flex-wrap">
      <NewJob
        createJob={createJob}
        isCreatingJob={isFetching}
        reloadSchedule={reloadSchedule}
        setReloadSchedule={setReloadSchedule}
        newJobForm={newJobForm}
        clientsData={clientsData}
      />

      <AppointmentsForm
        clients={clientsData.clients}
        clientId={newJobForm.watch("clientId")}
        onChangeClient={newJobForm.onChangeClient}
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
