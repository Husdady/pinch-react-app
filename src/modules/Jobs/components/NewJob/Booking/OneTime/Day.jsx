// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

const style = { width: 30, height: 30 }

function Day({ register, validateDay }) {
  return (
    <input
      {...register('day')}
      type="number"
      id="day-num"
      style={style}
      onBlur={validateDay}
      className="text-center day-num"
    />
  );
}

Day.propTypes = {
  register: PropTypes.func.isRequired,
  validateDay: PropTypes.func.isRequired
};

export default memo(Day);
