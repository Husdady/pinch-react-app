// Components
import Appointment from "./Appointment";

// Constants
import useAppointments from "./useAppointments";

export default function AppointmentsList() {
  const { appointments, isError, isFetching } = useAppointments()

  if (isFetching) return <p>Loading...</p>
  if (isError) return <p>Error to show appointments</p>

  return (
    <div className="appointments-registered">
      <ul className="appointments-list list-unstyled mb-0">
        {appointments.map((appointment) => (
          <li key={appointment._id} className="appointment py-2 px-3">
            <Appointment {...appointment} />
          </li>
        ))}
      </ul>
    </div>
  );
}
