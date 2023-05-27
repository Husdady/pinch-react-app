/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import useClickOutside from "./useClickOutside";
import { useMemo, useState, useCallback, useEffect } from "react";

/**
 * Hook that implements the logic of the Select component
 * @param {object} props Some props of the Select component
 * @returns {object} Object
 */
export default function useSelect({
  options,
  onChange,
  arrayDeps,
  selectedValue,
  noSelectValues,
  noSelectionLabel,
}) {
  const [value, setValue] = useState(selectedValue);
  const [isVisibleOptions, setVisibleOptions] = useState(false);

  // Callback for hide options
  const hideOptions = useCallback(() => setVisibleOptions(false), []);

  // Callback for show/hide options
  const triggerOptions = useCallback(
    () => setVisibleOptions((state) => !state),
    []
  );

  // Callback 'change' when pick different value
  const handleOnChange = useCallback(
    (option) => {
      setVisibleOptions(false); // Hide options
      if (!("value" in option)) return; // Value not exists in option
      if (value === option.value) return; // Same value selected

      if (typeof onChange === "function") onChange(option); // Execute callback

      // Value not selectable
      const valueNoSelectable = noSelectValues.includes(option.value);
      if (valueNoSelectable) return; // Stop function

      setValue(option.value); // Update current value
    },
    [value, arrayDeps]
  );

  // Define label
  const label = useMemo(() => {
    if (typeof options === "undefined") return noSelectionLabel;
    // if (typeof selectedValue === "undefined") return noSelectionLabel;

    // Find default option
    const item = options.find(
      (option) => option.value === selectedValue || option.value === value
    );

    // Return founded item
    if (typeof item !== "undefined") return item.label;

    return noSelectionLabel;
  }, [options, value, selectedValue, noSelectionLabel]);

  // Hide options when click is outside list options
  const ref = useClickOutside({
    callback: hideOptions,
    isOpen: isVisibleOptions,
  });

  useEffect(() => {
    let mounted = true; // Component mounted

    // Update selected value if component is mounted
    if (mounted && value !== selectedValue) {
      setValue(selectedValue); // Update value
    }

    return () => {
      mounted = false;
    };
  }, [selectedValue]);

  return {
    ref: ref,
    label: label,
    value: value,
    hideOptions: hideOptions,
    handleOnChange: handleOnChange,
    triggerOptions: triggerOptions,
    isVisibleOptions: isVisibleOptions,
  };
}
