/* eslint-disable react/no-typos */
// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Hooks
import useServices from "./useServices";

// Components
import Select from "../../../../../components/Select";

function Services({ jobCost, serviceId, ...props }) {
  const { options, onChange } = useServices(props);

  return (
    <div className="mb-2">
      <Select
        options={options}
        onChange={onChange}
        selectedValue={serviceId}
        textLabel="Service"
      />

      {typeof jobCost === 'number' && (
        <span className="cost d-block mt-1 text-end">
          $ {jobCost.toFixed(2)}
        </span>
      )}
    </div>
  );
}

Services.propTypes = {
  jobCost: PropTypes.number,
  serviceId: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeService: PropTypes.func.isRequired,
};

export default memo(Services, (prevProps, nextProps) => {
  return (
    prevProps.jobCost === nextProps.jobCost &&
    prevProps.services === nextProps.services &&
    prevProps.serviceId === nextProps.serviceId
  );
});
