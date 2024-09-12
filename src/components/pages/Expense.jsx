import React from "react";

import Expenses from "../expense/Expense";
import ExpenseHeader from "../expense/ExpenseHeader";

const Expense = () => {
  return (
    <div className="py-4 flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <ExpenseHeader />
        <Expenses />
        {/* <ExpenseHeader />
        <Expense setCurrentActive={setCurrentActive} /> */}
      </div>
    </div>
  );
};

export default Expense;
