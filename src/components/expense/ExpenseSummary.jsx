import React from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import useSummaryFilter from "../../hooks/user-actions/expense/filter/useSummaryFilter";
import usePageExist from "../../hooks/general/navigation/usePageExist";

import ExpenseSummaryHeader from "./ExpenseSummaryHeader";
import ExpenseCard from "./dynamic/ExpenseCard";
import Empty from "../../alerts/indicators/Empty";
import ExpenseForm from "../modal/account/ExpenseForm";
import ClientError from "../../alerts/status/ClientError";
import { IconPlus } from "@tabler/icons-react";

const ExpenseSummary = () => {
  const { accountId } = useParams();
  const { accounts } = useFetchStorage();
  const { expensesByDate } = useSummaryFilter(accountId);
  const { isValidAccountId } = usePageExist(accountId);

  const {
    currentActive: {
      modal: { modalName },
    },
  } = useNavigateContext();

  if (!isValidAccountId) return <ClientError />;

  return (
    <div className="min-h-full mb-[7rem] flex flex-col gap-4 animate-fadeIn overflow-y-scroll">
      <ExpenseSummaryHeader />
      <div className="py-2 flex flex-col gap-8 bg-[var(--primary-color)]">
        {expensesByDate.length > 0 && (
          <div className="px-4 flex flex-col gap-4">
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
        <div className="px-4 py-5 flex flex-col gap-8">
          {expensesByDate.length > 0 ? (
            expensesByDate
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((date, index) => {
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <p className="w-[80%] py-2 font-bold border-b-2 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]">
                      {date.date}
                    </p>
                    {date.expenses
                      .sort(
                        (a, b) =>
                          new Date(b.dateCreated) - new Date(a.dateCreated)
                      )
                      .map((expense, index) => {
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
        <Link
          to="/manage-expense"
          className="mx-auto p-2 flex justify-center items-center text-sm text-[var(--accent-color)] font-bold border border-[var(--accent-color)] rounded-lg transition-colors hover:bg-[var(--accent-color)] hover:text-white dark:text-[var(--dark-accent-color)] dark:border-[var(--dark-accent-color)] hover:dark:bg-[var(--dark-accent-color)]"
        >
          <p className="flex items-center gap-1 font-bold">
            <span>
              <IconPlus />
            </span>
            Add an Expense
          </p>
        </Link>
      </div>
      {modalName === "editExpense" && <ExpenseForm />}
    </div>
  );
};

export default ExpenseSummary;
