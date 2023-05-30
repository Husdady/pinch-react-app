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
      activeAutoScrollbar
    />
  );
}

Time.propTypes = {
  style: PropTypes.object,
  onChangeTime: PropTypes.func.isRequired,
  selectedTime: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(Time, (prevProps, nextProps) => {
  return (
    prevProps.options === nextProps.options &&
    prevProps.selectedTime === nextProps.selectedTime
  );
});
