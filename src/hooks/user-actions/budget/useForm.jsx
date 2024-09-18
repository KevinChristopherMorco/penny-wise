import React, { useEffect, useState } from "react";
import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";
import useValidation from "./useValidation";
import usePopulate from "./usePopulate";

const useForm = (formattedYear, categoryChoice) => {
  const defaultInput = { budgetAmount: "" };

  const [currentInput, setInput] = useState(defaultInput);
  const [isSubmit, setSubmit] = useState(false);

  const {
    storage: { budget },
    setStorage,
  } = useStorageContext();
  const { category: { label: budgetCategory } = {} } = categoryChoice || {};
  const {
    populateBudget: { budgetId, budgetAmount },
    setPopulateBudget,
  } = usePopulate(defaultInput);

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

  const handleEditBudget = (event) => {
    event.preventDefault();

    const hasError = checkErrors(currentInput);

    setSubmit(true);

    if (hasError) return;

    const dateNow = new Date().toUTCString();

    setStorage((prev) => {
      return {
        ...prev,
        budget: prev.budget.map((budget) => {
          console.log(budget.budgetId === budgetId);
          return budget.budgetId === budgetId
            ? {
                ...budget,
                budgetAmount: currentInput.budgetAmount,
                dateUpdated: dateNow,
              }
            : budget;
        }),
      };
    });
    setSubmit(false);
  };

  const handleDeleteBudget = (budgetId) => {
    setStorage((prev) => {
      return {
        ...prev,
        budget: prev.budget.filter((budget) => budget.budgetId !== budgetId),
      };
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setInput((prev) => {
      return {
        ...prev,
        budgetAmount: budgetAmount,
      };
    });
  }, [budgetId]);

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
    setPopulateBudget,
    setError,
    handleAddBudget,
    handleEditBudget,
    handleDeleteBudget,
    handleInputChange,
  };
};

export default useForm;
