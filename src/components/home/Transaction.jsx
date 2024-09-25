import React from "react";
import TransactionCard from "./dynamic/TransactionCard";
import { Link } from "react-router-dom";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import { IconMessageExclamation } from "@tabler/icons-react";
import Empty from "../../alerts/indicators/Empty";

const Transaction = () => {
  const { transactions } = useFetchStorage();

  return (
    <div className="p-4 mb-[5rem] flex flex-col gap-6 ">
      <div className="flex justify-between items-center text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
        <p className="text-lg font-bold">Recent Transactions</p>
        <Link
          to="/transactions"
          className="text-[0.75rem] text-[var(--accent-color)] font-bold cursor-pointer dark:text-[var(--dark-accent-color)]"
        >
          View all transactions
        </Link>
      </div>
      {transactions.length > 0 ? (
        <div className="flex flex-col gap-6">
          {transactions
            .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
            .slice(0, 4)
            .map((transaction) => {
              return (
                <TransactionCard
                  key={transaction.transactionId}
                  transaction={transaction}
                />
              );
            })}
        </div>
      ) : (
        <Empty
          title="No Recorded Transactions"
          subtext="Any recent transaction will be shown here!"
        />
      )}
    </div>
  );
};

export default Transaction;
