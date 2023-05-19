/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 * @param {object} params Callback and Boolean
 * @return {RefObject} HTML Tag ref
 */
export default function useClickOutside({ isOpen, callback }) {
  const ref = useRef(null);

  // Callback that executes when is outside of the ref
  const handleClickOutside = useCallback(e => {
    if (isOpen && ref !== null && !ref.current.contains(e.target)) {
      if (typeof callback === 'function') callback(); // Execute callback
    }
  }, [isOpen]);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return ref;
}
