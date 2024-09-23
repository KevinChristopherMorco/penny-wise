import React, { createContext, useContext } from "react";
import useFetchStorage from "../../fetch/useFetchStorage";
import useDate from "./useDate";
import useForm from "./useForm";

const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
  const {
    monthChoice,
    yearChoice,
    currentMonthFormat,
    formattedYear,
    handleDateChoice,
    handleYearChoice,
  } = useDate();
  const { categoryChoice } = useFetchStorage();
  const {
    defaultInput,
    currentInput,
    setInput,
    defaultError,
    error,
    setError,
    setPopulateFields,
    handleAddBudget,
    handleEditBudget,
    handleDeleteBudget,
    handleInputChange,
  } = useForm(formattedYear, categoryChoice);

  return (
    <BudgetContext.Provider
      value={{
        defaultInput,
        currentInput,
        defaultError,
        error,
        monthChoice,
        yearChoice,
        currentMonthFormat,
        formattedYear,
        setInput,
        setError,
        setPopulateFields,
        handleDateChoice,
        handleYearChoice,
        handleAddBudget,
        handleEditBudget,
        handleDeleteBudget,
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
