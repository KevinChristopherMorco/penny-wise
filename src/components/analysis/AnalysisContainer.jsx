import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React from "react";
import useCategoryFilter from "../../hooks/user-actions/analysis/useCategoryFilter";
import DynamicBar from "./dynamic/DynamicBar";

const AnalysisContainer = () => {
  const {
    category: { altText, colorCode, imagePath, label },
    setCountCategory,
  } = useCategoryFilter();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-[var(--text-color)]">
          <div>
            <span>
              <IconChevronLeft
                className="w-4 h-4 text-gray-500"
                onClick={() => setCountCategory("minus")}
              />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex justify-center items-center rounded-full"
              style={{ backgroundColor: colorCode }}
            >
              <img src={imagePath} alt="" className="w-5 h-5 rounded-full" />
            </div>
            <p className="text-sm font-bold ">{altText}</p>
          </div>
          <div>
            <span>
              <IconChevronRight
                className="w-4 h-4 text-gray-500"
                onClick={() => setCountCategory("add")}
              />
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray-500">Monthly Food Spending Overview</p>
        </div>
      </div>

      <div className="h-[25rem] overflow-x-scroll items-end grid auto-cols-[100px] grid-flow-col gap-4">
        {months.map((month, index) => {
          return <DynamicBar key={index} month={month} label={label} />;
        })}
      </div>
    </div>
  );
};

export default AnalysisContainer;
