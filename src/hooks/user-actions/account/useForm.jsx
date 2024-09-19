import { useEffect, useState } from "react";
import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";
// import usePopulate from "./usePopulate";
import useValidation from "./useValidation";
import useTransaction from "../transaction/useTransaction";
import usePopulate from "../../fetch/form/usePopulate";

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
    populate: { id, accountName, accountDeposit, icon },
    setPopulateFields,
  } = usePopulate(defaultInput, "accounts");

  const { defaultError, error, setError, checkErrors } = useValidation();

  const { useAccountTransaction } = useTransaction();

  const handleAddAccount = (event) => {
    event.preventDefault();

    const hasError = checkErrors(currentInput, "add");

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

    const transaction = {
      accountName: currentInput.accountName,
      accountBalance: currentInput.accountDeposit,
      accountAction: "deposit",
    };

    useAccountTransaction(transaction);
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

    const hasError = checkErrors(currentInput, "edit");
    setSubmit(true);

    if (hasError) return;

    const dateNow = new Date().toUTCString();

    const findAccount = accounts.find((account) => account.id === id);

    if (!findAccount) return;

    const updatedDeposit =
      parseFloat(findAccount.accountDeposit) +
      parseFloat(currentInput.accountDeposit);
    const updatedBalance =
      parseFloat(findAccount.accountBalance) +
      parseFloat(currentInput.accountDeposit);

    setStorage((prev) => ({
      ...prev,
      accounts: prev.accounts.map((account) =>
        account.id === id
          ? {
              ...account,
              accountDeposit: updatedDeposit.toString(),
              accountBalance: updatedBalance.toString(),
              accountName: currentInput.accountName,
              icon: currentInput.icon,
              dateUpdated: dateNow,
            }
          : account
      ),
    }));

    const transaction = {
      accountId: findAccount.id,
      accountName: findAccount.accountName,
      accountDeposit: currentInput.accountDeposit.toString(),
      accountBalance: updatedBalance.toString(),
      accountAction: "edit",
    };

    useAccountTransaction(transaction);
    setSubmit(false);
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

    const findAccount = accounts.find((account) => account.id === accountId);

    const transaction = {
      accountId: findAccount.id,
      accountName: findAccount.accountName,
      accountBalance: findAccount.accountBalance,
      accountAction: "delete",
    };

    useAccountTransaction(transaction);
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
    checkErrors(currentInput, "add");
  }, [currentInput]);

  useEffect(() => {
    if (!isSubmit) return;
    checkErrors(currentInput, "edit");
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
    setPopulateFields,
  };
};

export default useForm;
