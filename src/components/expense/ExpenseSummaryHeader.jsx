import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft, IconCurrencyPeso } from "@tabler/icons-react";
import { useStorageContext } from "../../hooks/storage/useStorage";

const ExpenseSummaryHeader = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const {
    storage: { accounts, expenses },
  } = useStorageContext();
  const totalDeposit = accounts
    .filter((account) => account.id === accountId)
    .map((account) => parseFloat(account.accountDeposit))
    .reduce((total, deposit) => total + deposit, 0);

  const totalExpenses = expenses
    .filter((expense) => expense.expenseAccount === accountId)
    .map((expense) => parseFloat(expense.expenseAmount))
    .reduce((total, expense) => total + expense, 0);

  const totalBalance = totalDeposit - totalExpenses;

  return (
    <div className="p-4 flex flex-col gap-4 border-b border-[var(--accent-color)] bg-[var(--accent-color)] text-[var(--text-accent)] dark:bg-[var(--dark-primary-color)] dark:border-[var(--dark-accent-color)]">
      <div className="w-full flex items-center">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <IconChevronLeft className="w-5 h-5 self-start" />
        </button>
        <div className="w-full flex gap-1 justify-center items-center font-medium">
          <p className="text-sm">Total Balance:</p>
          <p className="flex items-center justify-center text-base text-green-200 font-bold dark:text-green-400">
            <IconCurrencyPeso className="w-5 h-5" />
            {totalBalance.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <div className="flex flex-col font-medium">
          <p className="text-sm">Total Deposit</p>
          <p className="w-full flex items-center justify-center text-base text-green-200 font-bold dark:text-green-400">
            <IconCurrencyPeso className="w-5 h-5" />
            {totalDeposit.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="flex flex-col font-medium">
          <p className="text-sm">Total Expenses</p>
          <p className="w-full flex items-center justify-center text-base text-red-600 font-bold dark:text-red-400">
            <IconCurrencyPeso className="w-5 h-5" />
            {totalExpenses.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummaryHeader;
