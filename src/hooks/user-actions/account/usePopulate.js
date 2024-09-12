import { useEffect, useRef, useState } from "react";
import useFetchStorage from "../../fetch/useFetchStorage";

const usePopulate = (defaultInput) => {
  const { accounts } = useFetchStorage();
  const getField = JSON.parse(localStorage.getItem("populateAccount"));
  const [populateAccount, setPopulate] = useState(
    (Boolean(getField) && getField) || defaultInput
  );

  const setPopulateAccount = (id) => {
    setPopulate(accounts.find((account) => account.id === id) || defaultInput);
  };

  useEffect(() =>
    localStorage.setItem("populateAccount", JSON.stringify(populateAccount))
  );

  return { populateAccount, setPopulateAccount };
};

export default usePopulate;
