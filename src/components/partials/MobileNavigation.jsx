import React from "react";
import useActiveNavigation, {
  useNavigateContext,
} from "../../hooks/general/navigation/useActiveNavigation";
import {
  IconWallet,
  IconBusinessplan,
  IconChartBar,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const MobileNavigation = () => {
  const { currentActive, setCurrentActive } = useNavigateContext();
  const { nav } = currentActive;
  return (
    <div className="w-full h-[3rem] mt-[2rem] px-4 fixed bottom-0 flex items-center bg-[#fff] dark:bg-[var(--dark-primary-color)]">
      <ul className="w-full flex justify-between items-center">
        <Link
          to="/"
          className={`${
            nav === "overview"
              ? "text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : ""
          } flex items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "overview")}
        >
          <IconWallet />
          <p>{`${nav === "overview" ? "Overview" : ""}`}</p>
        </Link>
        <Link
          to="/manage-budget-plan"
          className={`${
            nav === "budgetPlan"
              ? "basis-[40%] text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : ""
          } flex items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "budgetPlan")}
        >
          <IconBusinessplan />
          <p>{`${nav === "budgetPlan" ? "Budget Plan" : ""}`}</p>
        </Link>
        <li
          className={`${
            nav === "budgetChart"
              ? "basis-[40%] text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : ""
          } flex items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "budgetChart")}
        >
          <IconChartBar />
          <p>{`${nav === "budgetChart" ? "Budget Chart" : ""}`}</p>
        </li>
        <li
          className={`${
            nav === "settings"
              ? "basis-[30%] text-[var(--accent-color)] font-extrabold dark:text-[var(--dark-accent-color)] animate-navFadeIn"
              : ""
          } flex items-center gap-2 text-sm`}
          onClick={() => setCurrentActive("nav", "settings")}
        >
          <IconAdjustmentsHorizontal />
          <p>{`${nav === "settings" ? "Settings" : ""}`}</p>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavigation;
