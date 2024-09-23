import React from "react";
import AnalysisHeader from "../analysis/AnalysisHeader";
import AnalysisContainer from "../analysis/AnalysisContainer";

const Analysis = () => {
  return (
    <div className="flex flex-col animate-fadeIn grow">
      <AnalysisHeader />
      <AnalysisContainer />
    </div>
  );
};

export default Analysis;
