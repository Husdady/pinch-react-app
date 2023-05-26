// Librarys
import { useRef, useState, useCallback } from "react";

/**
 * Hook for implements the logic of the Info component
 * @returns {object} Data
 */
export default function useInfo() {
  const target = useRef(null);
  const [show, setShow] = useState(false);

  // Callback for toogle show tooltip
  const toggleShow = useCallback(() => {
    setShow((state) => !state);
  }, []);

  return {
    show: show,
    target: target,
    toggleShow: toggleShow,
  };
}
