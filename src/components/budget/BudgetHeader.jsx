import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useBudgetContext } from "../../hooks/user-actions/budget/useManageBudget";

const BudgetHeader = () => {
  const navigate = useNavigate();
  const { formattedYear, handleDateChoice } = useBudgetContext();
  return (
    <div className="p-4 flex items-center bg-[var(--accent-color)] text-[var(--text-accent)]">
      <div className="w-full flex justify-center gap-4 items-center font-bold">
        <IconChevronLeft
          className="w-5 h-5 cursor-pointer"
          id="monthDesc"
          onClick={handleDateChoice}
        />
        <p className="flex items-center">{formattedYear}</p>
        <IconChevronRight
          className="w-5 h-5 cursor-pointer"
          id="monthAsc"
          onClick={handleDateChoice}
        />
      </div>
    </div>
  );
};

export default BudgetHeader;
