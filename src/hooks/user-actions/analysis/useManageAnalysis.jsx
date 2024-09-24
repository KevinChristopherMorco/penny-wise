import React, { createContext, useContext } from "react";
import useCategoryFilter from "./useCategoryFilter";

const AnalysisContext = createContext();

const AnalysisProvider = ({ children }) => {
  const {
    yearChoice,
    currentYear,
    category,
    handleCategoryChoice,
    handleYearChoice,
  } = useCategoryFilter();
  return (
    <AnalysisContext.Provider
      value={{
        yearChoice,
        currentYear,
        category,
        handleCategoryChoice,
        handleYearChoice,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

const useAnalysisContext = () => useContext(AnalysisContext);

export default AnalysisProvider;
export { useAnalysisContext };
