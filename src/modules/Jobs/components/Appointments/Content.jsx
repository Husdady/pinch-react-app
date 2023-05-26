// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Fields from "./Fields";
import AppointmentsList from "./AppointmentsList";

function AppointmentsContent({ isError, isFetching, appointments }) {
  return (
    <section className="appointments-content">
      <Fields />

      <AppointmentsList
        isError={isError}
        isFetching={isFetching}
        appointments={appointments}
      />
    </section>
  );
}

AppointmentsContent.propTypes = {
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(AppointmentsContent, (prevProps, nextProps) => {
  return (
    prevProps.isError === nextProps.isError &&
    prevProps.isFetching === nextProps.isFetching &&
    prevProps.appointments === nextProps.appointments
  );
});
