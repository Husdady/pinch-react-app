// Hooks
import { useCallback } from "react";

/**
 * Hook that implements the logic of the DaysNum component
 * @param {object} params Receive a 'schedule' and 'activeDay 
 * @returns {object} Data
 */
export default function useDaysNum({ schedule, activeDay }) {
  // Check if day its active
  const isActive = useCallback(
    (day) => schedule.some((item) => item.active && item.date === day.date),
    [schedule]
  );

  // Check if day its selected
  const isSelected = useCallback(
    (day) => activeDay !== null && activeDay.id === day.id,
    [activeDay]
  );

  return {
    isActive: isActive,
    isSelected: isSelected
  }
}
