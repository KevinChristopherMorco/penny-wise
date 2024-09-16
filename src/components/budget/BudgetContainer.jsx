import React from "react";
import { useBudgetContext } from "../../hooks/user-actions/budget/useManageBudget";
import useBudgetFilter from "../../hooks/user-actions/budget/filter/useBudgetFilter";

import BudgetCard from "./dynamic/BudgetCard";
import BudgetCategory from "./BudgetCategory";
import Empty from "../../alerts/indicators/Empty";

const BudgetContainer = () => {
  const { formattedYear, currentDate } = useBudgetContext();
  const { categoriesWithBudget, categoriesNoBudget } = useBudgetFilter();

  return (
    <div className="mb-[7rem] flex flex-col gap-16">
      <div className="flex flex-col gap-5">
        <div className="px-4 flex flex-col gap-5">
          <p className="py-1 font-bold">Budget for the month:</p>
        </div>
        <div className="px-4 flex flex-col gap-3">
          {Boolean(categoriesWithBudget) && categoriesWithBudget.length > 0 ? (
            categoriesWithBudget.map((category, index) => {
              return (
                <BudgetCard
                  key={index}
                  category={category}
                  formattedYear={formattedYear}
                  currentDate={currentDate}
                />
              );
            })
          ) : (
            <Empty
              title="No Budget Set for This Month"
              subtext="Please set a budget to better manage and track your expenses for this month."
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="px-4 flex flex-col gap-5">
          <p className="py-1 font-bold">Set budget for:</p>
        </div>
        <div>
          {categoriesNoBudget.map((category, index) => {
            return <BudgetCategory key={index} category={category} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetContainer;
