// Components
import Header from "./Header";
import Content from "./Content";
// import ModalAppointmentCreated from "../ModalAppointmentCreated";

// Styles
import "./styles.css";

export default function Appointments() {
  return (
    <section className="appointments">
      <Header />
      <Content />
      {/* <ModalAppointmentCreated /> */}
    </section>
  );
}
