// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Hooks
import useClients from "./useClients";

function Clients({ clientId, onChangeClient }) {
  const { options, clients, isFetching, onChange } = useClients({
    onChangeClient: onChangeClient
  });

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
  onChangeClient: PropTypes.func.isRequired,
};

export default memo(Clients, (prevProps, nextProps) => {
  return prevProps.clientId === nextProps.clientId
});
