import { useEffect, useState } from "react";
import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";
import usePopulate from "./usePopulate";

const useForm = () => {
  const defaultInput = {
    accountName: "",
    accountBalance: 0,
    icon: "savings",
  };

  const [currentInput, setInput] = useState(defaultInput);
  const {
    storage: { accounts },
    setStorage,
  } = useStorageContext();

  const {
    populateField: {
      current: { accountName, accountBalance, icon },
    },
    setPopulate,
  } = usePopulate(defaultInput);

  const handleAddAccount = (event) => {
    event.preventDefault();
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
  };

  useEffect(() => {
    console.log(accountName);
    setInput({
      accountName: accountName,
      accountBalance: accountBalance,
      icon: icon,
    });
  }, [accountName]);

  const handleDeleteAccount = (accountId) => {
    setStorage((prev) => {
      return {
        ...prev,
        accounts: accounts.filter(({ id }) => id !== accountId),
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

  return {
    currentInput,
    defaultInput,
    handleInputChange,
    handleAddAccount,
    handleDeleteAccount,
    setPopulate,
  };
};

export default useForm;
