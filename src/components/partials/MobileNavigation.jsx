import React from "react";
import useActiveNavigation, {
  useNavigateContext,
} from "../../hooks/general/navigation/useActiveNavigation";
import {
  IconHome,
  IconCoins,
  IconContract,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const MobileNavigation = () => {
  const { currentActive, setCurrentActive } = useNavigateContext();
  const { nav } = currentActive;
  return (
    <div className="w-full border-t border-gray-300 h-[3rem] px-4 py-10 fixed bottom-0 flex items-center bg-[#fff] dark:bg-[var(--dark-primary-color)]">
      <ul className="w-full flex justify-between items-center">
        <Link
          to="/"
          className={`${
            nav === "home"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "home")}
        >
          <IconHome className="w-6 h-6" />
          <p className="text-[.9]">Home</p>
        </Link>
        <Link
          to="/manage-budget-plan"
          className={`${
            nav === "budget"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "budget")}
        >
          <IconCoins className="w-6 h-6" />
          <p className="text-[.9]">Budget</p>
        </Link>
        <Link
          to="/transactions"
          className={`${
            nav === "transactions"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "transactions")}
        >
          <IconContract className="w-6 h-6" />
          <p className="text-[.9]">Transactions</p>
        </Link>
        <Link
          to="/settings"
          className={`${
            nav === "settings"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : "text-gray-400 font-bold"
          } flex flex-col items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "settings")}
        >
          <IconAdjustmentsHorizontal className="w-6 h-6" />
          <p className="text-[.9]">Settings</p>
        </Link>
      </ul>
    </div>
  );
};

export default MobileNavigation;
