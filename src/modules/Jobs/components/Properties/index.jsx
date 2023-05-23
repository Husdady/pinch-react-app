// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Hooks
import useProperties from "./useProperties";

function Properties(props) {
  const { options, isFetching, properties, handleOnChange, totalRooms } =
    useProperties(props);

  return (
    <div className="mb-2">
      <Select
        options={options}
        isLoading={isFetching}
        selectedValue={props.propertyId}
        onChange={handleOnChange}
        arrayDeps={properties}
        textLabel="Property"
      />

      {totalRooms !== null && !isFetching && <span className="total-rooms d-block mt-1 text-end">{totalRooms}</span>}
    </div>
  );
}

Properties.propTypes = {
  clientId: PropTypes.string.isRequired,
  propertyId: PropTypes.string.isRequired,
  onChangeProperty: PropTypes.func.isRequired
};

export default memo(Properties, (prevProps, nextProps) => {
  return (
    prevProps.clientId === nextProps.clientId &&
    prevProps.propertyId === nextProps.propertyId
  );
});
