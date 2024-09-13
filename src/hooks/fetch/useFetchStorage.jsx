import { useStorageContext } from "../storage/useStorage";

const useFetchStorage = () => {
  const {
    storage: { accounts, expenses, budget, transactions },
  } = useStorageContext();

  return { accounts, expenses, budget, transactions };
};

export default useFetchStorage;
