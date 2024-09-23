import { useEffect, useState } from "react";
import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";
import useValidation from "./useValidation";
import usePopulate from "../../fetch/form/usePopulate";

const useForm = (monthYearChoiceFormat, categoryChoice) => {
  const defaultInput = { budgetAmount: "" };

  const [currentInput, setInput] = useState(defaultInput);
  const [isSubmit, setSubmit] = useState(false);

  const { setStorage } = useStorageContext();
  const { categoryContext: { label: budgetCategory } = {} } =
    categoryChoice || {};

  const {
    populate: { budgetId, budgetAmount },
    setPopulateFields,
  } = usePopulate(defaultInput, "budget");

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
            budgetForMonth: monthYearChoiceFormat,
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
    setPopulateFields,
    setError,
    handleAddBudget,
    handleEditBudget,
    handleDeleteBudget,
    handleInputChange,
  };
};

export default useForm;
