import React from "react";
import useBarFilter from "../../../hooks/fetch/analysis/useBarFilter";
import useServerDate from "../../../hooks/fetch/useServerDate";
import useFetchStorage from "../../../hooks/fetch/useFetchStorage";
import { IconAlertCircleFilled } from "@tabler/icons-react";

const DynamicBar = ({ data }) => {
  const { currentMonthFormat } = useServerDate();
  const { month, totalExpenses, totalBudget, percentage } = data;

  console.log(percentage);

  return (
    <div className="h-full flex flex-col gap-2 justify-end text-light text-center text-gray-400 text-[.9rem]">
      <div className="flex flex-col">
        <p
          className={`${
            currentMonthFormat === month
              ? percentage > 100 || (totalExpenses > 0 && totalBudget === 0)
                ? "text-[#FF0000] font-bold"
                : "text-[--brand-color-500] font-bold"
              : percentage > 100 || (totalExpenses > 0 && totalBudget === 0)
              ? "text-[#FF0000] font-bold"
              : "text-gray-500"
          }`}
        >
          {percentage > 100 ? ">100" : percentage}%
        </p>
        <div
          className={`${
            percentage > 100 || (totalExpenses > 0 && totalBudget === 0)
              ? "text-[#FF0000]"
              : "text-gray-400"
          } flex justify-center items-center gap-1 text-[.6rem]`}
        >
          <p className="flex justify-center items-center">
            {parseFloat(totalExpenses).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>of</p>
          <p className="flex justify-center items-center">
            {parseFloat(totalBudget).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      {currentMonthFormat === month ? (
        <div
          className={`${
            percentage > 100 || (totalExpenses > 0 && totalBudget === 0)
              ? "from-[#FF0000] to-red-400"
              : "from-[#01B202] to-[#4DFE4E]"
          } bg-gradient-to-tl rounded-xl transition-all duration-[0.4s]`}
          style={{ height: `${percentage > 100 ? 100 : percentage || 0.5}%` }}
        ></div>
      ) : (
        <div
          className={`${
            percentage > 100 || (totalExpenses > 0 && totalBudget === 0)
              ? "from-[#FF0000] to-red-400"
              : "from-[#01B202] to-[#4DFE4E]"
          } bg-gradient-to-tl rounded-xl transition-all duration-[0.4s]`}
          style={{ height: `${percentage > 100 ? 100 : percentage || 0.5}%` }}
        ></div>
      )}

      <p
        className={`${
          currentMonthFormat === month
            ? percentage > 100 || (totalExpenses > 0 && totalBudget === 0)
              ? "text-[#FF0000] font-bold"
              : "text-[--brand-color-500] font-bold"
            : percentage > 100 || (totalExpenses > 0 && totalBudget === 0)
            ? "text-[#FF0000] font-bold"
            : "text-gray-500"
        } flex justify-center items-center gap-1`}
      >
        {new Date(month).toLocaleDateString("en-US", {
          month: "long",
        })}
        {totalBudget === 0 && totalExpenses > 0 && (
          <span>
            <IconAlertCircleFilled className="w-4 h-4 text-red-500" />
          </span>
        )}
      </p>
    </div>
  );
};

export default DynamicBar;
