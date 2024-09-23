const useServerDate = () => {
  const currentMonth = new Date(new Date().toUTCString()).getMonth();
  const currentYear = new Date(new Date().toUTCString()).getFullYear();

  const monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthFormat = new Date(currentYear, currentMonth).toLocaleString(
    "en",
    {
      year: "numeric",
      month: "long",
    }
  );

  return { monthsList, currentMonth, currentYear, currentMonthFormat };
};

export default useServerDate;
