import { useEffect, useRef, useState } from "react";
import useFetchStorage from "../../fetch/useFetchStorage";

const usePopulate = (defaultInput, storageType) => {
  const { accounts, expenses, budget } = useFetchStorage();
  const getField = JSON.parse(localStorage.getItem("populateField"));
  const [populate, setPopulate] = useState(
    (Boolean(getField) && getField) || defaultInput
  );

  const setPopulateFields = (id) => {
    const mapStorage = {
      accounts: accounts,
      expenses: expenses,
      budget: budget,
    };

    const mapId = {
      accounts: "id",
      expenses: "expenseId",
      budget: "budgetId",
    };

    const currentStorage = mapStorage[storageType];

    setPopulate(
      currentStorage.find((storage) => storage[mapId[storageType]] === id) ||
        defaultInput
    );
  };

  useEffect(() =>
    localStorage.setItem("populateField", JSON.stringify(populate))
  );

  return { populate, setPopulateFields };
};

export default usePopulate;
