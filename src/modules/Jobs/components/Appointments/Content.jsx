// Components
import Fields from "./Fields";
import AppointmentsList from "./AppointmentsList";

export default function Content() {
  return (
    <section className="appointments-content">
      <Fields />
      <AppointmentsList />
    </section>
  );
}
