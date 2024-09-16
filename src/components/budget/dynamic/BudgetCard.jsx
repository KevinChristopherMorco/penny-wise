import React from "react";
import { IconCurrencyPeso } from "@tabler/icons-react";
import useCardFilter from "../../../hooks/user-actions/budget/filter/dynamic/useBudgetCardFilter";

const BudgetCard = ({ category, formattedYear, currentDate }) => {
  const { imagePath, colorCode, label, altText } = category;
  const { progressPercentage, budgetCategoryInfo, totalExpenseAmount } =
    useCardFilter(formattedYear, currentDate, label);

  return (
    <div className="p-4 shadow-md bg-[var(--primary-color)] rounded-lg">
      <div className="h-[7rem] flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400">Total Budget</p>
            <div className="flex items-center text-lg font-bold">
              <span>
                <IconCurrencyPeso className="w-5 h-5" />
              </span>
              <p>
                {parseFloat(budgetCategoryInfo.budgetAmount).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex justify-center items-center rounded-full"
              style={{ backgroundColor: colorCode }}
            >
              <img src={imagePath} alt="" className="w-5 h-5 rounded-full" />
            </div>
            <p className="text-[.8rem] text-gray-500 font-bold">{altText}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className={` h-2 flex items-center rounded-full animate-fillWidth relative`}
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: colorCode,
              }}
            >
              <div className="w-2 h-2 right-0 absolute bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex gap-1 font-medium">
              <p>Spent:</p>
              <div className="flex items-center text-sm font-bold">
                <span>
                  <IconCurrencyPeso className="w-5 h-5" />
                </span>
                <p>
                  {parseFloat(totalExpenseAmount || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <div className="text-gray-500">
              <p>{progressPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
