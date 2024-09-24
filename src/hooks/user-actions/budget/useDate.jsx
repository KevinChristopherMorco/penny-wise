import React, { useState } from "react";
import useServerDate from "../../fetch/useServerDate";

const useDate = () => {
  const { monthsList, currentMonth, currentYear, currentMonthYearFormat } =
    useServerDate();

  const [month, setMonth] = useState(currentMonth);
  const [yearChoice, setYear] = useState(currentYear);

  const monthChoice = monthsList[month];

  const monthYearChoiceFormat = new Date(yearChoice, month).toLocaleString(
    "en",
    {
      year: "numeric",
      month: "long",
    }
  );

  const handleDateChoice = (event) => {
    const { id } = event.target;

    if (id === "monthAsc") {
      if (month === monthsList.length - 1) return;
      setMonth((prev) => prev + 1);
      return;
    }

    if (id === "monthDesc") {
      if (month === 0) return;

      setMonth((prev) => prev - 1);
      return;
    }
  };

  const handleYearChoice = (event) => {
    const { id } = event.target;
    if (id === "yearAsc") {
      if (yearChoice === currentYear) return;

      setYear((prev) => prev + 1);
      return;
    }

    if (id === "yearDesc") {
      if (yearChoice > currentYear - 1) setYear((prev) => prev - 1);
      return;
    }
  };

  return {
    monthChoice,
    yearChoice,
    currentMonthYearFormat,
    monthYearChoiceFormat,
    handleDateChoice,
    handleYearChoice,
  };
};

export default useDate;
