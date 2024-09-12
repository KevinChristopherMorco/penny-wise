import { useEffect, useRef, useState } from "react";
import useFetchStorage from "../../fetch/useFetchStorage";

const usePopulate = (defaultInput) => {
  const { expenses } = useFetchStorage();
  const getField = JSON.parse(localStorage.getItem("populateExpense"));
  const [populateExpense, setPopulate] = useState(
    (Boolean(getField) && getField) || defaultInput
  );

  const setPopulateExpense = (id) => {
    setPopulate(
      expenses.find((expense) => expense.expenseId === id) || defaultInput
    );
  };

  useEffect(
    () =>
      localStorage.setItem("populateExpense", JSON.stringify(populateExpense), [
        populateExpense,
      ]),
    [populateExpense]
  );

  return { populateExpense, setPopulateExpense };
};

export default usePopulate;
