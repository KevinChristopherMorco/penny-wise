import React, { useState } from "react";
import TransactionHeader from "../transaction/TransactionHeader";
import TransactionFilter from "../transaction/TransactionFilter";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import TransactionCard from "../transaction/dynamic/transactionCard";

const Transaction = () => {
  const { transactions } = useFetchStorage();
  return (
    <div className="h-full min-h-screen flex flex-col">
      <TransactionHeader />
      <TransactionFilter />

      <div className="mb-[5rem] flex-1 flex flex-col gap-4">
        <p className="px-4 font-extrabold">Latest</p>
        <div className="flex flex-col gap-1 bg-[var(--primary-color)] ">
          {transactions.map((transaction) => {
            return (
              <TransactionCard
                key={transaction.transactionId}
                transaction={transaction}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
