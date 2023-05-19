// Librarys
import { memo, useMemo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

function Services({ service, options, onChangeService }) {
  // Define item
  const existsItem = useMemo(
    () => options.some((option) => option.value === service),
    [service, options]
  );

  return (
    <div className="mb-2">
      <Select
        options={options}
        onChange={onChangeService}
        textLabel="Service"
      />

      {existsItem && service !== "" && (
        <span className="cost d-block mt-1 text-end">
          $ {Number(service?.split("/").slice(-2, -1)[0])?.toFixed(2)}
        </span>
      )}
    </div>
  );
}

Services.propTypes = {
  service: PropTypes.string.isRequired,
  onChangeService: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(Services, (prevProps, nextProps) => {
  return (
    prevProps.options === nextProps.options &&
    prevProps.service === nextProps.service
  );
});
