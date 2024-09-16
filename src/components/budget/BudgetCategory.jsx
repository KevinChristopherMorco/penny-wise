import React from "react";
import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";

const BudgetCategory = ({ category }) => {
  const { setCurrentActive } = useNavigateContext();
  return (
    <div className="p-4 shadow-lg bg-[var(--primary-color)] rounded-lg">
      <div className="flex justify-between items-center">
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
        </div>
        <button
          className="px-3 py-1 text-[.8rem] border border-[var(--accent-color)] text-[var(--accent-color)] font-bold rounded-lg"
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
      </div>
    </div>
  );
};

export default BudgetCategory;
