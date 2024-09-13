import React, { useState } from "react";
import TransactionHeader from "../transaction/TransactionHeader";
import { IconMail } from "@tabler/icons-react";
import TransactionFilter from "../transaction/TransactionFilter";

const Transaction = () => {
  return (
    <div className="grow flex flex-col">
      <TransactionHeader />
      <TransactionFilter />

      <div className="mb-[3rem] grow flex flex-col gap-4">
        <p className="px-4 font-extrabold">Latest</p>
        <div className="flex flex-col gap-1 bg-[var(--primary-color)] ">
          <div className="w-full p-4 flex justify-between items-center shadow bg-[var(--primary-color)] rounded-lg">
            <div className="basis-[9%] flex justify-center items-center relative">
              <IconMail className="w-full h-full text-[var(--accent-color)]" />
              <span className="w-3 h-3 bg-red-500 top-0 -left-1 absolute rounded-full"></span>
            </div>
            <div className="basis-[85%] overflow-hidden truncate">
              <p className="font-extrabold">Lorem ipsum dolor sit</p>
              <p className="overflow-hidden truncate text-[0.9rem]">
                Quis commodi obcaecati facilis omnis sint. Aliquid provident eos
                ullam magni molestiae nostrum a quod laudantium.
              </p>
            </div>
          </div>
          <div className="w-full p-4 flex justify-between items-center shadow bg-[var(--primary-color)] rounded-lg">
            <div className="basis-[9%] flex justify-center items-center relative">
              <IconMail className="w-full h-full text-[var(--accent-color)]" />
              <span className="w-3 h-3 bg-red-500 top-0 -left-1 absolute rounded-full"></span>
            </div>
            <div className="basis-[85%] overflow-hidden truncate">
              <p className="font-extrabold">Lorem ipsum dolor sit</p>
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
