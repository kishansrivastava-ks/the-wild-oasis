import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
        // if the click does not happen inside the ref element (the modal) -> the close fn would be called
      }
      document.addEventListener("click", handleClick, listenCapturing);
      // by true, the event would be handled in the capturing phase and not in the bubbling phase because if it is captured in the bubbling phase, the modal window would immediately close upon clicking the add new cabin btn because the click would be detected outside of the modal window

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
