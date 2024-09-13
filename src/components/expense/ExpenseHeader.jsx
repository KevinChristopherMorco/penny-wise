import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ExpenseHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex items-center bg-[var(--accent-color)] text-[var(--text-accent)]">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IconChevronLeft className="w-5 h-5" />
      </div>
      <div className="w-full flex justify-center items-center font-bold">
        <p className="flex items-center">Add Expense</p>
      </div>
    </div>
  );
};

export default ExpenseHeader;
