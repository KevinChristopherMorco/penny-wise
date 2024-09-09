import {
  IconPigMoney,
  IconCash,
  IconArrowElbowRight,
} from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

const BudgetCard = () => {
  return (
    <div>
      <div className="p-4 flex flex-col items-center gap-10 bg-[var(--secondary-color)] rounded-xl dark:bg-[var(--dark-secondary-color)]">
        <div className="flex flex-col gap-4 text-white">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center font-light">My Budget</p>
            <p className="text-3xl text-center font-extrabold">₱1,500.00</p>
            <p className="text-[.7rem] text-center font-medium ">
              (September 2024)
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <Link
              to="/manage-income"
              className="p-2 flex items-center gap-2 text-sm text-[var(--text-accent)] font-medium bg-[var(--accent-color)] rounded-xl dark:bg-[var(--dark-accent-color)] dark:text-[var(--dark-text-accent)]"
            >
              <IconPigMoney />
              Add Income
            </Link>
            <Link
              to="/manage-expense"
              className="p-2 flex items-center gap-2 text-sm text-[var(--text-accent)] font-medium bg-[var(--accent-color)] rounded-xl dark:bg-[var(--dark-accent-color)] dark:text-[var(--dark-text-accent)]"
            >
              <IconCash />
              Add Expenses
            </Link>
          </div>
        </div>

        <div className="w-full self-start flex flex-col gap-2 text-white font-light">
          <div>
            <p>Budget Overview</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="p-2 flex flex-col gap-4 basis-[45%] bg-white text-black rounded-lg">
              <div className="flex justify-between items-center">
                <p>
                  <IconPigMoney className="w-5 h-5" />
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <IconArrowElbowRight className="w-5 h-5" />
                  2.33%
                </p>
              </div>
              <div>
                <p className="text-sm font-light">Income</p>
                <p className="text-base font-bold">₱3,500.00</p>
              </div>
            </div>
            <div className="p-2 flex flex-col gap-4 basis-[45%] bg-white text-black rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <p>
                  <IconCash className="w-5 h-5" />
                </p>
                <p className="flex items-center gap-2">
                  <IconArrowElbowRight className="w-5 h-5" />
                  2.33%
                </p>
              </div>
              <div>
                <p className="text-sm font-light">Expenses</p>
                <p className="text-base font-bold">₱4,500.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
