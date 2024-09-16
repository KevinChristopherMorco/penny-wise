import React, { useState } from "react";

const useValidation = () => {
  const defaultError = { budgetAmount: false };
  const [error, setError] = useState(defaultError);

  const checkErrors = (inputs) => {
    const { budgetAmount } = inputs;

    const error = {
      errorBudgetAmount: !Boolean(budgetAmount) || parseFloat(budgetAmount) < 1,
    };

    setError(error);
    return error.errorBudgetAmount;
  };

  return { defaultError, error, setError, checkErrors };
};

export default useValidation;
