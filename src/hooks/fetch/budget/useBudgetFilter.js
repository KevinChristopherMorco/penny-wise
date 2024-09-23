import useFetchStorage from "../useFetchStorage";
import { useBudgetContext } from "../../user-actions/budget/useManageBudget";
import category from "../../../json/expenseCategory.json";

const useBudgetFilter = () => {
  const { budget: budgetView, expenses } = useFetchStorage();
  const { monthYearChoiceFormat } = useBudgetContext();

  const monthlyBudgetFilter = budgetView.filter(
    (budget) => budget.budgetForMonth === monthYearChoiceFormat
  );

  const initializeCategory = category.reduce((category, item) => {
    const categoryName = item.label;

    const existingCategory = category.find(
      (cat) => cat.category === categoryName
    );

    if (!existingCategory) {
      category.push({
        budgetId: "",
        category: categoryName,
        expenses: 0,
        budget: 0,
        percentage: 0,
      });
    }

    return category;
  }, []);

  const budgetCategory = expenses
    .map((expense) => ({
      ...expense,
      dateCreated: new Date(expense.dateCreated).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }),
    }))
    .filter((expense) => expense.dateCreated === monthYearChoiceFormat)
    .concat(
      ...budgetView.filter(
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

        existingCategory.percentage =
          existingCategory.budget === Infinity
            ? 0
            : Math.round(
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
    }, initializeCategory);

  return {
    monthlyBudgetFilter,
    budgetCategory,
  };
};

export default useBudgetFilter;
