import { useForm } from "react-hook-form";

export default function useAppointmentsForm() {
  // Define form state
  const { watch, register, setValue, handleSubmit } = useForm({
    defaultValues: {}
  });

  return {
    watch: watch,
    register: register,
    handleSubmit: handleSubmit
  }
}
