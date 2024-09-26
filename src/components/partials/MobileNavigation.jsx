import React from "react";
import {
  IconHome,
  IconCoins,
  IconContract,
  IconAdjustmentsHorizontal,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";
import useTransactionFilter from "../../hooks/user-actions/transaction/filter/useTransactionFilter";

const MobileNavigation = () => {
  const { pathname } = useLocation();

  const { transactionNumberData } = useTransactionFilter();
  const { totalIsUnread } = transactionNumberData;

  return (
    <div className="w-full border-t border-gray-300 h-[3rem] px-4 py-10 fixed bottom-0 flex items-center bg-[#fff] dark:bg-[var(--dark-primary-color)] dark:border-[var(--dark-accent-color)] z-[99]">
      <ul className="w-full flex justify-between items-center">
        <Link
          to="/"
          className={`${
            pathname === "/"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
        >
          <IconHome className="w-6 h-6" />
          <p className="text-[.7rem]">Home</p>
        </Link>
        <Link
          to="/manage-budget-plan"
          className={`${
            pathname === "/manage-budget-plan"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
        >
          <IconCoins className="w-6 h-6" />
          <p className="text-[.7rem]">Budget</p>
        </Link>

        <Link
          to="/analysis"
          className={`${
            pathname === "/analysis"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
        >
          <IconReportAnalytics className="w-6 h-6" />
          <p className="text-[.7rem]">Analysis</p>
        </Link>

        <Link
          to="/transactions"
          className={`${
            pathname === "/transactions"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="relative">
              {Boolean(totalIsUnread) && (
                <span className="w-[.9rem] h-[.9rem] absolute -right-1 bg-red-500 flex justify-center items-center rounded-full">
                  <p className="z-50 text-white text-[.5rem]">
                    {totalIsUnread}
                  </p>
                </span>
              )}

              <IconContract className="w-6 h-6" />
            </div>
            <p className="text-[.7rem]">Transactions</p>
          </div>
        </Link>

        <Link
          to="/settings"
          className={`${
            pathname === "/settings"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
        >
          <IconAdjustmentsHorizontal className="w-6 h-6" />
          <p className="text-[.7rem]">Settings</p>
        </Link>
      </ul>
    </div>
  );
};

export default MobileNavigation;
