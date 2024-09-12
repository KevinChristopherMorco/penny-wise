import React, { createContext, useContext } from "react";
import useForm from "./useForm";

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const {
    defaultInput,
    currentInput,
    error,
    setInput,
    handleAddExpense,
    handleEditExpense,
    handleDeleteExpense,
    handleInputChange,
    setPopulateExpense,
  } = useForm();
  return (
    <ExpenseContext.Provider
      value={{
        defaultInput,
        currentInput,
        error,
        setInput,
        handleAddExpense,
        handleEditExpense,
        handleDeleteExpense,
        handleInputChange,
        setPopulateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpenseContext = () => useContext(ExpenseContext);

export default ExpenseProvider;
export { useExpenseContext };
