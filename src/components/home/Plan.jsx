import React from "react";
import PlanCard from "./dynamic/PlanCard";

const Plan = () => {
  return (
    <div className="p-4 flex flex-col gap-2 bg-[var(--primary-color)]">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">My Plan</p>
        <p className="text-[0.8rem] text-[var(--accent-color)] font-bold cursor-pointer dark:text-[var(--dark-accent-color)]">
          View all plans
        </p>
      </div>
      <div className="flex gap-10 overflow-x-scroll">
        <PlanCard />
        <PlanCard />
        <PlanCard />
      </div>
    </div>
  );
};

export default Plan;
