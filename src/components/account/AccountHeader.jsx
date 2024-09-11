import React from "react";
import { IconCurrencyPeso, IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
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
  return (
    <div className="p-4 flex flex-col gap-4 shadow shadow-[var(--accent-color)] dark:shadow-[var(--dark-accent-color)]">
      <div className="w-full flex items-center">
        <Link to="/" className="cursor-pointer">
          <IconChevronLeft className="w-5 h-5 self-start" />
        </Link>
        <p className="w-full flex justify-center font-bold">
          Total Balance : <IconCurrencyPeso className="w-5 h-5" />
          {totalBalance.toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="flex justify-around items-center">
        <div className="flex flex-col">
          <p className="text-sm font-medium">Total Deposit</p>
          <p className="w-full flex items-center justify-center text-base text-green-600 font-bold dark:text-green-400">
            <IconCurrencyPeso className="w-5 h-5" />
            {totalDeposit.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="flex flex-col items-center text-sm">
          <p className="text-sm font-medium">Total Expenses</p>
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

export default AccountHeader;
