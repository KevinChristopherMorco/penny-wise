import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const TransactionHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 flex flex-col gap-4 shadow shadow-[var(--accent-color)] bg-[var(--accent-color)] text-[var(--text-accent)] dark:shadow-[var(--dark-accent-color)]">
      <div className="w-full flex items-center">
        <div onClick={() => navigate(-1)} className="cursor-pointer">
          <IconChevronLeft className="w-5 h-5 self-start" />
        </div>
        <p className="w-full flex justify-center font-bold">Transactions</p>
      </div>
    </div>
  );
};

export default TransactionHeader;
