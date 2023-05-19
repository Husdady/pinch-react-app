// Librarys
import { memo, Fragment } from "react";
import PropTypes from "prop-types";

// Components
import OneTime from "./OneTime";
import MultipleDays from "./MultipleDays";
import RecurrentJobs from "./RecurrentJobs";
import Select from "../../../../components/Select";

// Constants
import { options } from "./options";

// Styles
import './styles.css';

function Booking({ booking, onChangeBooking }) {
  return (
    <Fragment>
      <Select
        textLabel="Booking"
        className="mb-3"
        options={options}
        onChange={onChangeBooking}
      />
      
      {booking === 'one-time' && <OneTime />}
      {booking === 'multiple-days' && <MultipleDays />}
      {booking === 'recurrent-jobs' && <RecurrentJobs />}
    </Fragment>
  );
}

Booking.propTypes = {
  booking: PropTypes.string.isRequired,
  onChangeBooking: PropTypes.func.isRequired
};

export default memo(Booking, (prevProps, nextProps) => {
  return prevProps.booking === nextProps.booking
});
