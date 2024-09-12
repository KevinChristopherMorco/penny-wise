import useFetchStorage from "../../fetch/useFetchStorage";

const usePageExist = (accountId) => {
  const { accounts } = useFetchStorage();

  const isValidAccountId = accounts.some((account) => account.id === accountId);
  return { isValidAccountId };
};

export default usePageExist;
