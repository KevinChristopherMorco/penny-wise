import React from "react";
import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";
import {
  IconAlertCircleFilled,
  IconCurrency,
  IconCurrencyPeso,
} from "@tabler/icons-react";
import useBudgetFilter from "../../hooks/fetch/budget/useBudgetFilter";
import { useBudgetContext } from "../../hooks/user-actions/budget/useManageBudget";

const BudgetCategory = ({ category }) => {
  const { setCurrentActive } = useNavigateContext();
  const { categoriesNoBudgetWithExpense: filter, totalExpenseWithNoBudget } =
    useBudgetFilter();

  const { currentMonthYearFormat, monthYearChoiceFormat } = useBudgetContext();

  const categoriesNoBudgetWithExpense = filter.find(
    (expense) => expense.expenseCategory === category.label
  );

  return (
    <div className="p-4 bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 flex justify-center items-center rounded-full"
              style={{ backgroundColor: category.colorCode }}
            >
              <img
                src={category.imagePath}
                alt=""
                className="w-7 h-7 rounded-full"
              />
            </div>
            <p className="text-sm font-bold">{category.altText}</p>

            {categoriesNoBudgetWithExpense && (
              <IconAlertCircleFilled className="w-5 h-5 text-red-500" />
            )}
          </div>
          {categoriesNoBudgetWithExpense && (
            <div>
              <p className="flex items-center text-[.7rem] text-red-500 font-bold">
                Expenses amounting to: <IconCurrencyPeso className="w-4 h-4" />
                {parseFloat(
                  totalExpenseWithNoBudget[category.label]
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
              </p>
            </div>
          )}
        </div>
        {new Date(monthYearChoiceFormat).getTime() >=
          new Date(currentMonthYearFormat).getTime() && (
          <button
            className="px-3 py-1 text-[.8rem] border border-[var(--accent-color)] text-[var(--accent-color)] font-bold rounded-lg dark:text-[var(--dark-accent-color)] dark:border-[var(--dark-accent-color)]"
            onClick={() => {
              setCurrentActive("modal", {
                modalName: "addBudget",
                type: "add",
              });
              localStorage.setItem(
                "categoryChoice",
                JSON.stringify({ category })
              );
            }}
          >
            Set Budget
          </button>
        )}
      </div>
    </div>
  );
};

export default BudgetCategory;
