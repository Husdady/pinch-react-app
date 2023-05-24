// Components
import NewJob from '../NewJob'
import AppointmentsForm from '../AppointmentsForm';

// Styles
import './styles.css';

export default function JobsContainer() {
  return (
    <section className="jobs-container d-flex flex-wrap">
      <NewJob />
      <AppointmentsForm />
    </section>
  );
}
