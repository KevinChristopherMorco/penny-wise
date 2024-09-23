import useFetchStorage from "../../../../fetch/useFetchStorage";
import useBudgetFilter from "../../../../fetch/budget/useBudgetFilter";
import { useBudgetContext } from "../../useManageBudget";

const useCardFilter = () => {
  const { budget, expenses } = useFetchStorage();
  const { monthlyBudgetFilter } = useBudgetFilter();
  const { monthYearChoiceFormat } = useBudgetContext();

  const groupBudgetPerMonth = expenses
    .map((expense) => ({
      ...expense,
      dateCreated: new Date(expense.dateCreated).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }),
    }))
    .filter(
      (expense) =>
        expense.dateCreated === monthYearChoiceFormat &&
        monthlyBudgetFilter
          .map((budget) => budget.budgetCategory)
          .includes(expense.expenseCategory)
    )
    .concat(
      ...budget.filter(
        (budget) => budget.budgetForMonth === monthYearChoiceFormat
      )
    )
    .reduce((total, item) => {
      const categorizeItem = item.expenseCategory || item.budgetCategory;
      const expenseAmount = parseFloat(item.expenseAmount) || 0;
      const budgetAmount = parseFloat(item.budgetAmount) || 0;
      const budgetId = item.budgetId || "";

      const existingCategory = total.find(
        (cat) => cat.category === categorizeItem
      );

      if (existingCategory) {
        existingCategory.budgetId = budgetId;
        existingCategory.expenses += expenseAmount;
        existingCategory.budget += budgetAmount;
        existingCategory.percentage = Math.round(
          (existingCategory.expenses / existingCategory.budget) * 100
        );
      } else {
        total.push({
          budgetId,
          category: categorizeItem,
          expenses: expenseAmount,
          budget: budgetAmount,
          percentage: 0,
        });
      }

      return total;
    }, []);

  return {
    groupBudgetPerMonth,
  };
};

export default useCardFilter;
