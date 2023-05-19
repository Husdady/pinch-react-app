// Hooks
import { useCallback, useEffect, useMemo, useState } from "react";

// Utils
import fetchproperties from "./fetchProperties";

export default function useProperties({ client, property, onChangeProperty }) {
  const [options, setOptions] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);

  // Define the total rooms (bedrooms and bathrooms)
  const totalRooms = useMemo(() => {
    const item = properties.find((item) => item._id === property); // Get current property
    if (typeof item === "undefined") return null; // Property not found
    return `${item.bedrooms} bedroom / ${item.bathrooms} bathroom`;
  }, [property, properties]);

  // Callback for update property
  const handleOnChange = useCallback((items) => {
    return (option) => {
      if (!("value" in option)) return; // Value field not exists in option

      // Find property by id
      const item = items.find((el) => el._id === option.value);

      // Define services
      const services = typeof item === "undefined" ? [] : item.services || [];

      onChangeProperty({
        property: option.value,
        services: services.map(({ cost, time, serviceType }) => ({
          value: serviceType.replace(/ /gim, "-") + "/" + cost + "/" + time,
          label: serviceType,
        })),
      });
    };
  }, []);

  useEffect(() => {
    let mounted = true; // Component mounted

    if (client !== "") {
      fetchproperties({
        clientId: client,
        onInit: () => {
          setFetching(true);
        },
        onFinally: () => {
          setFetching(false);
        },
        onError: (err) => {
          setError(err);
          setIsError(true);
        },
        onFinish: (result) => {
          setSuccesfully(true);

          if (mounted && "data" in result && Array.isArray(result.data)) {
            // Parse properties
            const apiProperties = result.data.map((item) => ({
              value: item._id,
              label: item.propertyAddress,
            }));

            setProperties(result.data); // Update properties
            setOptions(apiProperties); // Update options
          }
        },
      });
    }

    return () => {
      mounted = false; // Component unmounted
    };
  }, [client]);

  return {
    error: error,
    options: options,
    isError: isError,
    totalRooms: totalRooms,
    properties: properties,
    isFetching: isFetching,
    isSuccesfully: isSuccesfully,
    handleOnChange: handleOnChange(properties),
  };
}
