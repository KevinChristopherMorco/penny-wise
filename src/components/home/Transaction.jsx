import React from "react";
import TransactionCard from "./dynamic/TransactionCard";

const Transaction = () => {
  return (
    <div className="p-4 mb-[5rem] flex flex-col gap-6 bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]">
      <div className="flex justify-between items-center text-[var(--accent-color)] dark:text-[var(--dark-text-color)]">
        <p className="text-lg font-bold">Transactions</p>
        <p className="text-[0.8rem] text-[var(--accent-color)] font-bold cursor-pointer dark:text-[var(--dark-accent-color)]">
          View all transactions
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
    </div>
  );
};

export default Transaction;
