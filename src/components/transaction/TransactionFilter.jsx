import React, { useState } from "react";

const TransactionFilter = () => {
  const [active, setActive] = useState("filterAll");

  return (
    <div className="p-4 flex flex-col gap-5 animate-fadeIn">
      <div className="flex items-center gap-6">
        <p className="font-extrabold">Filter</p>
        <ul className="horizontalFilter flex gap-3 overflow-x-scroll">
          <li
            className={`${
              active === "filterAll"
                ? "border-[2.5px] border-[var(--accent-color)] text-[var(--accent-color)]"
                : "border border-gray-500 text-gray-500"
            } py-[.20rem] px-4 font-extrabold rounded-full cursor-pointer`}
            onClick={() => setActive("filterAll")}
          >
            All
          </li>
          <li
            className={`${
              active === "filterAccounts"
                ? "border-[2.5px] border-[var(--accent-color)] text-[var(--accent-color)]"
                : "border border-gray-500 text-gray-500"
            } py-[.20rem] px-4 font-extrabold rounded-full cursor-pointer`}
            onClick={() => setActive("filterAccounts")}
          >
            Accounts
          </li>
          <li
            className={`${
              active === "filterExpense"
                ? "border-[2.5px] border-[var(--accent-color)] text-[var(--accent-color)]"
                : "border border-gray-500 text-gray-500"
            } py-[.20rem] px-4 font-extrabold rounded-full cursor-pointer`}
            onClick={() => setActive("filterExpense")}
          >
            Expenses
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionFilter;
