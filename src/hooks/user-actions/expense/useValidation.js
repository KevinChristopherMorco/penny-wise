import { useState } from "react";

const useValidation = () => {
  const defaultError = {
    errorExpenseName: false,
    errorExpenseAmount: false,
    errorExpenseCategory: false,
    errorExpenseAccount: false,
  };

  const [error, setError] = useState(defaultError);

  const checkErrors = (inputs) => {
    const { expenseName, expenseAmount, expenseCategory, expenseAccount } =
      inputs;

    const error = {
      errorExpenseName: !Boolean(expenseName),
      errorExpenseAmount:
        !Boolean(parseFloat(expenseAmount)) || parseFloat(expenseAmount) < 1,
      errorExpenseCategory: !Boolean(expenseCategory),
      errorExpenseAccount: !Boolean(expenseAccount),
    };

    setError(error);

    return (
      error.errorAccountName ||
      error.errorAccountBalance ||
      error.errorExpenseCategory ||
      error.errorExpenseAccount
    );
  };

  return { defaultError, error, setError, checkErrors };
};

export default useValidation;
