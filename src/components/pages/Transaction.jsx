import React, { useState } from "react";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";

import TransactionHeader from "../transaction/TransactionHeader";
import TransactionFilter from "../transaction/TransactionFilter";
import TransactionCard from "../transaction/dynamic/transactionCard";
import Empty from "../../alerts/indicators/Empty";
import useTransactionFilter from "../../hooks/user-actions/transaction/filter/useTransactionFilter";

const Transaction = () => {
  const { filteredTransaction, chooseFilter } = useTransactionFilter();
  const { transactions } = useFetchStorage();

  return (
    <div className="h-full min-h-screen flex flex-col">
      <TransactionHeader />
      <TransactionFilter chooseFilter={chooseFilter} />
      <div className="mb-[6rem] flex-1 flex flex-col gap-4">
        <p className="px-4 font-extrabold">Latest</p>
        <div className="flex flex-col gap-1 ">
          {Boolean(transactions) && transactions.length > 0 ? (
            filteredTransaction
              .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
              .map((transaction) => {
                return (
                  !transaction.isRead && (
                    <TransactionCard
                      key={transaction.transactionId}
                      transaction={transaction}
                      isRead={false}
                    />
                  )
                );
              })
          ) : (
            <Empty
              title="No Transactions Yet"
              subtext="Any transaction records will be shown here."
            />
          )}
        </div>
        {Boolean(transactions) &&
          transactions.length > 0 &&
          transactions.some((transaction) => transaction.isRead) && (
            <div className="flex flex-col gap-4">
              <p className="px-4 font-extrabold">Viewed Transactions</p>
              <div className="flex flex-col gap-1 bg-[var(--primary-color)] ">
                {transactions
                  .sort(
                    (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
                  )
                  .map((transaction) => {
                    return (
                      transaction.isRead && (
                        <TransactionCard
                          key={transaction.transactionId}
                          transaction={transaction}
                          isRead={true}
                        />
                      )
                    );
                  })}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Transaction;
