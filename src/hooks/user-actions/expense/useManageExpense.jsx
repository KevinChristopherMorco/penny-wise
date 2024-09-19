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
    setPopulateFields,
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
        setPopulateFields,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpenseContext = () => useContext(ExpenseContext);

export default ExpenseProvider;
export { useExpenseContext };
