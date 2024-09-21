import useFetchStorage from "../../fetch/useFetchStorage";

const useMonthlyBudget = () => {
  const serverDate = new Date().toUTCString();
  const currentMonth = new Date(serverDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const { budget } = useFetchStorage();

  const totalMonthlyBudget = budget
    .filter(
      (budget) =>
        new Date(budget.budgetForMonth).getTime() ===
        new Date(currentMonth).getTime()
    )
    .map((budget) => parseFloat(budget.budgetAmount))
    .reduce((total, current) => total + current, 0);

  return { currentMonth, totalMonthlyBudget };
};

export default useMonthlyBudget;
