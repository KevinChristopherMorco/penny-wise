import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import categories from "../../../json/expenseCategory.json";
import { useAnalysisContext } from "../../../hooks/user-actions/analysis/useManageAnalysis";

const AnalysisFilter = ({ categoryFilter }) => {
  const { yearChoice, currentYear, handleYearChoice } = useAnalysisContext();

  const {
    category: { altText, colorCode, imagePath, label: categoryChoice },
    handleCategoryChoice,
  } = categoryFilter();

  const checkFirstLastCategory = (ar, count) => {
    return ar[count].label;
  };

  return (
    <div className="flex justify-around items-center gap-2">
      <div className="w-[65%] p-2 flex justify-center items-center gap-2 text-[var(--primary-color)] bg-[var(--brand-color-500)] dark:text-[var(--dark-text-color)] dark:bg-[var(--brand-color-900)]  rounded-xl">
        <div>
          <span>
            <IconChevronLeft
              className={`${
                categoryChoice === checkFirstLastCategory(categories, 0)
                  ? "invisible"
                  : ""
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
                categoryChoice ===
                checkFirstLastCategory(categories, categories.length - 1)
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
  );
};

export default AnalysisFilter;
