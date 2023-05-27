/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useMemo, useCallback } from "react";

export default function useServices({ services, onChangeService }) {
  // Define Service options
  const options = useMemo(
    () =>
      services.map((service) => ({
        value: service.id,
        label: service.serviceType,
      })),
    [services]
  );

  // Callback 'onChange' for Services Select component
  const onChange = useCallback(
    (option) => {
      // Value not defined
      if (typeof option.value === "undefined") return;

      // Find service by id
      const service = services.find((item) => item.id === option.value);
      if (typeof service === "undefined") return; // Service not found

      // Execute callback
      onChangeService({
        jobCost: service.cost,
        serviceId: service.id,
        jobDurationTime: service.time,
        serviceType: service.serviceType,
      });
    },
    [services]
  );

  return {
    options: options,
    onChange: onChange
  };
}
