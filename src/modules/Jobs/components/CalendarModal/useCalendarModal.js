/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useForm } from "react-hook-form";
import { useRef, useCallback, useMemo } from "react";

// Utils
import isObject from "../../../../utils/isObject";
import addZeroToNumber from "../../../../utils/addZeroToNumber";
import { getCurrentMonth, getMonthIndex } from "../Months/utils";
import { getCurrentDay, getMaxDayOfMonth } from "../OneTime/utils";
import { createTimeOptions } from "../Time/utils";

// Constants
import { bookingOptions } from "../Booking/options";
import {
  daysSorted,
  DEFAULT_VALUES,
  DEFAULT_FIRST_HOUR,
  DEFAULT_TOTAL_MONTHS,
  repeatValues,
} from "../Calendar/constants";
import getCurrentDate from "../../../../utils/getCurrentDate";
import validateHourRange from "../../../../utils/validateHourRange";
import getMaxMonthInNextDates from "../../../../utils/getMaxMonthInNextDates";
import { getSpecificWeekday } from "../../../../utils/getSpecificWeekday";

/**
 * Hook that implemenets the logic of the NewJob component
 * @returns {object} Object
 */
export default function useNewJob() {
  const ref = useRef(null);

  // Define form state
  const { watch, register, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  return {
    ref: ref,
    watch: watch,
    submit: submit,
    register: register,
    handleSubmit: handleSubmit,
    handleOnChange: handleOnChange,
    onTriggerWidth: onTriggerWidth,
    validateDay: validateDay,
    onToggleDay: onToggleDay,
    onChangeTime: onChangeTime,
    onChangeMonth: onChangeMonth,
    onChangeClient: onChangeClient,
    onChangeService: onChangeService,
    onChangeBooking: onChangeBooking,
    onChangeProperty: onChangeProperty,
    isDisabledSubmitButton: isDisabledSubmitButton
  };
}
