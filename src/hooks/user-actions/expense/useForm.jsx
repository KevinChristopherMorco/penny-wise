import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useStorageContext } from "../../storage/useStorage";
import useValidation from "./useValidation";
import useTransaction from "../transaction/useTransaction";
import usePopulate from "../../fetch/form/usePopulate";

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
    populate: {
      expenseId,
      expenseName,
      expenseAmount,
      expenseCategory,
      expenseAccount,
    },
    populate,
    setPopulateFields,
  } = usePopulate(defaultInput, "expenses");

  const { useExpenseTransaction } = useTransaction();

  const handleAddExpense = (event) => {
    event.preventDefault();

    const hasError = checkErrors(currentInput, "add");

    setSubmit(true);

    if (hasError) return;

    const dateNow = new Date().toUTCString();

    const newExpense = {
      ...currentInput,
      expenseId: `exp${uuidv4().split("-").join("")}${Date.now()}`,
      dateCreated: dateNow,
      dateUpdated: dateNow,
    };

    let updatedAccount;

    setStorage((prev) => {
      return {
        ...prev,
        accounts: prev.accounts.map((account) => {
          if (account.id === currentInput.expenseAccount) {
            updatedAccount = {
              ...account,
              accountBalance: (
                account.accountBalance - currentInput.expenseAmount
              ).toString(),
            };

            return updatedAccount;
          }
          return account;
        }),

        expenses: [...prev.expenses, newExpense],
      };
    });

    const transaction = {
      ...newExpense,
      ...updatedAccount,
      expenseAction: "addExpense",
    };

    setInput(defaultInput);
    setSubmit(false);
    useExpenseTransaction(transaction);
  };

  const handleEditExpense = (event) => {
    event.preventDefault();

    let updatedAccount;
    let updatedExpense;

    const hasError = checkErrors(currentInput, "edit", populate);
    setSubmit(true);

    if (hasError) return;

    setStorage((prev) => {
      const expenseAmount = expenses.find(
        (expense) => expense.expenseId === expenseId
      ).expenseAmount;

      return {
        ...prev,
        accounts: prev.accounts.map((account) => {
          if (account.id === expenseAccount) {
            updatedAccount = {
              ...account,
              accountBalance:
                parseFloat(account.accountBalance) -
                (
                  parseFloat(currentInput.expenseAmount) -
                  parseFloat(expenseAmount)
                ).toString(),
            };
            return updatedAccount;
          }
          return account;
        }),
        expenses: prev.expenses.map((expense) => {
          if (expense.expenseId === expenseId) {
            updatedExpense = {
              ...expense,
              expenseName: currentInput.expenseName,
              expenseCategory: currentInput.expenseCategory,
              expenseAmount: currentInput.expenseAmount,
            };
            return updatedExpense;
          }
          return expense;
        }),
      };
    });
    const transaction = {
      ...updatedExpense,
      ...updatedAccount,
      expenseAction: "editExpense",
    };

    useExpenseTransaction(transaction);
    setSubmit(false);
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
      case "expenseAmount":
        setInput((prev) => {
          return {
            ...prev,
            [name]: value,
            expenseAccount: "",
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
    let updatedAccount;
    let expense;

    setStorage((prev) => {
      const expenseAmount = prev.expenses.find(
        (expense) => expense.expenseAccount === accountId
      ).expenseAmount;

      expense = prev.expenses.find(
        (expense) => expense.expenseId === expenseId
      );

      return {
        ...prev,
        accounts: prev.accounts.map((account) => {
          if (account.id === accountId) {
            updatedAccount = {
              ...account,
              accountBalance: (
                parseFloat(account.accountBalance) +
                parseFloat(expense.expenseAmount)
              ).toString(),
            };
            return updatedAccount;
          }
          return account;
        }),
        expenses: prev.expenses.filter(
          (expense) => expense.expenseId !== expenseId
        ),
      };
    });

    const transaction = {
      ...expense,
      ...updatedAccount,
      expenseAction: "deleteExpense",
    };

    useExpenseTransaction(transaction);
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
    setPopulateFields,
  };
};

export default useForm;
