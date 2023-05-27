// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Header from "./Header";
import Content from "./Content";

// Hooks
import useAppointments from "./useAppointments";

// Styles
import "./styles.css";

function Appointments({
  clients,
  clientId,
  onChangeClient,
  reloadAppointments,
  setReloadAppointments,
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
    clients: clients,
    clientId: clientId,
    onChangeClient: onChangeClient,
    reloadAppointments: reloadAppointments,
    setReloadAppointments: setReloadAppointments,
  });

  return (
    <section className="appointments">
      <Header
        isFetching={isFetching}
        isSuccesfully={isSuccesfully}
        filterActivated={filterActivated}
        filterAppointmentsByStatus={filterAppointmentsByStatus}
        backupAppointments={backupAppointments}
      />

      <Content
        isError={isError}
        isFetching={isFetching}
        appointments={appointments}
        currentClientId={clientId}
        updateAppointmentStatus={updateAppointmentStatus}
      />
    </section>
  );
}

Appointments.propTypes = {
  clientId: PropTypes.string.isRequired,
  reloadAppointments: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeClient: PropTypes.func.isRequired,
  setReloadAppointments: PropTypes.func.isRequired,
};

export default memo(Appointments, (prevProps, nextProps) => {
  return (
    prevProps.clients === nextProps.clients &&
    prevProps.clientId === nextProps.clientId &&
    prevProps.reloadAppointments === nextProps.reloadAppointments
  );
});
