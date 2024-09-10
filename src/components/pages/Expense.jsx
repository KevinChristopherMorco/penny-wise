import React from "react";

import Expenses from "../expense/Expense";
import ExpenseHeader from "../expense/ExpenseHeader";
import ExpenseProvider from "../../hooks/user-actions/expense/useManageExpense";

const Expense = () => {
  return (
    <ExpenseProvider>
      <div className="py-4 flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <ExpenseHeader />
          <Expenses />
          {/* <ExpenseHeader />
        <Expense setCurrentActive={setCurrentActive} /> */}
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default Expense;
