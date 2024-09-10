import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useStorageContext } from "../../storage/useStorage";

const useForm = () => {
  const defaultInput = {
    expenseName: "",
    expenseCategory: "",
    expenseAmount: "",
    expenseAccount: "",
  };
  const [currentInput, setInput] = useState(defaultInput);
  const {
    storage: { accounts, expenses },
    setStorage,
  } = useStorageContext();

  const handleAddExpense = (event) => {
    event.preventDefault();
    const dateNow = new Date().toUTCString();
    setStorage((prev) => {
      return {
        ...prev,
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

  return { currentInput, handleAddExpense, handleInputChange };
};

export default useForm;
