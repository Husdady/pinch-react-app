// Librarys
import PropTypes from "prop-types";

// Components
import NewJob from "../NewJob";
import AppointmentsForm from "../AppointmentsForm";
import ModalAppointmentCreated from "../ModalAppointmentCreated";

// Hooks
import useJobs from "./useJobs";
import useNewJob from "./useNewJob";
import useClients from "../NewJob/Clients/useClients";

// Services
import ApiProfile from "../../../../services/ApiProfile";

// Styles
import "./styles.css";

export default function JobsContainer({ api }) {
  // Get data for logic of the Jobs
  const {
    isFetching,
    isSuccesfully,
    createJob,
    reloadSchedule,
    reloadAppointments,
    setReloadSchedule,
    setReloadAppointments,
    hideAppointmentCreatedModal,
  } = useJobs({ api: api });

  // Get job form data
  const newJobForm = useNewJob({
    reloadSchedule: reloadSchedule,
    setReloadSchedule: setReloadSchedule,
  });

  // Get clients
  const clientsData = useClients({
    api: api,
    onChangeClient: newJobForm.onChangeClient,
  });

  return (
    <section className="jobs-container d-flex flex-wrap">
      <NewJob
        api={api}
        createJob={createJob}
        isCreatingJob={isFetching}
        reloadSchedule={reloadSchedule}
        setReloadSchedule={setReloadSchedule}
        newJobForm={newJobForm}
        clientsData={clientsData}
      />

      <AppointmentsForm
        api={api}
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

JobsContainer.propTypes = {
  wixResponse: PropTypes.object.isRequired,
  api: PropTypes.instanceOf(ApiProfile).isRequired,
};
