// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

function TopContent({ serviceType, customerName }) {
  return (
    <div className="pt-2 top-content text-center">
      <b className="d-block mb-4">CREATE JOB</b>

      <span className="d-block client mb-2">
        <span style={{ color: "#828282" }}>Client:</span> <b>{customerName}</b>
      </span>

      <b className="service">{serviceType}</b>
    </div>
  );
}

TopContent.propTypes = {
  serviceType: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
};

export default memo(TopContent, (prevProps, nextProps) => {
  return (
    prevProps.serviceType === nextProps.serviceType &&
    prevProps.customerName === nextProps.customerName
  );
});
