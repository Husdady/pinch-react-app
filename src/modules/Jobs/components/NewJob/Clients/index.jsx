// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../../components/Select";

function Clients({ clientId, clientsData }) {
  const { options, clients, isFetching, onChange } = clientsData;

  return (
    <Select
      options={options}
      isLoading={isFetching}
      selectedValue={clientId}
      arrayDeps={clients}
      onChange={onChange}
      textLabel="Client"
      className="mb-3"
    />
  );
}

Clients.propTypes = {
  clientId: PropTypes.string.isRequired,
  clientsData: PropTypes.object.isRequired,
};

export default memo(Clients, (prevProps, nextProps) => {
  return (
    prevProps.clientId === nextProps.clientId &&
    prevProps.clientsData === nextProps.clientsData
  );
});
