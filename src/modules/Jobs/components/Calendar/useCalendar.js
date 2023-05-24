// Hooks
import { useState, useMemo, useCallback } from "react";

// Utils
import calculateMonthDays from "./utils";
import isObject from "../../../../utils/isObject";

// Constants
import { months } from "./constants";

export const currentMonth = months[0];

/**
 * Hook for implements logic of the Calendar
 * @returns {object} Data
 */
export default function useCalendar() {
  const [activeDay, setActiveDay] = useState(null);
  const [month, setMonth] = useState(currentMonth); // Define first month

  const [daysNum, setDaysNum] = useState(() => {
    return calculateMonthDays({ month: currentMonth.value });
  });

  // Disable prev chevron icon
  const disablePrevChevronIcon = useMemo(() => {
    const { index } = month; // Get month index
    return index === 0;
  }, [month]);

  // Disable next chevron icon
  const disableNextChevronIcon = useMemo(() => {
    const { index } = month; // Get month index
    return index === months.length - 1;
  }, [month]);

  // Callback for get prev month
  const changeMonth = useCallback(
    ({ actionType }) => {
      return () => {
        const { index } = month; // Get month index
        if (actionType === "decrement" && index === 0) return; // First month, cannot prev month
        if (actionType === "increment" && index === months.length - 1) return; // Last month, cannot next month

        let newMonth = months[index - 1]; // Get prev month

        // Get next month
        if (actionType === "increment") {
          newMonth = months[index + 1];
        }

        if (!isObject(newMonth)) return; // New month is not a object
        setMonth(newMonth);

        // Calculate new days of month
        const calculatedDays = calculateMonthDays({ month: newMonth.value })
        setDaysNum(calculatedDays) // Update days
        
      };
    },
    [month]
  );

  return {
    month: month,
    daysNum: daysNum,
    activeDay: activeDay,
    setActiveDay: setActiveDay,
    disablePrevChevronIcon: disablePrevChevronIcon,
    disableNextChevronIcon: disableNextChevronIcon,
    prevMonth: changeMonth({ actionType: "decrement" }),
    nextMonth: changeMonth({ actionType: "increment" }),
  };
}
