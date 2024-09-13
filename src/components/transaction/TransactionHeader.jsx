import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const TransactionHeader = () => {
  return (
    <div className="p-4 flex flex-col gap-4 shadow shadow-[var(--accent-color)] dark:shadow-[var(--dark-accent-color)]">
      <div className="w-full flex items-center">
        <Link to="/" className="cursor-pointer">
          <IconChevronLeft className="w-5 h-5 self-start" />
        </Link>
        <p className="w-full flex justify-center font-bold">Transactions</p>
      </div>
    </div>
  );
};

export default TransactionHeader;
