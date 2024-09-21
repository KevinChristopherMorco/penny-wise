import React from "react";
import useBarFilter from "../../../hooks/fetch/analysis/useBarFilter";
import useServerDate from "../../../hooks/fetch/useServerDate";

const DynamicBar = ({ month, label }) => {
  const { budgetPercentage, budgetForMonth } = useBarFilter(month, label);
  const { currentDate: currentMonth } = useServerDate();

  return (
    <div className="h-full flex flex-col gap-2 justify-end text-light text-center text-gray-400 text-[.9rem]">
      <p
        className={`${
          budgetForMonth === currentMonth
            ? "text-[var(--text-color)] font-bold"
            : ""
        }`}
      >
        {budgetPercentage}%
      </p>
      <div
        className={`${
          budgetForMonth === currentMonth
            ? "bg-gradient-to-tl from-[#01B202] to-[#4DFE4E]"
            : "bg-gradient-to-t from-[#80FE81] to-[#B3FFB3]"
        }  rounded-xl`}
        style={{ height: `${budgetPercentage}%` }}
      ></div>
      <p
        className={`${
          budgetForMonth === currentMonth
            ? "text-[var(--text-color)] font-bold"
            : ""
        }`}
      >
        {month}
      </p>
    </div>
  );
};

export default DynamicBar;
