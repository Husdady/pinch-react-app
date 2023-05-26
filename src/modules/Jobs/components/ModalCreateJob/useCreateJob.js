/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useCallback } from "react";
import { useForm } from "react-hook-form";

// Utils
import { parseAppointments } from "./utils";
import postAppointments from "./postAppointments";

// Constants
import { DEFAULT_VALUES } from "./constants";

/**
 * Hook for implements the logic of the CreateJob component
 * @returns
 */
export default function useCreateJob({ appointments }) {
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
  const submit = useCallback(
    async (formState) => {
      // Parse appointments
      const parsedAppointments = parseAppointments({
        appointments: appointments,
        notifications: formState.notifications,
        confirmation: formState.confirmation,
        confirmationBy: formState.confirmationBy,
      });

      // console.log('[NEW_ITEMS]', parsedAppointments)

      // Make request for create new job
      const result = await postAppointments({ appointments: parsedAppointments })

      console.log('[RESULT]', result)
    },
    [appointments]
  );

  return {
    watch: watch,
    submit: submit,
    register: register,
    handleSubmit: handleSubmit,
    onToggleCheckboxOption: onToggleCheckboxOption,
    onChangeConfirmationBy: onChangeConfirmationBy,
  };
}
