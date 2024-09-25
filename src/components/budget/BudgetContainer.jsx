import React from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";

import useBudgetFilter from "../../hooks/fetch/budget/useBudgetFilter";

import BudgetCard from "./dynamic/BudgetCard";
import BudgetCategory from "./BudgetCategory";
import Empty from "../../alerts/indicators/Empty";
import useServerDate from "../../hooks/fetch/useServerDate";
import BudgetFilter from "./filter/BudgetFilter";

const BudgetContainer = () => {
  const { budgetCategory } = useBudgetFilter();
  const { monthYearChoiceFormat, currentMonthYearFormat } = useServerDate();

  const checkForMonthYear =
    new Date(monthYearChoiceFormat).getTime() >=
    new Date(currentMonthYearFormat).getTime();

  const checkForBudget = budgetCategory.some((budget) => budget.budget > 0);
  const checkForExpensesNoBudget = budgetCategory.some(
    (budget) => budget.budget === 0 && budget.expenses > 0
  );

  return (
    <div className="mb-[7rem] flex flex-col gap-10 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
      <BudgetFilter />
      <div className="flex flex-col gap-5">
        <div className="px-4 flex flex-col gap-5">
          {checkForMonthYear && (
            <p className="py-1 font-bold">Budget for the month:</p>
          )}
        </div>

        {checkForBudget ? (
          <div className="px-4 flex flex-col gap-6">
            {budgetCategory
              .filter((budget) => budget.budget > 0)
              .map((budgetData, index) => {
                return <BudgetCard key={index} budgetData={budgetData} />;
              })}
          </div>
        ) : checkForMonthYear ? (
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
            {checkForMonthYear
              ? "Set budget for:"
              : "Categories with No Prior Budget"}
          </p>
          {checkForExpensesNoBudget && (
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
