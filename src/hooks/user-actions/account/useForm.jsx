import { useEffect, useState } from "react";
import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";
import usePopulate from "./usePopulate";
import useValidation from "./useValidation";

const useForm = () => {
  const defaultInput = {
    accountName: "",
    accountDeposit: "",
    icon: "savings",
  };

  const [currentInput, setInput] = useState(defaultInput);
  const [isSubmit, setSubmit] = useState(false);

  const {
    storage: { accounts, expenses },
    setStorage,
  } = useStorageContext();

  const {
    populateAccount: { id, accountName, accountDeposit, icon },
    setPopulateAccount,
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
            accountBalance: currentInput.accountDeposit,
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
      accountDeposit: accountDeposit,
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
        accounts: prev.accounts.map((account) => {
          return account.id === id
            ? {
                id: account.id,
                accountDeposit: (
                  parseFloat(account.accountDeposit) +
                  parseFloat(currentInput.accountDeposit)
                ).toString(),
                accountName: currentInput.accountName,
                accountBalance: (
                  parseFloat(account.accountBalance) +
                  parseFloat(currentInput.accountDeposit)
                ).toString(),
                icon: currentInput.icon,
                dateCreated: account.dateCreated,
                dateUpdated: dateNow,
              }
            : account;
        }),
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
    setPopulateAccount,
  };
};

export default useForm;
