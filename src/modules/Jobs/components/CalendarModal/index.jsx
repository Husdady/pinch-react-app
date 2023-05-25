// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Time from "../Time";
import Calendar from "../Calendar";
import AppointmentsList from "./AppointmentsList";
import Modal from "../../../../components/Modal";

import useCalendarModal from "./useCalendarModal";

// Constants
import { PINK_PLUS_ICON } from "../../../../assets/data/constants";

// Styles
import "./styles.css";
import { timeStyle } from "./constants";

function CalendarModal({
  show,
  onHide,
  schedule,
  timeId,
  timeOptions,
  appointment,
  updateDate,
  onChangeTime,
}) {
  const {
    watch,
    submit,
    handleSubmit,
    appointments,
    addNewAppointment,
    onSelectDay,
    onLoadActiveDay,
    handleChangeTime,
    onSelectAppointment,
    onRemoveAppointment,
  } = useCalendarModal({
    show: show,
    schedule: schedule,
    timeId: timeId,
    timeOptions: timeOptions,
    appointment: appointment,
    updateDate: updateDate,
    onChangeTime: onChangeTime,
  });

  return (
    <Modal centered show={show} onHide={onHide} className="calendar-modal">
      <form
        noValidate
        onSubmit={handleSubmit(submit)}
        className="calendar-content d-flex pt-2 pb-3"
      >
        <section className="calendar-container">
          <Calendar
            schedule={schedule}
            onSelectDay={onSelectDay}
            onLoadActiveDay={onLoadActiveDay}
          />
        </section>

        <section className="calendar-appointments">
          <div className="calendar-appointments-content">
            <div className="calendar-appointments-header p-2 d-flex align-items-center">
              <Time
                style={timeStyle}
                options={timeOptions}
                selectedTime={timeId}
                onChangeTime={handleChangeTime}
              />

              <img
                role="button"
                className="ms-2"
                alt="plus-icon"
                onClick={addNewAppointment}
                src={PINK_PLUS_ICON}
              />
            </div>

            <AppointmentsList
              appointments={appointments}
              onSelectAppointment={onSelectAppointment}
              onRemoveAppointment={onRemoveAppointment}
              activeAppointment={watch("selectedAppointment")}
            />
          </div>

          <button type="submit" className="modal-calendar-save">
            Save
          </button>
        </section>
      </form>
    </Modal>
  );
}

CalendarModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  timeId: PropTypes.string.isRequired,
  appointment: PropTypes.object.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  timeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateDate: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
};

export default memo(CalendarModal, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.timeId === nextProps.timeId &&
    prevProps.appointment === nextProps.appointment &&
    JSON.stringify(prevProps.schedule) === JSON.stringify(nextProps.schedule) &&
    JSON.stringify(prevProps.timeOptions) ===
      JSON.stringify(nextProps.timeOptions)
  );
});
