import { useEffect, useState } from "react";
import categories from "../../../json/expenseCategory.json";
import useFetchStorage from "../../fetch/useFetchStorage";

const useCategoryFilter = () => {
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState(categories[count]);

  const setCountCategory = (action) => {
    if (action === "add") {
      if (count === categories.length - 1) return;
      setCount((prev) => prev + 1);
    }
    if (action === "minus") {
      if (count === 0) return;
      setCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (count >= 0 && count < categories.length) {
      setCategory(categories[count]);
    }
  }, [count]);

  return { category, setCountCategory };
};

export default useCategoryFilter;
