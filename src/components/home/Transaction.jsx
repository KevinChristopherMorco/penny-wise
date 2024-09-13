import React from "react";
import TransactionCard from "./dynamic/TransactionCard";

const Transaction = () => {
  return (
    <div className="p-4 mb-[5rem] flex flex-col gap-2 bg-[var(--primary-color)]">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Transactions</p>
        <p className="text-[0.8rem] cursor-pointer dark:text-[var(--dark-accent-color)]">
          View all transactions
        </p>
      </div>
      <div className="py-6 flex flex-col gap-6">
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
    </div>
  );
};

export default Transaction;
