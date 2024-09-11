import React from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

const ExpenseSummaryHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 w-full flex items-center shadow shadow-[var(--accent-color)] dark:shadow-[var(--dark-accent-color)]">
      <div className="basis-auto" onClick={() => navigate(-1)}>
        <IconChevronLeft />
      </div>
      <div className="basis-[100%] text-center">
        <p className="font-bold">Account Summary</p>
      </div>
    </div>
  );
};

export default ExpenseSummaryHeader;
