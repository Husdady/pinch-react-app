// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Hooks
import useClients from "./useClients";

function Clients({ onChangeClient }) {
  const { options, clients, isFetching, onChange } = useClients({
    onChangeClient: onChangeClient
  });

  return (
    <Select
      options={options}
      isLoading={isFetching}
      arrayDeps={clients}
      onChange={onChange}
      textLabel="Client"
      className="mb-3"
    />
  );
}

Clients.propTypes = {
  onChangeClient: PropTypes.func.isRequired,
};

export default memo(Clients);
