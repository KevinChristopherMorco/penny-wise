import React, { createContext, useContext } from "react";
import useForm from "./useForm";
import useFetchStorage from "../../fetch/useFetchStorage";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const {
    defaultInput,
    defaultError,
    currentInput,
    error,
    setInput,
    setError,
    setPopulateFields,
    handleInputChange,
    handleAddAccount,
    handleEditAccount,
    handleDeleteAccount,
  } = useForm();
  const { accounts } = useFetchStorage();

  return (
    <AccountContext.Provider
      value={{
        defaultInput,
        defaultError,
        currentInput,
        error,
        setError,
        accounts,
        setInput,
        setPopulateFields,
        handleAddAccount,
        handleEditAccount,
        handleDeleteAccount,
        handleInputChange,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

const useAccountContext = () => useContext(AccountContext);

export default AccountProvider;
export { useAccountContext };
