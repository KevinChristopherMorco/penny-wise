import React, { useEffect, useState } from "react";
import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";
import useValidation from "./useValidation";

const useForm = (formattedYear, categoryChoice) => {
  const defaultInput = { budgetAmount: "" };

  const [currentInput, setInput] = useState(defaultInput);
  const [isSubmit, setSubmit] = useState(false);

  const { setStorage } = useStorageContext();
  const {
    category: { label: budgetCategory },
  } = categoryChoice;

  const { defaultError, error, setError, checkErrors } = useValidation();

  const handleAddBudget = (event) => {
    event.preventDefault();

    const hasError = checkErrors(currentInput);

    setSubmit(true);

    if (hasError) return;

    const dateNow = new Date().toUTCString();

    setStorage((prev) => {
      return {
        ...prev,
        budget: [
          ...prev.budget,
          {
            ...currentInput,
            budgetId: `acc${uuidv4().split("-").join("")}${Date.now()}`,
            budgetForMonth: formattedYear,
            budgetCategory: budgetCategory,
            dateCreated: dateNow,
            dateUpdated: dateNow,
          },
        ],
      };
    });

    setSubmit(false);
  };

  const handleInputChange = (event) => {
    console.log(currentInput);
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (!isSubmit) return;
    checkErrors(currentInput);
  }, [currentInput]);

  return {
    defaultInput,
    currentInput,
    setInput,
    defaultError,
    error,
    setError,
    handleAddBudget,
    handleInputChange,
  };
};

export default useForm;
