import { useStorageContext } from "../storage/useStorage";

const useFetchStorage = () => {
  const {
    storage: { accounts, expenses, budget, transactions },
  } = useStorageContext();

  const categoryChoice = JSON.parse(localStorage.getItem("categoryChoice"));

  return { accounts, expenses, budget, transactions, categoryChoice };
};

export default useFetchStorage;
