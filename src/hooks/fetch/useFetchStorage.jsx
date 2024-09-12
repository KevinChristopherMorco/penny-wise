import { useStorageContext } from "../storage/useStorage";

const useFetchStorage = () => {
  const {
    storage: { accounts, expenses, budget },
  } = useStorageContext();

  return { accounts, expenses, budget };
};

export default useFetchStorage;
