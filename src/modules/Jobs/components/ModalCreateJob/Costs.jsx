// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

function Costs({ data }) {
  return (
    <ul className="appointments-costs my-3 list-unstyled little-scrollbar">
      {data.map((item, i) => (
        <li key={i} className="cost-item d-flex justify-content-between">
          <span>
            <span style={{ color: "#a7a7a7" }}>Date:</span>&nbsp;
            <span className="item-date">{item.jobDate}</span>
            <span>{item.jobTime}</span>
          </span>

          <b className="item-cost">$ {item.jobCost}</b>
        </li>
      ))}
    </ul>
  );
}

Costs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(Costs, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
