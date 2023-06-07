import { useState } from "react";

function Popup({initialIsOpen}) {

  const [isOpen, setIsOpen] = useState(initialIsOpen);

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return {isOpen, open, close}
}

export default Popup
