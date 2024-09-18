import React, { useState } from "react";

const TransactionFilter = ({ chooseFilter }) => {
  const [active, setActive] = useState("all");

  const handleFilter = (active) => {
    setActive(active);
    chooseFilter(active);
  };

  return (
    <div className="p-4 flex flex-col gap-5 animate-fadeIn">
      <div className="flex items-center gap-6">
        <p className="font-extrabold">Filter</p>
        <ul className="horizontalFilter flex gap-3 overflow-x-scroll">
          <li
            className={`${
              active === "all"
                ? "border-[2.5px] border-[var(--accent-color)] text-[var(--accent-color)]"
                : "border border-gray-500 text-gray-500"
            } py-[.20rem] px-4 font-extrabold rounded-full cursor-pointer`}
            onClick={() => handleFilter("all")}
          >
            All
          </li>
          <li
            className={`${
              active === "account"
                ? "border-[2.5px] border-[var(--accent-color)] text-[var(--accent-color)]"
                : "border border-gray-500 text-gray-500"
            } py-[.20rem] px-4 font-extrabold rounded-full cursor-pointer`}
            onClick={() => handleFilter("account")}
          >
            Accounts
          </li>
          <li
            className={`${
              active === "expense"
                ? "border-[2.5px] border-[var(--accent-color)] text-[var(--accent-color)]"
                : "border border-gray-500 text-gray-500"
            } py-[.20rem] px-4 font-extrabold rounded-full cursor-pointer`}
            onClick={() => handleFilter("expense")}
          >
            Expenses
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionFilter;
