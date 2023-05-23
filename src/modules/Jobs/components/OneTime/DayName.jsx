// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Utils
import { getDayName } from "./utils";

function DayName({ day, month }) {
  return <span className="day me-2">{getDayName({ day: day, month: month })}</span>;
}

DayName.propTypes = {
  month: PropTypes.string.isRequired,
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default memo(DayName, (prevProps, nextProps) => {
  return prevProps.day === nextProps.day && prevProps.month === nextProps.month;
});
