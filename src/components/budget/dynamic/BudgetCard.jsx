import React, { useState } from "react";
import {
  IconAlertCircleFilled,
  IconCurrencyPeso,
  IconPencilMinus,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigateContext } from "../../../hooks/general/navigation/useActiveNavigation";
import { useBudgetContext } from "../../../hooks/user-actions/budget/useManageBudget";
import useCardFilter from "../../../hooks/user-actions/budget/filter/dynamic/useBudgetCardFilter";

const BudgetCard = ({
  category,
  monthYearChoiceFormat,
  currentMonthYearFormat,
}) => {
  const [hover, setHover] = useState(false);
  const { imagePath, colorCode, label, altText } = category;

  const { progressPercentage, budgetCategoryInfo, totalExpenseAmount } =
    useCardFilter(monthYearChoiceFormat, currentMonthYearFormat, label);
  const { handleDeleteBudget, setPopulateFields } = useBudgetContext();
  const { setCurrentActive } = useNavigateContext();

  const handleEditOnClick = () => {
    setPopulateFields(budgetCategoryInfo.budgetId);

    setCurrentActive("modal", {
      modalName: "editBudget",
      type: "edit",
    });
    localStorage.setItem("categoryChoice", JSON.stringify({ category }));
  };

  return (
    <div
      className="p-4 shadow bg-[var(--primary-color)] shadow-md rounded-lg dark:bg-[var(--dark-neutral-color)] dark:border-[var(--dark-accent-color)]"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className="flex flex-col gap-4  justify-between">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400">Total Budget</p>
            <div className="flex items-center text-lg text-[var(--accent-color)] font-extrabold">
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
            <p className="text-[.8rem] text-gray-500 dark:text-gray-300 font-bold">
              {altText}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full h-2 bg-gray-300 rounded-full dark:bg-[var(--dark-primary-color)]">
            {progressPercentage > 100 ? (
              <div
                className={`w-full h-2 flex bg-red-500 items-center rounded-full transition-all duration-[0.4s] relative`}
              >
                <div className="w-2 h-2 right-0 absolute bg-white rounded-full"></div>
              </div>
            ) : (
              <div
                className={` h-2 flex items-center rounded-full animate-fillWidth relative`}
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: colorCode,
                }}
              >
                <div className="w-2 h-2 right-0 absolute bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center text-[.8rem]">
            <div className="flex items-center gap-1 font-medium">
              <p className="text-gray-500 dark:text-gray-300">Spent:</p>
              <div
                className={`${
                  progressPercentage > 100 ? "text-red-500" : "text-gray-500"
                } flex items-center font-bold`}
              >
                <span>
                  <IconCurrencyPeso className="w-4 h-4" />
                </span>
                <p className="flex items-center">
                  {parseFloat(totalExpenseAmount || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            {progressPercentage > 100 ? (
              <div className="text-red-500 font-bold">
                <p className="flex items-center gap-1">
                  <span>
                    <IconAlertCircleFilled className="w-4 h-4" />
                  </span>
                  Limit reached
                </p>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-300">
                <p>{progressPercentage}%</p>
              </div>
            )}
          </div>
        </div>
        {hover &&
          new Date(monthYearChoiceFormat).getTime() >=
            new Date(currentMonthYearFormat).getTime() && (
            <div className="flex gap-2 text-gray-400 self-end animate-fadeIn">
              <div
                className="flex items-center gap-1 text-orange-500 font-bold"
                onClick={() => handleEditOnClick()}
              >
                <IconPencilMinus className="w-4 h-4" />
                <p className="text-sm">Edit</p>
              </div>
              <div
                className="flex items-center gap-1 text-red-500 font-bold"
                onClick={() => handleDeleteBudget(budgetCategoryInfo.budgetId)}
              >
                <IconTrash className="w-4 h-4" />
                <p className="text-sm">Delete</p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default BudgetCard;
