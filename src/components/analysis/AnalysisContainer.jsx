import React from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";

import useCategoryFilter from "../../hooks/user-actions/analysis/useCategoryFilter";
import useBarFilter from "../../hooks/fetch/analysis/useBarFilter";

import DynamicBar from "./dynamic/DynamicBar";
import AnalysisFilter from "./filter/AnalysisFilter";

const AnalysisContainer = () => {
  const {
    category: { label: categoryChoice },
  } = useCategoryFilter();

  const { barData } = useBarFilter(categoryChoice);

  const checkExpensesWithoutBudget = barData.some(
    (data) => data.totalExpenses > 0 && data.totalBudget === 0
  );

  const checkExpensesExceededBudget = barData.some(
    (data) => data.totalExpenses > data.totalBudget && data.totalBudget !== 0
  );

  return (
    <div className="p-4 mb-[5rem] flex flex-col gap-6 grow">
      <div className="flex flex-col gap-6">
        <AnalysisFilter categoryFilter={useCategoryFilter} />
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-color)] font-bold dark:text-[var(--dark-text-color)]">
            Monthly Spending Overview
          </p>
          {(checkExpensesWithoutBudget || checkExpensesExceededBudget) && (
            <div className="py-4 px-2 flex flex-col gap-1 bg-red-50 rounded-xl dark:bg-[var(--dark-neutral-color)]">
              <p className="text-[.7rem] text-gray-600 font-bold dark:text-[var(--dark-text-color)]">
                Notice:
              </p>

              {checkExpensesWithoutBudget && (
                <p className="flex items-center gap-1 text-[.7rem] text-[#FF0000] font-bold">
                  <span>
                    <IconAlertCircleFilled className="w-3 h-3" />
                  </span>
                  Tracked Expenses Without a Budget
                </p>
              )}
              {checkExpensesExceededBudget && (
                <p className="flex items-center gap-1 text-[.7rem] text-[#FF0000] font-bold">
                  <span>
                    <IconAlertCircleFilled className="w-3 h-3" />
                  </span>
                  Tracked Expenses Exceeded the Budget
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col grow">
        <div className="barData grow overflow-x-scroll items-end grid auto-cols-[100px] grid-flow-col gap-4">
          {barData.map((data, index) => {
            return (
              <DynamicBar key={index} data={data} label={categoryChoice} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalysisContainer;
