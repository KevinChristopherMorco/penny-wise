import React, { createContext, useContext } from "react";
import useFetchStorage from "../../fetch/useFetchStorage";
import useDate from "./useDate";
import useForm from "./useForm";

const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
  const { handleDateChoice, currentDate, formattedYear } = useDate();
  const { categoryChoice } = useFetchStorage();
  const {
    defaultInput,
    currentInput,
    setInput,
    defaultError,
    error,
    setError,
    handleAddBudget,
    handleInputChange,
  } = useForm(formattedYear, categoryChoice);

  return (
    <BudgetContext.Provider
      value={{
        defaultInput,
        currentInput,
        setInput,
        defaultError,
        error,
        setError,
        currentDate,
        formattedYear,
        handleDateChoice,
        handleAddBudget,
        handleInputChange,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

const useBudgetContext = () => useContext(BudgetContext);

export default BudgetProvider;
export { useBudgetContext };
