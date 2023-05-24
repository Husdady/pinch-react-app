// Components
import Select from "../../../../components/Select/index";

export default function Header() {
  return (
    <section className="appointments-header d-flex">
      <div className="appointments-wrapper d-flex align-items-center px-4">
        <span className="text-uppercase">APPOINTMENTS</span>
        <Select style={{ width: "40%" }} noSelectionLabel="All" options={[]} />
      </div>

      <button className="connect d-flex align-items-center justify-content-between px-3">
        <span className="me-1">Connect</span>

        <img
          src="https://i.imgur.com/6HqmxDx.png"
          alt="calendar"
          className="object-fit-cover"
        />
      </button>
    </section>
  );
}