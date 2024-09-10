import React, { createContext, useContext } from "react";
import useForm from "./useForm";

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const { currentInput, handleAddExpense, handleInputChange } = useForm();
  return (
    <ExpenseContext.Provider
      value={{ currentInput, handleAddExpense, handleInputChange }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpenseContext = () => useContext(ExpenseContext);

export default ExpenseProvider;
export { useExpenseContext };
