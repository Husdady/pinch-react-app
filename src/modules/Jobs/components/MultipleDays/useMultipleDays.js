import { useCallback, useState } from "react";

/**
 * Hook for implements the logic of the MultipleDays component
 */
export default function useMultipleDays() {
  const [show, setShow] = useState(false)

  // Callback for show modal
  const showModal = useCallback(() => setShow(true), [])

  // Callback for hide modal
  const hideModal = useCallback(() => setShow(false), [])

  return {
    show: show,
    showModal: showModal,
    hideModal: hideModal
  }
}
