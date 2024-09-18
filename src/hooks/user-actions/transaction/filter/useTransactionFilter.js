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

  const totalUnreadTransactions = transactions
    .filter((transaction) => !transaction.isRead)
    .reduce((total, transaction) => {
      const { isRead } = transaction;
      if (isRead) return;
      total += 1;

      return total;
    }, 0);

  return { filteredTransaction, totalUnreadTransactions, chooseFilter };
};

export default useTransactionFilter;
