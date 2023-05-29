// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Fields from "./Fields";
import AppointmentsList from "./AppointmentsList";

function AppointmentsContent({
  isError,
  isFetching,
  isSuccesfully,
  appointments,
  currentClientId,
  updateAppointmentStatus,
}) {
  return (
    <section className="appointments-content">
      <Fields />

      <AppointmentsList
        isError={isError}
        isFetching={isFetching}
        isSuccesfully={isSuccesfully}
        appointments={appointments}
        currentClientId={currentClientId}
        updateAppointmentStatus={updateAppointmentStatus}
      />
    </section>
  );
}

AppointmentsContent.propTypes = {
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSuccesfully: PropTypes.bool.isRequired,
  currentClientId: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateAppointmentStatus: PropTypes.func.isRequired,
};

export default memo(AppointmentsContent, (prevProps, nextProps) => {
  return (
    prevProps.isError === nextProps.isError &&
    prevProps.isFetching === nextProps.isFetching &&
    prevProps.isSuccesfully === nextProps.isSuccesfully &&
    prevProps.appointments === nextProps.appointments &&
    prevProps.currentClientId === nextProps.currentClientId
  );
});
