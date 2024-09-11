import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useStorageContext } from "../../storage/useStorage";
import useValidation from "./useValidation";

const useForm = () => {
  const defaultInput = {
    expenseName: "",
    expenseCategory: "",
    expenseAmount: "",
    expenseAccount: "",
  };

  const [currentInput, setInput] = useState(defaultInput);
  const [isSubmit, setSubmit] = useState(false);

  const { setStorage } = useStorageContext();

  const { error, checkErrors } = useValidation();

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
    if (!isSubmit) return;
    checkErrors(currentInput);
  }, [currentInput]);

  return { currentInput, error, handleAddExpense, handleInputChange };
};

export default useForm;
