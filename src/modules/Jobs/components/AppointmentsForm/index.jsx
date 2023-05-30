// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Appointments from "./Appointments";
import SelectedAppointment from "./SelectedAppointment";

// Services
import ApiProfile from "../../../../services/ApiProfile";

function AppointmentsForm({
  api,
  clients,
  clientId,
  onChangeClient,
  reloadAppointments,
  setReloadAppointments,
  setReloadSchedule,
}) {
  return (
    <>
      <Appointments
        api={api}
        clients={clients}
        clientId={clientId}
        onChangeClient={onChangeClient}
        reloadAppointments={reloadAppointments}
        setReloadAppointments={setReloadAppointments}
        setReloadSchedule={setReloadSchedule}
      />

      <SelectedAppointment />
    </>
  );
}

AppointmentsForm.propTypes = {
  api: PropTypes.instanceOf(ApiProfile).isRequired,
  clientId: PropTypes.string.isRequired,
  reloadAppointments: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  setReloadAppointments: PropTypes.func.isRequired,
  setReloadSchedule: PropTypes.func.isRequired,
  onChangeClient: PropTypes.func.isRequired,
};

export default memo(AppointmentsForm, (prevProps, nextProps) => {
  return (
    prevProps.clients === nextProps.clients &&
    prevProps.clientId === nextProps.clientId &&
    prevProps.reloadAppointments === nextProps.reloadAppointments
  );
});
