import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useServerDate from "../../../hooks/fetch/useServerDate";
import { useBudgetContext } from "../../../hooks/user-actions/budget/useManageBudget";

const BudgetFilter = () => {
  const { monthsList, currentYear } = useServerDate();
  const { monthChoice, yearChoice, handleDateChoice, handleYearChoice } =
    useBudgetContext();

  const checkFirstLastMonth = (ar, count) => {
    return ar[count];
  };

  return (
    <div className="p-4 flex justify-center items-center gap-2">
      <div className="min-w-[50%] p-3 flex justify-center items-center gap-2 text-[var(--primary-color)] font-bold bg-[var(--accent-color)] xl:min-w-[30%] 2xl:min-w-[25%] dark:text-[var(--dark-primary-color)] dark:bg-[var(--dark-accent-color)]  rounded-xl">
        <IconChevronLeft
          className={`${
            checkFirstLastMonth(monthsList, 0) === monthChoice
              ? "invisible"
              : ""
          } w-5 h-5 cursor-pointer`}
          id="monthDesc"
          onClick={handleDateChoice}
        />
        <p className="min-w-[60%] flex justify-center items-center">
          {monthChoice}
        </p>
        <IconChevronRight
          className={`${
            checkFirstLastMonth(monthsList, monthsList.length - 1) ===
            monthChoice
              ? "invisible"
              : ""
          } w-5 h-5 cursor-pointer`}
          id="monthAsc"
          onClick={handleDateChoice}
        />
      </div>
      <div className="p-3 flex justify-center items-center gap-2 text-[var(--primary-color)] font-bold bg-[var(--accent-color)] dark:text-[var(--dark-primary-color)] dark:bg-[var(--dark-accent-color)]  rounded-xl">
        <div>
          <span>
            <IconChevronLeft
              id="yearDesc"
              className={`${
                yearChoice === currentYear - 1 ? "invisible" : ""
              } w-5 h-5 cursor-pointer`}
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
              } w-5 h-5 cursor-pointer`}
              onClick={handleYearChoice}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetFilter;
