import React from "react";
import { IconCircleArrowDown, IconCircleArrowUp } from "@tabler/icons-react";

import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import useTransactionFilter from "../../hooks/user-actions/transaction/filter/useTransactionFilter";
import usePaginate from "../../hooks/user-actions/transaction/paginate/usePaginate";

import TransactionHeader from "../transaction/TransactionHeader";
import TransactionFilter from "../transaction/TransactionFilter";
import TransactionCard from "../transaction/dynamic/transactionCard";
import Empty from "../../alerts/indicators/Empty";

const Transaction = () => {
  const { transactions } = useFetchStorage();

  const {
    filteredTransaction,
    totalTransaction: {
      true: totalReadTransactions,
      false: totalUnreadTransactions,
    },
    chooseFilter,
  } = useTransactionFilter();
  const { paginationState, handlePaginateMore, handlePaginateLess } =
    usePaginate();

  const { readItems, readLimit, unreadItems, unreadLimit } = paginationState;

  const handleUnreadFunction = () => {
    return unreadLimit
      ? () => handlePaginateLess("unread")
      : () => handlePaginateMore("unread");
  };

  return (
    <div className="h-full min-h-screen flex flex-col">
      <TransactionHeader />
      <TransactionFilter chooseFilter={chooseFilter} />
      <div className="mb-[6rem] flex-1 flex flex-col gap-6">
        <p className="px-4 font-extrabold">Latest</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            {Boolean(transactions) && transactions.length > 0 ? (
              filteredTransaction
                .filter((transaction) => !transaction.isRead)
                .sort(
                  (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
                )
                .slice(0, unreadItems)
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
          {totalUnreadTransactions >= 3 && (
            <p
              className="py-2 flex justify-center items-center gap-1 text-center text-sm text-[var(--accent-color)] font-bold cursor-pointer dark:text-[var(--dark-accent-color)]"
              onClick={
                unreadLimit
                  ? () => handlePaginateLess("unread")
                  : () => handlePaginateMore("unread")
              }
            >
              {unreadLimit ? (
                <IconCircleArrowUp className="w-5 h-5" />
              ) : (
                <IconCircleArrowDown className="w-5 h-5" />
              )}
              {`${unreadLimit ? "See Less..." : "See More..."}`}{" "}
            </p>
          )}
        </div>
        {Boolean(transactions) &&
          transactions.length > 0 &&
          transactions.some((transaction) => transaction.isRead) && (
            <div className="flex flex-col gap-4">
              <p className="px-4 font-extrabold">Viewed Transactions</p>
              <div className="flex flex-col gap-1 bg-[var(--primary-color)] dark:bg-[var(--dark-primary-color)] ">
                {transactions
                  .filter((transaction) => transaction.isRead)
                  .sort(
                    (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
                  )
                  .slice(0, readItems)
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
        {totalReadTransactions >= 3 && (
          <p
            className="py-2 flex justify-center items-center gap-1 text-center text-sm text-[var(--accent-color)] font-bold cursor-pointer dark:text-[var(--dark-accent-color)]"
            onClick={
              readLimit
                ? () => handlePaginateLess("read")
                : () => handlePaginateMore("read")
            }
          >
            {readLimit ? (
              <IconCircleArrowUp className="w-5 h-5" />
            ) : (
              <IconCircleArrowDown className="w-5 h-5" />
            )}
            {`${readLimit ? "See Less..." : "See More..."}`}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
