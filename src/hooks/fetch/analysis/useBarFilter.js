import useFetchStorage from "../useFetchStorage";
import useCategoryFilter from "../../user-actions/analysis/useCategoryFilter";
import { useAnalysisContext } from "../../user-actions/analysis/useManageAnalysis";

const useBarFilter = (label) => {
  const { expenses, budget } = useFetchStorage();
  const { yearChoice } = useAnalysisContext();

  const months = [
    {
      month: `January ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `February ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `March ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `April ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `May ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `June ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `July ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `August ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `September ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `October ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `November ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
    {
      month: `December ${yearChoice}`,
      totalExpenses: 0,
      totalBudget: 0,
      percentage: 0,
    },
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
