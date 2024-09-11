import { useEffect, useState } from "react";
import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";
import usePopulate from "./usePopulate";
import useValidation from "./useValidation";

const useForm = () => {
  const defaultInput = {
    accountName: "",
    accountBalance: "",
    icon: "savings",
  };

  const [currentInput, setInput] = useState(defaultInput);
  const [isSubmit, setSubmit] = useState(false);

  const {
    storage: { accounts, expenses },
    setStorage,
  } = useStorageContext();

  const {
    populateField: {
      current: { id, accountName, accountBalance, icon },
    },
    setPopulate,
  } = usePopulate(defaultInput);

  const { defaultError, error, setError, checkErrors } = useValidation();

  const handleAddAccount = (event) => {
    event.preventDefault();

    const hasError = checkErrors(currentInput);

    setSubmit(true);

    if (hasError) return;

    const dateNow = new Date().toUTCString();

    setStorage((prev) => {
      return {
        ...prev,
        accounts: [
          ...prev.accounts,
          {
            ...currentInput,
            id: `acc${uuidv4().split("-").join("")}${Date.now()}`,
            dateCreated: dateNow,
            dateUpdated: dateNow,
          },
        ],
      };
    });
    setInput(defaultInput);
    setSubmit(false);
  };

  useEffect(() => {
    setInput({
      accountName: accountName,
      accountBalance: accountBalance,
      icon: icon,
    });
  }, [id]);

  const handleEditAccount = (event) => {
    event.preventDefault();

    const hasError = checkErrors(currentInput);

    if (hasError) return;
    const dateNow = new Date().toUTCString();

    setStorage((prev) => {
      return {
        ...prev,
        accounts: [
          ...prev.accounts.map((account) => {
            return account.id === id
              ? {
                  id: account.id,
                  accountName: currentInput.accountName,
                  accountBalance: currentInput.accountBalance,
                  icon: currentInput.icon,
                  dateCreated: account.dateCreated,
                  dateUpdated: dateNow,
                }
              : account;
          }),
        ],
      };
    });
  };

  const handleDeleteAccount = (accountId) => {
    setStorage((prev) => {
      return {
        ...prev,
        accounts: accounts.filter(({ id }) => id !== accountId),
        expenses: expenses.filter(
          ({ expenseAccount }) => expenseAccount !== accountId
        ),
      };
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const { accounttype: accountType } = event.target.dataset;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
        icon: accountType || "savings",
      };
    });
  };

  useEffect(() => {
    if (!isSubmit) return;
    checkErrors(currentInput);
  }, [currentInput]);

  return {
    currentInput,
    defaultInput,
    defaultError,
    error,
    setInput,
    setError,
    handleInputChange,
    handleAddAccount,
    handleEditAccount,
    handleDeleteAccount,
    setPopulate,
  };
};

export default useForm;
