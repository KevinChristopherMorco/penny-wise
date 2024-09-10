import React, { useRef } from "react";
import useFetchStorage from "../../fetch/useFetchStorage";

const usePopulate = (defaultInput) => {
  const { accounts } = useFetchStorage();
  const getField = JSON.parse(localStorage.getItem("populateField"));
  const populateField = useRef(getField.current || defaultInput);

  const setPopulate = (id) => {
    populateField.current =
      accounts.find((account) => account.id === id) || defaultInput;
    localStorage.setItem("populateField", JSON.stringify(populateField));
  };

  return { populateField, setPopulate };
};

export default usePopulate;
