import { useEffect, useRef, useState } from "react";
import useFetchStorage from "../../fetch/useFetchStorage";

const usePopulate = (defaultInput) => {
  const { budget } = useFetchStorage();
  const getField = JSON.parse(localStorage.getItem("populateBudget"));
  const [populateBudget, setPopulate] = useState(
    (Boolean(getField) && getField) || defaultInput
  );

  const setPopulateBudget = (id) => {
    setPopulate(
      budget.find((budget) => budget.budgetId === id) || defaultInput
    );
  };

  useEffect(
    () =>
      localStorage.setItem("populateBudget", JSON.stringify(populateBudget), [
        populateBudget,
      ]),
    [populateBudget]
  );

  return { populateBudget, setPopulateBudget };
};

export default usePopulate;
