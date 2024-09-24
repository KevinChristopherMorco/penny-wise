import React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconAlertCircleFilled,
} from "@tabler/icons-react";

import categories from "../../json/expenseCategory.json";
import useCategoryFilter from "../../hooks/user-actions/analysis/useCategoryFilter";
import useBarFilter from "../../hooks/fetch/analysis/useBarFilter";
import { useAnalysisContext } from "../../hooks/user-actions/analysis/useManageAnalysis";

import DynamicBar from "./dynamic/DynamicBar";

const AnalysisContainer = () => {
  const {
    category: { altText, colorCode, imagePath, label: categoryChoice },
    handleCategoryChoice,
  } = useCategoryFilter();

  const { yearChoice, currentYear, handleYearChoice } = useAnalysisContext();

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
        <div className="flex justify-around items-center gap-2">
          <div className="w-[65%] p-2 flex justify-center items-center gap-2 text-[var(--primary-color)] bg-[var(--brand-color-500)] dark:text-[var(--dark-text-color)] dark:bg-[var(--brand-color-900)]  rounded-xl">
            <div>
              <span>
                <IconChevronLeft
                  className={`${
                    categoryChoice === categories[0].label ? "invisible" : ""
                  } w-5 h-5 text-[var(--primary-color)] font-bold`}
                  onClick={() => handleCategoryChoice("minus")}
                />
              </span>
            </div>
            <div className="min-w-[65%] flex justify-center items-center gap-2">
              <div
                className="w-8 h-8 flex justify-center items-center rounded-full"
                style={{ backgroundColor: colorCode }}
              >
                <img src={imagePath} alt="" className="w-5 h-5 rounded-full" />
              </div>
              <p className="text-sm font-bold">{altText}</p>
            </div>
            <div>
              <span>
                <IconChevronRight
                  className={`${
                    categoryChoice === categories[categories.length - 1].label
                      ? "invisible"
                      : ""
                  } w-5 h-5 text-[var(--primary-color)] font-bold`}
                  onClick={() => handleCategoryChoice("add")}
                />
              </span>
            </div>
          </div>
          <div className="p-3 flex justify-center items-center gap-2 text-[var(--primary-color)] bg-[var(--brand-color-500)] dark:text-[var(--dark-text-color)] dark:bg-[var(--brand-color-900)]  rounded-xl">
            <div>
              <span>
                <IconChevronLeft
                  id="yearDesc"
                  className={`${
                    yearChoice === currentYear - 1 ? "invisible" : ""
                  } w-5 h-5 text-[var(--primary-color)] font-bold`}
                  onClick={handleYearChoice}
                />
              </span>
            </div>
            <p>{yearChoice}</p>
            <div>
              <span>
                <IconChevronRight
                  id="yearAsc"
                  className={`${
                    yearChoice === currentYear ? "invisible" : ""
                  } w-5 h-5 text-[var(--primary-color)] font-bold`}
                  onClick={handleYearChoice}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-color)] font-bold dark:text-[var(--dark-text-color)]">
            Monthly Food Spending Overview
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
        <div className="grow overflow-x-scroll items-end grid auto-cols-[100px] grid-flow-col gap-4">
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
