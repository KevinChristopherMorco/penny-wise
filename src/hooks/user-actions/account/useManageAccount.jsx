import React, { createContext, useContext } from "react";
import useForm from "./useForm";
import useFetchStorage from "../../fetch/useFetchStorage";
import usePopulate from "./usePopulate";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const {
    currentInput,
    setPopulate,
    handleInputChange,
    handleAddAccount,
    handleDeleteAccount,
  } = useForm();
  const { accounts } = useFetchStorage();

  return (
    <AccountContext.Provider
      value={{
        currentInput,
        accounts,
        setPopulate,
        handleAddAccount,
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
