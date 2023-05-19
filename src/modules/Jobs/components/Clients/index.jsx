// Librarys
import { memo } from "react";
import PropTypes from "prop-types";

// Components
import Select from "../../../../components/Select";

// Hooks
import useClients from "./useClients";

function Clients({ onChangeClient }) {
  const { clients, isFetching } = useClients();

  return (
    <Select
      options={clients}
      isLoading={isFetching}
      onChange={onChangeClient}
      textLabel="Client"
      className="mb-3"
    />
  );
}

Clients.propTypes = {
  onChangeClient: PropTypes.func.isRequired,
};

export default memo(Clients);
