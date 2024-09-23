import useFetchStorage from "../useFetchStorage";

const useBarFilter = (label) => {
  const { expenses, budget } = useFetchStorage();

  const months = [
    { month: "January 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "February 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "March 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "April 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "May 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "June 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "July 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "August 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    {
      month: "September 2024",
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    { month: "October 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "November 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
    { month: "December 2024", totalExpenses: 0, totalBudget: 0, percentage: 0 },
  ];

  const barData = expenses
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
    .concat(budget.filter((budget) => budget.budgetCategory === label))
    .reduce((total, item) => {
      const monthData = total.find(
        (total) =>
          total.month === item.dateCreated ||
          total.month === item.budgetForMonth
      );

      if (item.expenseAmount) {
        const amount = parseFloat(item.expenseAmount);
        if (monthData) monthData.totalExpenses += amount;
      }

      if (item.budgetAmount) {
        const amount = parseFloat(item.budgetAmount);
        if (monthData) monthData.totalBudget += amount;
      }

      if (monthData) {
        monthData.percentage = monthData.totalBudget
          ? Math.round((monthData.totalExpenses / monthData.totalBudget) * 100)
          : 0;
      }

      return total;
    }, months);

  return {
    barData,
  };
};

export default useBarFilter;
