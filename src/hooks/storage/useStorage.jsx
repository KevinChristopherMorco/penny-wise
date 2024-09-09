import React, { createContext, useContext, useEffect, useState } from "react";

const StorageContext = createContext();

const StorageProvider = ({ children }) => {
  const defaultStorage = { accounts: [], expenses: [], budget: [] };
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem("storage")) || defaultStorage
  );

  useEffect(
    () => localStorage.setItem("storage", JSON.stringify(storage)),
    [storage]
  );

  return (
    <StorageContext.Provider value={{ storage, setStorage }}>
      {children}
    </StorageContext.Provider>
  );
};

const useStorageContext = () => useContext(StorageContext);

export default StorageProvider;
export { useStorageContext };
