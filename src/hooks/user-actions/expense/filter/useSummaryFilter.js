import useFetchStorage from "../../../fetch/useFetchStorage";

const useSummaryFilter = (accountId) => {
  const { expenses } = useFetchStorage();

  const groupExpenseByDate = expenses
    .filter((expense) => expense.expenseAccount === accountId)
    .reduce((expenses, item) => {
      const itemDate = new Date(item.dateCreated);
      const formattedDate = itemDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const existingExpense = expenses.find(
        (expense) => expense.date === formattedDate
      );

      if (existingExpense) {
        existingExpense.expenses.push(item);
      } else {
        expenses.push({
          date: formattedDate,
          expenses: [item],
        });
      }

      return expenses;
    }, []);

  return { groupExpenseByDate };
};

export default useSummaryFilter;
