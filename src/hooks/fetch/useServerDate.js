const useServerDate = () => {
  const currentMonth = new Date(new Date().toUTCString()).getMonth();
  const currentYear = new Date(new Date().toUTCString()).getFullYear();

  const currentDate = new Date(currentYear, currentMonth).toLocaleString("en", {
    year: "numeric",
    month: "long",
  });

  return { currentMonth, currentYear, currentDate };
};

export default useServerDate;
