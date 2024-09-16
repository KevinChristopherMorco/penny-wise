import useFetchStorage from "../../../fetch/useFetchStorage";
import { useBudgetContext } from "../useManageBudget";
import category from "../../../../json/expenseCategory.json";

const useBudgetFilter = () => {
  const { budget: budgetView, expenses } = useFetchStorage();
  const { formattedYear } = useBudgetContext();

  const monthlyBudgetFilter = budgetView.filter(
    (budget) => budget.budgetForMonth === formattedYear
  );

  const categoriesWithBudget = category.filter((category) =>
    monthlyBudgetFilter
      .map((budget) => budget.budgetCategory)
      .includes(category.label)
  );

  const categoriesNoBudget = category.filter(
    (category) =>
      !monthlyBudgetFilter
        .map((budget) => budget.budgetCategory)
        .includes(category.label)
  );

  return { monthlyBudgetFilter, categoriesWithBudget, categoriesNoBudget };
};

export default useBudgetFilter;
