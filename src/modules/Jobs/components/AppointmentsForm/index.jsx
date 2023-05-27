// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Appointments from "./Appointments";
import SelectedAppointment from "./SelectedAppointment";

function AppointmentsForm({
  clients,
  clientId,
  onChangeClient,
  reloadAppointments,
  setReloadAppointments,
}) {
  return (
    <>
      <Appointments
        clients={clients}
        clientId={clientId}
        onChangeClient={onChangeClient}
        reloadAppointments={reloadAppointments}
        setReloadAppointments={setReloadAppointments}
      />

      <SelectedAppointment />
    </>
  );
}

AppointmentsForm.propTypes = {
  clientId: PropTypes.string.isRequired,
  reloadAppointments: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  setReloadAppointments: PropTypes.func.isRequired,
  onChangeClient: PropTypes.func.isRequired,
};

export default memo(AppointmentsForm, (prevProps, nextProps) => {
  return (
    prevProps.clients === nextProps.clients &&
    prevProps.clientId === nextProps.clientId &&
    prevProps.reloadAppointments === nextProps.reloadAppointments
  );
});
