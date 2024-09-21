import React from "react";
import {
  IconPigMoney,
  IconCash,
  IconArrowElbowRight,
  IconCurrencyPeso,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import useMonthlyBudget from "../../hooks/fetch/budget/useMonthlyBudget";

const BudgetCard = () => {
  const { currentMonth, totalMonthlyBudget } = useMonthlyBudget();
  return (
    <div className="px-4">
      <div className="p-4 flex flex-col items-center gap-10 bg-[var(--accent-color)] rounded-xl dark:bg-[var(--dark-secondary-color)]">
        <div className="flex flex-col gap-4 text-white dark:text-[var(--dark-text-color)]">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center font-light">My Budget</p>
            <p className="flex justify-center items-center text-3xl text-center font-extrabold">
              <span>
                <IconCurrencyPeso className="w-8 h-8" />
              </span>
              {parseFloat(totalMonthlyBudget).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-[.7rem] text-center font-medium ">
              as of {currentMonth}
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <Link
              to="/manage-account"
              className="p-2 flex items-center gap-2 text-sm text-[var(--text-color)] font-bold bg-[var(--neutral-color)] rounded-xl dark:bg-white dark:text-[var(--dark-primary-color)]"
            >
              <IconPigMoney />
              Add Account
            </Link>
            <Link
              to="/manage-expense"
              className="p-2 flex items-center gap-2 text-sm text-[var(--text-color)] font-bold bg-[var(--neutral-color)] rounded-xl dark:bg-white dark:text-[var(--dark-primary-color)]"
            >
              <IconCash />
              Add Expenses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
