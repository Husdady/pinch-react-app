// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Time from "../Time";
import Calendar from "../Calendar";
import AppointmentsList from "./AppointmentsList";
import Modal from "../../../../components/Modal";

// Constants
import { PINK_PLUS_ICON } from "../../../../assets/data/constants";

// Styles
import "./styles.css";

const appointments = [
  {
    _id: "022",
    customerName: "Mike",
    jobSchedule: "03:00 PM - 04:00 PM",
  },
  {
    _id: "023",
    customerName: "Imanol",
    active: true,
    jobSchedule: "04:00 PM - 05:00 PM",
  },
  // {
  //   _id: '024',
  //   customerName: 'Imanol',
  //   active: true,
  //   jobSchedule: '04:00 PM - 05:00 PM'
  // },
  // {
  //   _id: '025',
  //   customerName: 'Imanol',
  //   active: true,
  //   jobSchedule: '04:00 PM - 05:00 PM'
  // },
  // {
  //   _id: '026',
  //   customerName: 'Imanol',
  //   active: true,
  //   jobSchedule: '04:00 PM - 05:00 PM'
  // },
  // {
  //   _id: '027',
  //   customerName: 'Imanol',
  //   active: true,
  //   jobSchedule: '04:00 PM - 05:00 PM'
  // }
];

function CalendarModal({ show, onHide, timeId, timeOptions, onChangeTime }) {
  return (
    <Modal centered show={show} onHide={onHide} className="calendar-modal">
      <div className="calendar-content d-flex pt-2 pb-3">
        <section className="calendar-container">
          <Calendar />
        </section>

        <section className="calendar-appointments">
          <div className="calendar-appointments-content">
            <div className="calendar-appointments-header p-2 d-flex align-items-center">
              <Time
                options={timeOptions}
                selectedTime={timeId}
                onChangeTime={onChangeTime}
                style={{ width: "100%" }}
              />

              <img
                role="button"
                className="ms-2"
                alt="plus-icon"
                src={PINK_PLUS_ICON}
              />
            </div>

            <AppointmentsList appointments={appointments} />
          </div>

          <button type="submit" className="modal-calendar-save">
            Save
          </button>
        </section>
      </div>
    </Modal>
  );
}

CalendarModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  timeId: PropTypes.string.isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeTime: PropTypes.func.isRequired,
};

export default memo(CalendarModal, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.timeId === nextProps.timeId &&
    JSON.stringify(prevProps.timeOptions) ===
      JSON.stringify(nextProps.timeOptions)
  );
});
