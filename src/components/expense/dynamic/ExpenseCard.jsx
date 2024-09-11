import React, { useState } from "react";
import {
  IconCurrencyPeso,
  IconDots,
  IconTrash,
  IconEdit,
  IconEye,
} from "@tabler/icons-react";

import category from "../../../json/expenseCategory.json";

const getCategoryColor = (expense) => {
  return category.find((category) => category.label === expense).colorCode;
};

const ExpenseCard = ({ expense }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="h-[4.5rem] px-4 py-10 flex justify-between items-center shadow-md bg-[var(--neutral-color)] rounded-lg dark:bg-[var(--dark-neutral-color)] relative">
      <div
        className="p-1 w-12 h-12 flex justify-center items-center shadow-xl rounded-xl"
        style={{
          backgroundColor: getCategoryColor(expense.expenseCategory),
        }}
      >
        <img
          src={`/src/assets/flaticons/${expense.expenseCategory}.png`}
          alt=""
          className="w-9 h-9 rounded-xl"
        />
      </div>
      <div className="basis-[60%] flex flex-col gap-1 text-sm">
        <p className="text-base font-bold">{expense.expenseName}</p>
        <div className="flex items-center gap-1">
          <p>Amount :</p>
          <p className="flex items-center text-red-600 font-bold dark:text-green-400">
            <IconCurrencyPeso className="w-5 h-5" />
            {parseFloat(expense.expenseAmount).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div
        className="basis-[10%] cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <IconDots />
      </div>
      {toggle && (
        <div className="w-fit px-4 py-2 absolute right-0 -bottom-20 bg-[var(--primary-color)] shadow-lg z-[99] animate-fadeIn rounded-lg dark:bg-[var(--dark-primary-color)]">
          <ul className="flex flex-col gap-2 font-medium">
            <li className="flex gap-1 text-blue-500 font-bold">
              <Link className="flex gap-1">
                <IconEye className="w-5 h-5" />
                View
              </Link>
            </li>
            <li className="flex gap-1 text-orange-400 font-bold">
              <IconEdit className="w-5 h-5" />
              Edit
            </li>
            <li className="flex gap-1 text-red-500 font-bold">
              <IconTrash className="w-5 h-5" />
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
