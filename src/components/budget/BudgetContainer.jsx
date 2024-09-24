import React from "react";

import {
  IconAlertCircleFilled,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

import { useBudgetContext } from "../../hooks/user-actions/budget/useManageBudget";
import useBudgetFilter from "../../hooks/fetch/budget/useBudgetFilter";

import BudgetCard from "./dynamic/BudgetCard";
import BudgetCategory from "./BudgetCategory";
import Empty from "../../alerts/indicators/Empty";
import useServerDate from "../../hooks/fetch/useServerDate";

const BudgetContainer = () => {
  const { monthChoice, yearChoice, handleDateChoice, handleYearChoice } =
    useBudgetContext();
  const { budgetCategory } = useBudgetFilter();
  const {
    monthsList,
    monthYearChoiceFormat,
    currentMonthYearFormat,
    currentYear,
  } = useServerDate();

  const checkFirstLastMonth = (ar, count) => {
    return ar[count];
  };

  const checkForMonthYear = () => {
    return (
      new Date(monthYearChoiceFormat).getTime() >=
      new Date(currentMonthYearFormat).getTime()
    );
  };

  return (
    <div className="mb-[7rem] flex flex-col gap-10 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
      <div className="p-4 flex justify-center items-center gap-2">
        <div className="min-w-[50%] p-3 flex justify-center items-center gap-2 text-[var(--primary-color)] bg-[var(--brand-color-600)] dark:text-[var(--dark-text-color)] dark:bg-[var(--brand-color-900)]  rounded-xl">
          <IconChevronLeft
            className={`${
              checkFirstLastMonth(monthsList, 0) === monthChoice
                ? "invisible"
                : ""
            } w-5 h-5 text-[var(--primary-color)] font-bold cursor-pointer`}
            id="monthDesc"
            onClick={handleDateChoice}
          />
          <p className="min-w-[60%] flex justify-center items-center font-bold">
            {monthChoice}
          </p>
          <IconChevronRight
            className={`${
              checkFirstLastMonth(monthsList, monthsList.length - 1) ===
              monthChoice
                ? "invisible"
                : ""
            } w-5 h-5 text-[var(--primary-color)] font-bold cursor-pointer`}
            id="monthAsc"
            onClick={handleDateChoice}
          />
        </div>
        <div className="p-3 flex justify-center items-center gap-2 text-[var(--primary-color)] bg-[var(--brand-color-600)] dark:text-[var(--dark-text-color)] dark:bg-[var(--brand-color-900)]  rounded-xl">
          <div>
            <span>
              <IconChevronLeft
                id="yearDesc"
                className={`${
                  yearChoice === currentYear - 1 ? "invisible" : ""
                } w-5 h-5 text-[var(--primary-color)] font-bold cursor-pointer`}
                onClick={handleYearChoice}
              />
            </span>
          </div>
          <p className="font-bold">{yearChoice}</p>
          <div>
            <span>
              <IconChevronRight
                id="yearAsc"
                className={`${
                  yearChoice === currentYear ? "invisible" : ""
                } w-5 h-5 text-[var(--primary-color)] font-bold cursor-pointer`}
                onClick={handleYearChoice}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="px-4 flex flex-col gap-5">
          {checkForMonthYear() && (
            <p className="py-1 font-bold">Budget for the month:</p>
          )}
        </div>

        {budgetCategory.some((budget) => budget.budget > 0) ? (
          <div className="px-4 flex flex-col gap-6">
            {budgetCategory
              .filter((budget) => budget.budget > 0)
              .map((budgetData, index) => {
                return <BudgetCard key={index} budgetData={budgetData} />;
              })}
          </div>
        ) : checkForMonthYear() ? (
          <Empty
            title="No Budget Set for This Month"
            subtext="Please set a budget to better manage and track your expenses for this month."
          />
        ) : (
          <Empty
            title="No Budget Set for This Month"
            subtext="Plan ahead! Set a budget for future months to stay on track."
          />
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="px-4 flex flex-col gap-5">
          <p className="py-1 font-bold">
            {checkForMonthYear()
              ? "Set budget for:"
              : "Categories with No Prior Budget"}
          </p>
          {budgetCategory.some(
            (budget) => budget.budget === 0 && budget.expenses > 0
          ) && (
            <div className="flex gap-1 text-[.7rem] text-red-500 font-bold">
              <IconAlertCircleFilled className="w-4 h-4" />
              <div>
                <p>There are categories that already had expenses.</p>
                <p>Please set a budget to manage your financials effectively</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          {budgetCategory
            .filter((budget) => budget.budget === 0)
            .map((budgetData, index) => {
              return <BudgetCategory key={index} budgetData={budgetData} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default BudgetContainer;
