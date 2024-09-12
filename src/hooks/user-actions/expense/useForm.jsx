import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useStorageContext } from "../../storage/useStorage";
import useValidation from "./useValidation";
import usePopulate from "./usePopulate";

const useForm = () => {
  const defaultInput = {
    expenseName: "",
    expenseCategory: "",
    expenseAmount: "",
    expenseAccount: "",
  };

  const [currentInput, setInput] = useState(defaultInput);

  const [isSubmit, setSubmit] = useState(false);

  const {
    storage: { expenses },
    setStorage,
  } = useStorageContext();

  const { error, checkErrors } = useValidation();

  const {
    populateExpense: {
      expenseId,
      expenseName,
      expenseAmount,
      expenseCategory,
      expenseAccount,
    },
    setPopulateExpense,
  } = usePopulate(defaultInput);

  const handleAddExpense = (event) => {
    event.preventDefault();

    const hasError = checkErrors(currentInput);

    setSubmit(true);

    if (hasError) return;

    const dateNow = new Date().toUTCString();
    setStorage((prev) => {
      return {
        ...prev,
        accounts: prev.accounts.map((account) => {
          return account.id === currentInput.expenseAccount
            ? {
                ...account,
                accountBalance: (
                  account.accountBalance - currentInput.expenseAmount
                ).toString(),
              }
            : account;
        }),

        expenses: [
          ...prev.expenses,
          {
            ...currentInput,
            expenseId: `exp${uuidv4().split("-").join("")}${Date.now()}`,
            dateCreated: dateNow,
            dateUpdated: dateNow,
          },
        ],
      };
    });
    setInput(defaultInput);
    setSubmit(false);
  };

  const handleEditExpense = (event) => {
    event.preventDefault();

    setStorage((prev) => {
      return {
        ...prev,
        accounts: prev.accounts.map((account) => {
          const expenseAmount = expenses.find(
            (expense) => expense.expenseId === expenseId
          ).expenseAmount;
          return account.id === expenseAccount
            ? {
                ...account,
                accountBalance:
                  parseFloat(account.accountBalance) -
                  (
                    parseFloat(currentInput.expenseAmount) -
                    parseFloat(expenseAmount)
                  ).toString(),
              }
            : account;
        }),
        expenses: prev.expenses.map((expense) => {
          return expense.expenseId === expenseId
            ? {
                ...expense,
                expenseName: currentInput.expenseName,
                expenseCategory: currentInput.expenseCategory,
                expenseAmount: currentInput.expenseAmount,
              }
            : expense;
        }),
      };
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const { name, category, account } = event.currentTarget.dataset;

    switch (name) {
      case "expenseCategory":
        setInput((prev) => {
          return {
            ...prev,
            [name]: category,
          };
        });
        break;
      case "expenseAccount":
        setInput((prev) => {
          return {
            ...prev,
            [name]: account,
          };
        });
        break;
      default:
        setInput((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
        break;
    }
  };

  useEffect(() => {
    setInput((prev) => {
      return {
        ...prev,
        expenseName: expenseName,
        expenseCategory: expenseCategory,
        expenseAmount: expenseAmount,
      };
    });
  }, [expenseId]);

  useEffect(() => {
    if (!isSubmit) return;
    checkErrors(currentInput);
  }, [currentInput]);

  const handleDeleteExpense = (accountId, expenseId) => {
    setStorage((prev) => {
      return {
        ...prev,
        accounts: prev.accounts.map((account) => {
          const expenseAmount = prev.expenses.find(
            (expense) => expense.expenseAccount === accountId
          ).expenseAmount;
          return account.id === accountId
            ? {
                ...account,
                accountBalance: (
                  parseFloat(account.accountBalance) + parseFloat(expenseAmount)
                ).toString(),
              }
            : account;
        }),
        expenses: prev.expenses.filter(
          (expense) => expense.expenseId !== expenseId
        ),
      };
    });
  };

  return {
    defaultInput,
    currentInput,
    setInput,
    error,
    handleAddExpense,
    handleEditExpense,
    handleDeleteExpense,
    handleInputChange,
    setPopulateExpense,
  };
};

export default useForm;
