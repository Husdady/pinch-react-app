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

function Appointments({ reloadAppointments, setReloadAppointments }) {
  const {
    isError,
    isFetching,
    isSuccesfully,
    appointments,
    backupAppointments,
    filterActivated,
    filterAppointmentsByStatus,
  } = useAppointments({
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
      />
    </section>
  );
}

Appointments.propTypes = {
  reloadAppointments: PropTypes.bool.isRequired,
  setReloadAppointments: PropTypes.func.isRequired,
};

export default memo(Appointments, (prevProps, nextProps) => {
  return prevProps.reloadAppointments === nextProps.reloadAppointments;
});
