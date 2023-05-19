// Hooks
import { useForm } from "react-hook-form";
import { useRef, useCallback } from "react";

// Constants
import { DEFAULT_VALUES } from "./constants";

/**
 * Hook that implemenets the logic of the NewJob component
 * @returns {object} Object
 */
export default function useNewJob() {
  const ref = useRef(null);

  const {
    watch,
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  // Callback 'change' for update Select field
  const handleOnChange = useCallback((field) => {
    return (option) => {
      if (!("value" in option)) return; // 'Value' field not exists in option
      setValue(field, option.value); // Update field
    };
  }, []);

  // Callback 'change' for update property and services
  const onChangeProperty = useCallback(({ property, services }) => {
    setValue('property', property); // Update property
    setValue('services', services); // Update services
  }, []);

  // Callback for trigger with of the component
  const onTriggerWidth = useCallback(() => {
    if (ref.current === null) return; // Ref is null
    const jobContainer = ref.current; // Get container

    if (!jobContainer.style.width) {
      setValue("minimizeWidth", true);
      jobContainer.style.width = "150px";
    } else {
      setValue("minimizeWidth", false);
      jobContainer.style = {};
    }
  }, []);

  return {
    ref: ref,
    watch: watch,
    handleOnChange: handleOnChange,
    onTriggerWidth: onTriggerWidth,
    onChangeProperty: onChangeProperty
  };
}
