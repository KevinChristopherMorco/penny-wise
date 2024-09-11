import React from "react";
import { useParams } from "react-router-dom";

import ExpenseSummaryHeader from "./ExpenseSummaryHeader";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import ExpenseCard from "./dynamic/ExpenseCard";

const ExpenseSummary = () => {
  const { accountId } = useParams();
  const { expenses } = useFetchStorage();
  const accountExpenses = expenses.filter(
    (expenses) => expenses.expenseAccount === accountId
  );

  const groupExpenseByDate = accountExpenses.reduce((expenses, item) => {
    const itemDate = new Date(item.dateCreated);
    const formattedDate = itemDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const existingExpense = expenses.find(
      (expense) => expense.date === formattedDate
    );

    if (existingExpense) {
      existingExpense.expenses.push(item);
    } else {
      expenses.push({
        date: formattedDate,
        expenses: [item],
      });
    }

    return expenses;
  }, []);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <ExpenseSummaryHeader />
      <div className="px-4 py-2 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="font-bold">Hey, Kevin!</p>
          <p>
            Here's a quick overview of{" "}
            <span className="font-bold">saving account</span> expenses. Check it
            out to see where the money's going!
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {groupExpenseByDate.map((date) => {
              return (
                <>
                  <p className="w-[80%] py-2 font-bold border-b-2 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]">
                    {date.date}
                  </p>
                  {date.expenses.map((expense, index) => {
                    return <ExpenseCard key={index} expense={expense} />;
                  })}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
