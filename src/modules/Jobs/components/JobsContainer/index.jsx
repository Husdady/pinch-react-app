// Components
import NewJob from '../NewJob'
import Appointments from '../Appointments'
import SelectedAppointment from '../SelectedAppointment'

// Styles
import './styles.css';

export default function JobsContainer() {
  return (
    <section className="jobs-container d-flex flex-wrap">
      <NewJob />
      <Appointments />
      <SelectedAppointment />
    </section>
  );
}
