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

  const transactionNumberData = filteredTransaction.reduce(
    (transaction, item) => {
      if (item.isRead) {
        transaction.totalIsRead += 1;
      } else {
        transaction.totalIsUnread += 1;
      }

      transaction.totalTransaction += 1;

      return transaction;
    },
    { totalIsRead: 0, totalIsUnread: 0, totalTransaction: 0 }
  );

  return {
    filteredTransaction,
    transactionNumberData,
    chooseFilter,
  };
};

export default useTransactionFilter;
