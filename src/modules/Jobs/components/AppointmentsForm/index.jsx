// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Appointments from "../Appointments";
import SelectedAppointment from "../SelectedAppointment";

function AppointmentsForm({ reloadAppointments, setReloadAppointments }) {
  return (
    <>
      <Appointments
        reloadAppointments={reloadAppointments}
        setReloadAppointments={setReloadAppointments}
      />

      <SelectedAppointment />
    </>
  );
}

AppointmentsForm.propTypes = {
  reloadAppointments: PropTypes.bool.isRequired,
  setReloadAppointments: PropTypes.func.isRequired,
};

export default memo(AppointmentsForm, (prevProps, nextProps) => {
  return prevProps.reloadAppointments === nextProps.reloadAppointments;
});
