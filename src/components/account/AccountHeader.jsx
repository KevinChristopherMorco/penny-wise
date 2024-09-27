import React from "react";
import { IconCurrencyPeso, IconChevronLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useStorageContext } from "../../hooks/storage/useStorage";

const AccountHeader = () => {
  const {
    storage: { accounts, expenses },
  } = useStorageContext();
  const totalDeposit = accounts
    .map(({ accountDeposit }) => parseFloat(accountDeposit))
    .reduce((total, balance) => total + balance, 0);

  const totalExpenses = expenses
    .map(({ expenseAmount }) => parseFloat(expenseAmount))
    .reduce((total, expense) => total + expense, 0);

  const totalBalance = totalDeposit - totalExpenses;

  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4 border-b border-[var(--accent-color)] bg-[var(--accent-color)] text-[var(--text-accent)] dark:bg-[var(--dark-primary-color)] dark:border-[var(--dark-accent-color)]">
      <div className="w-full flex items-center">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <IconChevronLeft className="w-5 h-5 self-start" />
        </div>
        <div className="w-full flex justify-center items-center gap-1 font-medium">
          <p className="text-sm xl:text-base">Total Balance:</p>
          <p className="flex items-center justify-center text-green-100 text-base font-bold xl:text-xl dark:text-green-400">
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
          <p className="text-sm xl:text-base">Total Deposit</p>
          <p className="w-full flex items-center justify-center text-base text-green-700 font-bold xl:text-xl dark:text-green-400">
            <IconCurrencyPeso className="w-5 h-5" />
            {totalDeposit.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="flex flex-col font-medium">
          <p className="text-sm xl:text-base">Total Expenses</p>
          <p className="w-full flex items-center justify-center text-base text-red-600 font-bold xl:text-xl  dark:text-red-400">
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

export default AccountHeader;
