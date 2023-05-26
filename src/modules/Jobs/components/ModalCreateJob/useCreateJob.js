/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useCallback } from "react";
import { useForm } from "react-hook-form";

// Constants
import { DEFAULT_VALUES } from "./constants";

/**
 * Hook for implements the logic of the CreateJob component
 * @param {object} params Receive callbacks 'createJob' and 'onHideModal'
 * @returns {object} Data
 */
export default function useCreateJob({
  createJob,
  appointments,
  onHideModal,
  clearAppointments,
}) {
  // Define form state
  const { watch, register, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  // Event 'change' in Select ConfirmationBy
  const onChangeConfirmationBy = useCallback((option) => {
    if (option.value === null) return;
    setValue("confirmationBy", option.value);
  }, []);

  // Event 'change' in Select ConfirmationBy
  const onToggleCheckboxOption = useCallback((e) => {
    setValue(e.target.name, e.target.checked);
  }, []);

  // Event 'submit' in the form
  const onSubmit = useCallback(() => {
    const callback = createJob({
      appointments: appointments,
      onHideModal: onHideModal,
      clearAppointments: clearAppointments,
    });

    handleSubmit(callback)();
  }, []);

  return {
    watch: watch,
    register: register,
    onSubmit: onSubmit,
    onToggleCheckboxOption: onToggleCheckboxOption,
    onChangeConfirmationBy: onChangeConfirmationBy,
  };
}
