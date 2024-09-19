import { useState } from "react";
import useFetchStorage from "../../../fetch/useFetchStorage";

const useTransactionFilter = () => {
  const { transactions } = useFetchStorage();

  const [filteredTransaction, setFilter] = useState(transactions);

  const chooseFilter = (filterChoice) => {
    const filter = transactions.filter(
      (transaction) => transaction.transactionType === filterChoice
    );

    setFilter(() => (filter.length > 0 ? filter : transactions));
  };

  const totalUnreadTransactions = filteredTransaction
    .filter((transaction) => !transaction.isRead)
    .reduce((total, transaction) => {
      const { isRead } = transaction;
      if (isRead) return;
      total += 1;

      return total;
    }, 0);

  const totalReadTransactions = filteredTransaction
    .filter((transaction) => transaction.isRead)
    .reduce((total, transaction) => {
      const { isRead } = transaction;
      if (!isRead) return;
      total += 1;

      return total;
    }, 0);

  const totalTransaction = filteredTransaction.reduce((total, transaction) => {
    const checkIsRead = transaction.isRead;
    if (!Boolean(total[checkIsRead])) total[checkIsRead] = 0;

    total[checkIsRead] += 1;

    return total;
  }, {});

  return {
    filteredTransaction,
    totalUnreadTransactions,
    totalReadTransactions,
    totalTransaction,
    chooseFilter,
  };
};

export default useTransactionFilter;
