// Components
import NewJob from '../NewJob'
import Appointments from '../Appointments'
import SelectedAppointment from '../SelectedAppointment'

// Styles
import './styles.css';

export default function JobsContainer() {
  return (
    <form className="jobs-form d-flex flex-wrap">
      <NewJob />
      <Appointments />
      <SelectedAppointment />
    </form>
  );
}
