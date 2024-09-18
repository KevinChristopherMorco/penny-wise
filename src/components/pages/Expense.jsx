import React from "react";

import Expenses from "../expense/Expense";
import ExpenseHeader from "../expense/ExpenseHeader";

const Expense = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <ExpenseHeader />
        <Expenses />
        {/* <ExpenseHeader />
        <Expense setCurrentActive={setCurrentActive} /> */}
      </div>
    </div>
  );
};

export default Expense;
