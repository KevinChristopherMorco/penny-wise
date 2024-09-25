import { useEffect, useState } from "react";
import useValidation from "./useValidation";

const useForm = () => {
  const [currentInput, setInput] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const { error, checkErrors } = useValidation();

  const handleAddSetting = (event) => {
    event.preventDefault();
    setIsSubmit(true);

    if (checkErrors(currentInput)) return;

    localStorage.setItem("username", JSON.stringify(currentInput));
    setIsSubmit(false);
  };

  useEffect(() => {
    if (!isSubmit) return;
    checkErrors(currentInput);
  }, [currentInput]);

  return { currentInput, error, handleAddSetting, handleInputChange };
};

export default useForm;
