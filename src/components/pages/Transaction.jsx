import React, { useState } from "react";
import TransactionHeader from "../transaction/TransactionHeader";
import { IconMail } from "@tabler/icons-react";

const Transaction = () => {
  const [active, setActive] = useState("filterAll");
  return (
    <div>
      <TransactionHeader />
      <div className="p-4 flex flex-col gap-5 animate-fadeIn">
        <div className="flex items-center gap-6">
          <p className="font-bold">Filter</p>
          <ul className="flex gap-3 overflow-x-scroll">
            <li
              className={`${
                active === "filterAll"
                  ? "border border-[var(--accent-color)] text-[var(--accent-color)]"
                  : "border border-gray-500 text-gray-500"
              } py-[.20rem] px-4 font-bold rounded-full cursor-pointer`}
              onClick={() => setActive("filterAll")}
            >
              All
            </li>
            <li
              className={`${
                active === "filterAccounts"
                  ? "border border-[var(--accent-color)] text-[var(--accent-color)]"
                  : "border border-gray-500 text-gray-500"
              } py-[.20rem] px-4 font-bold rounded-full cursor-pointer`}
              onClick={() => setActive("filterAccounts")}
            >
              Accounts
            </li>
            <li
              className={`${
                active === "filterExpense"
                  ? "border border-[var(--accent-color)] text-[var(--accent-color)]"
                  : "border border-gray-500 text-gray-500"
              } py-[.20rem] px-4 font-bold rounded-full cursor-pointer`}
              onClick={() => setActive("filterExpense")}
            >
              Expenses
            </li>
          </ul>
        </div>
      </div>
      <div className="px-4 flex flex-col gap-4">
        <p className="font-bold">Latest</p>
        <div>
          <div className="w-full py-4 px-2 flex justify-between items-center shadow border-2 border-[var(--neutral-color)] rounded-lg">
            <div className="basis-[9%] flex justify-center items-center relative">
              <IconMail className="w-full h-full text-[var(--accent-color)]" />
              <span className="w-3 h-3 bg-red-500 top-0 -left-1 absolute rounded-full"></span>
            </div>
            <div className="basis-[85%] overflow-hidden truncate">
              <p className="font-bold">Lorem ipsum dolor sit</p>
              <p className="overflow-hidden truncate text-[0.9rem]">
                Quis commodi obcaecati facilis omnis sint. Aliquid provident eos
                ullam magni molestiae nostrum a quod laudantium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
