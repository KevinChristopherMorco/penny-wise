import React, { useState } from "react";
import useServerDate from "../../fetch/useServerDate";

const useDate = () => {
  const { currentMonth, currentYear, currentDate } = useServerDate();
  const [count, setCount] = useState(currentMonth);

  const months = [
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

  const formattedYear = new Date(currentYear, count).toLocaleString("en", {
    year: "numeric",
    month: "long",
  });

  const handleDateChoice = (event) => {
    const { id } = event.target;

    if (id === "monthAsc") {
      if (count === months.length - 1) return;
      setCount((prev) => prev + 1);
      return;
    }

    if (id === "monthDesc") {
      if (count === currentMonth) return;
      if (count === 0) return;

      setCount((prev) => prev - 1);
      return;
    }
  };

  return { handleDateChoice, currentDate, formattedYear };
};

export default useDate;
