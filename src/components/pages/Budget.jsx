import React from "react";
import BudgetHeader from "../budget/BudgetHeader";
import BudgetContainer from "../budget/BudgetContainer";
import BudgetProvider from "../../hooks/user-actions/budget/useManageBudget";
import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";
import BudgetForm from "../modal/budget/BudgetForm";

const Budget = () => {
  const {
    currentActive: {
      modal: { modalName },
    },
  } = useNavigateContext();
  return (
    <BudgetProvider>
      <div className="flex flex-col gap-5 animate-fadeIn">
        <BudgetHeader />
        <BudgetContainer />
        {modalName === "addBudget" && <BudgetForm />}
      </div>
    </BudgetProvider>
  );
};

export default Budget;
