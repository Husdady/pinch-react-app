/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useState, useMemo, useCallback, useEffect } from "react";

// Utils
import isObject from "../../../../utils/isObject";
import { pickCurrentDay, calculateMonthDays } from "./utils";

// Constants
import { months } from "./constants";

export const currentMonth = months[0];

/**
 * Hook for implements logic of the Calendar
 * @param {object} params Callback 'onSelectDay'
 * @returns {object} Data
 */
export default function useCalendar({ onSelectDay, onLoadActiveDay }) {
  const [month, setMonth] = useState(currentMonth); // Define first month

  const [daysNum, setDaysNum] = useState(() => {
    return calculateMonthDays({ month: currentMonth.value });
  });

  const [activeDay, setActiveDay] = useState(() => {
    return pickCurrentDay({ daysNum: daysNum })
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

  // Callback for select day
  const handleSelectDay = useCallback((day) => {
    if (day === null) return // Day not exists
    if (day.blocked) return // Day blocked

    // The same day has been selected
    if (activeDay !== null && activeDay.id === day.id) return

    setActiveDay(day) // Update active day
    onSelectDay(day) // Execute callback 'onSelectDay'
  }, [activeDay])

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

  useEffect(() => {
    onLoadActiveDay(activeDay)
  }, [])

  return {
    month: month,
    daysNum: daysNum,
    activeDay: activeDay,
    handleSelectDay: handleSelectDay,
    disablePrevChevronIcon: disablePrevChevronIcon,
    disableNextChevronIcon: disableNextChevronIcon,
    prevMonth: changeMonth({ actionType: "decrement" }),
    nextMonth: changeMonth({ actionType: "increment" }),
  };
}
