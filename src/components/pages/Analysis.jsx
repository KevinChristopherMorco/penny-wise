import React from "react";
import AnalysisHeader from "../analysis/AnalysisHeader";
import AnalysisContainer from "../analysis/AnalysisContainer";
import AnalysisProvider from "../../hooks/user-actions/analysis/useManageAnalysis";

const Analysis = () => {
  return (
    <AnalysisProvider>
      <div className="flex flex-col animate-fadeIn grow">
        <AnalysisHeader />
        <AnalysisContainer />
      </div>
    </AnalysisProvider>
  );
};

export default Analysis;
