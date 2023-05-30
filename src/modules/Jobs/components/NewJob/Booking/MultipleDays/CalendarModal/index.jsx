// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Time from "../../../../Time";
import Calendar from "../Calendar/index";
import AppointmentsList from "./AppointmentsList";
import Modal from "../../../../../../../components/Modal";

// Hooks
import useCalendarModal from "./useCalendarModal";

// Constants
import { timeStyle } from "./constants";
import { PINK_PLUS_ICON } from "../../../../../../../assets/data/constants";

// Styles
import "./styles.css";

function CalendarModal({
  show,
  onHide,
  schedule,
  timeId,
  timeOptions,
  appointment,
  appointmentsForm,
  updateDate,
  updateDayAndMonth,
  onChangeTime,
  setAppointments,
  removeAppointmentById,
}) {
  const {
    watch,
    submit,
    handleSubmit,
    appointments,
    disableSubmitBtn,
    addNewAppointment,
    onSelectDay,
    onLoadActiveDay,
    handleHideModal,
    handleChangeTime,
    onSelectAppointment,
    onRemoveAppointment,
  } = useCalendarModal({
    schedule: schedule,
    timeId: timeId,
    timeOptions: timeOptions,
    appointment: appointment,
    appointmentsForm: appointmentsForm,
    updateDate: updateDate,
    updateDayAndMonth: updateDayAndMonth,
    onHideModal: onHide,
    onChangeTime: onChangeTime,
    setAppointments: setAppointments,
    removeAppointmentById: removeAppointmentById,
  });

  return (
    <Modal
      centered
      show={show}
      onHide={handleHideModal}
      className="calendar-modal"
    >
      <form noValidate className="calendar-content d-flex pt-2 pb-3">
        <section className="calendar-container">
          <Calendar
            schedule={watch("schedule")}
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

          <button
            type="button"
            className="modal-calendar-save"
            disabled={disableSubmitBtn}
            onClick={() => handleSubmit(submit)()}
          >
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
  appointmentsForm: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateDate: PropTypes.func.isRequired,
  updateDayAndMonth: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  setAppointments: PropTypes.func.isRequired,
  removeAppointmentById: PropTypes.func.isRequired,
};

export default memo(CalendarModal, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.timeId === nextProps.timeId &&
    prevProps.appointment === nextProps.appointment &&
    prevProps.appointmentsForm === nextProps.appointmentsForm &&
    prevProps.schedule === nextProps.schedule &&
    prevProps.timeOptions === nextProps.timeOptions
  );
});
