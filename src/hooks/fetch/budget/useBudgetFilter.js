import useFetchStorage from "../useFetchStorage";
import { useBudgetContext } from "../../user-actions/budget/useManageBudget";
import category from "../../../json/expenseCategory.json";

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

  const categoriesNoBudgetWithExpense = expenses.filter(
    (expense) =>
      new Date(expense.dateCreated).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }) === formattedYear &&
      !budgetView
        .filter((budget) => budget.budgetForMonth === formattedYear)
        .map((budget) => budget.budgetCategory)
        .includes(expense.expenseCategory)
  );

  const totalExpenseWithNoBudget = categoriesNoBudgetWithExpense.reduce(
    (total, category) => {
      const groupCategoryAmount = parseFloat(category.expenseAmount);
      const groupCategory = category.expenseCategory;

      if (!Boolean(total[groupCategory])) total[groupCategory] = 0;

      total[groupCategory] += groupCategoryAmount;

      return total;
    },
    {}
  );

  return {
    monthlyBudgetFilter,
    categoriesWithBudget,
    categoriesNoBudget,
    categoriesNoBudgetWithExpense,
    totalExpenseWithNoBudget,
  };
};

export default useBudgetFilter;
