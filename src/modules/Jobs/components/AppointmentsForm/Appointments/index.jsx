// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Header from "./Header";
import Content from "./Content";

// Hooks
import useAppointments from "./useAppointments";

// Services
import ApiProfile from "../../../../../services/ApiProfile";

// Styles
import "./styles.css";

function Appointments({
  api,
  clients,
  clientId,
  onChangeClient,
  reloadAppointments,
  setReloadAppointments,
  setReloadSchedule,
}) {
  const {
    isError,
    isFetching,
    isSuccesfully,
    appointments,
    backupAppointments,
    filterActivated,
    filterAppointmentsByStatus,
    updateAppointmentStatus,
  } = useAppointments({
    api: api,
    clients: clients,
    clientId: clientId,
    onChangeClient: onChangeClient,
    reloadAppointments: reloadAppointments,
    setReloadAppointments: setReloadAppointments,
    setReloadSchedule: setReloadSchedule,
  });

  return (
    <section className="appointments">
      <Header
        api={api}
        isFetching={isFetching}
        isSuccesfully={isSuccesfully}
        filterActivated={filterActivated}
        filterAppointmentsByStatus={filterAppointmentsByStatus}
        backupAppointments={backupAppointments}
      />

      <Content
        api={api}
        isError={isError}
        isFetching={isFetching}
        isSuccesfully={isSuccesfully}
        appointments={appointments}
        currentClientId={clientId}
        updateAppointmentStatus={updateAppointmentStatus}
      />
    </section>
  );
}

Appointments.propTypes = {
  api: PropTypes.instanceOf(ApiProfile).isRequired,
  clientId: PropTypes.string.isRequired,
  reloadAppointments: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeClient: PropTypes.func.isRequired,
  setReloadAppointments: PropTypes.func.isRequired,
  setReloadSchedule: PropTypes.func.isRequired,
};

export default memo(Appointments, (prevProps, nextProps) => {
  return (
    prevProps.clients === nextProps.clients &&
    prevProps.clientId === nextProps.clientId &&
    prevProps.reloadAppointments === nextProps.reloadAppointments
  );
});
