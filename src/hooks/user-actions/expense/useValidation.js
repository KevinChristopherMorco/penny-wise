import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchStorage from "../../fetch/useFetchStorage";

const useValidation = () => {
  const defaultError = {
    errorExpenseName: false,
    errorExpenseAmount: false,
    errorExpenseCategory: false,
    errorExpenseAccount: false,
  };

  const [error, setError] = useState(defaultError);
  const { accounts } = useFetchStorage();

  const checkErrors = (inputs, type, populate) => {
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

    if (type === "add") {
      return (
        error.errorExpenseName ||
        error.errorExpenseAmount ||
        error.errorExpenseCategory ||
        error.errorExpenseAccount
      );
    }

    if (type === "edit") {
      const account = accounts.find(
        (account) => account.id === populate.expenseAccount
      );

      const isSufficientFunds =
        parseFloat(account.accountBalance) -
          (parseFloat(expenseAmount) - parseFloat(populate.expenseAmount)) >=
        0;

      const isValueChange =
        expenseName !== populate.expenseName ||
        expenseAmount !== populate.expenseAmount ||
        expenseCategory !== populate.expenseCategory;

      error.errorIsSufficientFunds = !isSufficientFunds;
      error.isValueChange = !isValueChange;

      return (
        error.errorExpenseName ||
        error.errorExpenseAmount ||
        error.errorExpenseCategory ||
        error.errorIsSufficientFunds ||
        error.isValueChange
      );
    }
  };

  return { defaultError, error, setError, checkErrors };
};

export default useValidation;
