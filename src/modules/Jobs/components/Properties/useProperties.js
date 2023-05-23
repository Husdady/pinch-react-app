/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useCallback, useEffect, useMemo, useState } from "react";

// Utils
import fetchproperties from "./fetchProperties";
import generateUniqueId from "../../../../utils/generateUniqueId";
import isObject from "../../../../utils/isObject";

export default function useProperties({
  clientId,
  propertyId,
  onChangeProperty,
}) {
  const [options, setOptions] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);

  // Define the total rooms (bedrooms and bathrooms)
  const totalRooms = useMemo(() => {
    const item = properties.find((item) => item._id === propertyId); // Get current property
    if (typeof item === "undefined") return null; // Property not found
    return `${item.bedrooms} bedroom / ${item.bathrooms} bathroom`;
  }, [propertyId, properties]);

  // Callback for update property
  const handleOnChange = useCallback(
    (option) => {
      if (properties.length === 0) return; // Empty properties
      if (!("value" in option)) return; // Value field not exists in option

      // Find property by id
      const property = properties.find((item) => item._id === option.value);

      // Property not found
      if (typeof property === "undefined") return;

      // Get services of property
      const services = property.services.map((service) => ({
        ...service,
        id: generateUniqueId(),
      }));

      // Get first service of first property
      const firstService = services[0] || {};

      onChangeProperty({
        services: services,
        serviceId: firstService.id,
        serviceType: firstService.serviceType,
        jobCost: firstService.cost,
        jobDurationTime: firstService.time,
        propertyId: property._id,
        propertyName: property.propertyName,
      });
    },
    [properties]
  );

  useEffect(() => {
    let mounted = true; // Component mounted

    if (clientId !== "") {
      fetchproperties({
        clientId: clientId,
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

            setOptions(apiProperties); // Update options
            setProperties(result.data); // Update properties

            const firstProperty = result.data[0]; // Get first property

            // Validate first property
            if (isObject(firstProperty)) {
              // Get services of first property
              const services = firstProperty.services.map((service) => ({
                ...service,
                id: generateUniqueId(),
              }));

              // Get first service of first property
              const firstService = services[0] || {};

              // Select first property
              onChangeProperty({
                services: services,
                serviceId: firstService.id,
                serviceType: firstService.serviceType,
                jobCost: firstService.cost,
                jobDurationTime: firstService.time,
                propertyId: firstProperty._id,
                propertyName: firstProperty.propertyName,
              });
            }
          }
        },
      });
    }

    return () => {
      mounted = false; // Component unmounted
    };
  }, [clientId]);

  return {
    error: error,
    options: options,
    isError: isError,
    totalRooms: totalRooms,
    properties: properties,
    isFetching: isFetching,
    isSuccesfully: isSuccesfully,
    handleOnChange: handleOnChange,
  };
}
