import { useCallback, useState } from "react";

const Validation = () => {
  const [enteredValue, setEnteredValue] = useState({});
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setEnteredValue({
      ...enteredValue,
      [name]: value,
    });

    setError({
      ...error,
      [name]: evt.target.ValidationMessage,
    });

    setIsValid(evt.target.closest(".form").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setEnteredValue(newValues);
      setError(newErrors);
      setIsValid(newIsValid);
    },
    [setEnteredValue, setError, setIsValid]
  )

  return {
    enteredValue,
    error,
    isValid,
    handleChange,
    resetForm,
  }
}

export default Validation
