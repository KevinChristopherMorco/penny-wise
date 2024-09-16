import useFetchStorage from "../../fetch/useFetchStorage";

const usePageExist = (id) => {
  const { accounts, transactions } = useFetchStorage();

  const isValidAccountId = accounts.some((account) => account.id === id);

  const isValidTransactionId = transactions.some(
    (transaction) => transaction.transactionId === id
  );

  return { isValidAccountId, isValidTransactionId };
};

export default usePageExist;
