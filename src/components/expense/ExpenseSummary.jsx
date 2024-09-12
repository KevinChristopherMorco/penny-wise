import React from "react";
import { useParams } from "react-router-dom";

import ExpenseSummaryHeader from "./ExpenseSummaryHeader";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import ExpenseCard from "./dynamic/ExpenseCard";
import Empty from "../../alerts/indicators/Empty";
import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";
import ExpenseForm from "../modal/account/ExpenseForm";
import ClientError from "../../alerts/status/ClientError";

const ExpenseSummary = () => {
  const { accountId } = useParams();
  const { accounts, expenses } = useFetchStorage();
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

  const {
    currentActive: {
      modal: { modalName },
    },
  } = useNavigateContext();

  const checkIfIdExist = accounts.find((account) => account.id === accountId);

  if (!checkIfIdExist) {
    return <ClientError />;
  }
  return (
    <div className="mb-[4rem] flex flex-col gap-4 animate-fadeIn overflow-y-scroll">
      <ExpenseSummaryHeader />
      <div className="px-4 py-2 flex flex-col gap-8">
        {groupExpenseByDate.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="font-bold">Hey, Kevin!</p>
            <p>
              Here's a quick overview of{" "}
              <span className="font-bold">
                {
                  accounts.find((account) => account.id === accountId)
                    .accountName
                }{" "}
                account
              </span>{" "}
              transactions. Check it out to see where the money's going!
            </p>
          </div>
        )}
        <div className="flex flex-col gap-8">
          {groupExpenseByDate.length > 0 ? (
            groupExpenseByDate.map((date, index) => {
              return (
                <div key={index} className="flex flex-col gap-4">
                  <p className="w-[80%] py-2 font-bold border-b-2 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]">
                    {date.date}
                  </p>
                  {date.expenses.map((expense, index) => {
                    return <ExpenseCard key={index} expense={expense} />;
                  })}
                </div>
              );
            })
          ) : (
            <Empty
              title="No expenses to report!"
              subtext="Your account balance remains the same!"
            ></Empty>
          )}
        </div>
      </div>
      {modalName === "editExpense" && <ExpenseForm />}
    </div>
  );
};

export default ExpenseSummary;
