import { useState } from "react";
import categories from "../../../json/expenseCategory.json";
import useServerDate from "../../fetch/useServerDate";

const useCategoryFilter = () => {
  const { currentYear } = useServerDate();

  const [count, setCount] = useState(0);
  const [category, setCategory] = useState(categories[0]);
  const [yearChoice, setYear] = useState(currentYear);

  const handleCategoryChoice = (action) => {
    if (action === "add") {
      if (count === categories.length - 1) return;
      setCount((prev) => {
        const countInc = prev + 1;
        setCategory(categories[countInc]);
        return countInc;
      });
    }
    if (action === "minus") {
      if (count === 0) return;
      setCount((prev) => {
        const countDesc = prev - 1;
        setCategory(categories[countDesc]);
        return countDesc;
      });
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
    yearChoice,
    currentYear,
    category,
    handleCategoryChoice,
    handleYearChoice,
  };
};

export default useCategoryFilter;
