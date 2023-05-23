// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

export const timeStyle = { width: "80%" };

function Time({ style, options, selectedTime, onChangeTime }) {
  return (
    <Select
      style={style}
      options={options}
      onChange={onChangeTime}
      selectedValue={selectedTime}
      className="schedule"
    />
  );
}

Time.propTypes = {
  style: PropTypes.object,
  selectedTime: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeTime: PropTypes.func.isRequired,
};

export default memo(Time, (prevProps, nextProps) => {
  return (
    prevProps.selectedTime === nextProps.selectedTime &&
    JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options)
  );
});
