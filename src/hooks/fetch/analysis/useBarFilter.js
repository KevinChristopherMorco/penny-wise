import useFetchStorage from "../useFetchStorage";

const useBarFilter = (month, label) => {
  const { expenses, budget } = useFetchStorage();

  const totalExpensesByMonth = expenses
    .filter((expense) => expense.expenseCategory === label)
    .map((expense) => {
      return {
        ...expense,
        dateCreated: new Date(expense.dateCreated).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      };
    })
    .reduce((total, item) => {
      const date = item.dateCreated;
      const amount = parseFloat(item.expenseAmount);

      if (!Boolean(total[date])) total[date] = 0;

      total[date] += amount;

      return total;
    }, {});

  const monthlyBudgetData = budget
    .filter((budget) => budget.budgetCategory === label)
    .map((budget) => {
      return {
        ...budget,
        expenseTotal: totalExpensesByMonth[budget.budgetForMonth].toString(),
      };
    })
    .find((x) => x.budgetForMonth === `${month} 2024`);

  const {
    budgetAmount = 0,
    expenseTotal = 0,
    budgetForMonth,
  } = monthlyBudgetData || {};

  const budgetPercentage =
    budgetAmount > 0 ? Math.round((expenseTotal / budgetAmount) * 100) : 0;

  return {
    totalExpensesByMonth,
    budgetPercentage,
    budgetForMonth,
  };
};

export default useBarFilter;
