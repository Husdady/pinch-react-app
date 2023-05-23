// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Utils
import { getMonths } from "./utils";

export const options = getMonths();
export const style = { width: "100%" };

function Months({ onChange, selectedMonth }) {
  return (
    <Select
      options={options}
      onChange={onChange}
      selectedValue={selectedMonth}
      className="me-2 pick-day"
      style={style}
    />
  );
}

Months.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string.isRequired,
};

export default memo(Months, (prevProps, nextProps) => {
  return prevProps.selectedMonth === nextProps.selectedMonth;
});
