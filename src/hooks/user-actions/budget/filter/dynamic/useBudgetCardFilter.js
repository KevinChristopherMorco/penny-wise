import useFetchStorage from "../../../../fetch/useFetchStorage";
import useBudgetFilter from "../../../../fetch/budget/useBudgetFilter";

const useCardFilter = (
  monthYearChoiceFormat,
  currentMonthYearFormat,
  label
) => {
  const { expenses } = useFetchStorage();
  const { monthlyBudgetFilter } = useBudgetFilter();

  const budgetCategoryInfo = monthlyBudgetFilter.find(
    (budget) => budget.budgetCategory === label
  );

  const expenseAmountsByCategory = expenses
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
    .reduce((expenseAmountCategory, expense) => {
      const category = expense.expenseCategory;
      const amount = parseFloat(expense.expenseAmount);

      if (!Boolean(expenseAmountCategory[category]))
        expenseAmountCategory[category] = [];

      expenseAmountCategory[category].push(amount);

      return expenseAmountCategory;
    }, {});

  const totalExpenseAmount = Boolean(expenseAmountsByCategory[label])
    ? expenseAmountsByCategory[label].reduce(
        (total, amount) => total + amount,
        0
      )
    : 0;

  const progressPercentage =
    currentMonthYearFormat === monthYearChoiceFormat
      ? Math.round((totalExpenseAmount / budgetCategoryInfo.budgetAmount) * 100)
      : 0;

  return { progressPercentage, budgetCategoryInfo, totalExpenseAmount };
};

export default useCardFilter;
