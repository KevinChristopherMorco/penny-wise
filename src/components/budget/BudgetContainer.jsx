import React from "react";
import { useBudgetContext } from "../../hooks/user-actions/budget/useManageBudget";
import useBudgetFilter from "../../hooks/user-actions/budget/filter/useBudgetFilter";

import BudgetCard from "./dynamic/BudgetCard";
import BudgetCategory from "./BudgetCategory";
import Empty from "../../alerts/indicators/Empty";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import { IconAlertCircleFilled } from "@tabler/icons-react";

const BudgetContainer = () => {
  const { formattedYear, currentDate } = useBudgetContext();
  const {
    categoriesWithBudget,
    categoriesNoBudget,
    categoriesNoBudgetWithExpense,
  } = useBudgetFilter();

  return (
    <div className="mb-[7rem] flex flex-col gap-16 text-[var(--accent-color)] dark:text-[var(--dark-text-color)]">
      <div className="flex flex-col gap-5">
        <div className="px-4 flex flex-col gap-5">
          <p className="py-1 font-bold">Budget for the month:</p>
        </div>
        {Boolean(categoriesWithBudget) && categoriesWithBudget.length > 0 ? (
          <div className="px-4 flex flex-col gap-3">
            {categoriesWithBudget.map((category, index) => {
              return (
                <BudgetCard
                  key={index}
                  category={category}
                  formattedYear={formattedYear}
                  currentDate={currentDate}
                />
              );
            })}
          </div>
        ) : (
          <Empty
            title="No Budget Set for This Month"
            subtext="Please set a budget to better manage and track your expenses for this month."
          />
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="px-4 flex flex-col gap-5">
          <p className="py-1 font-bold">Set budget for:</p>
          {categoriesNoBudgetWithExpense.length > 0 && (
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
          {categoriesNoBudget.map((category, index) => {
            return <BudgetCategory key={index} category={category} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetContainer;
