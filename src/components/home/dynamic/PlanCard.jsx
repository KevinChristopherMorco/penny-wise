import React from "react";

const PlanCard = () => {
  return (
    <div className="p-4 flex flex-col gap-2 shrink-0 basis-[80%] bg-[var(--accent-color)] text-[var(--neutral-color)] rounded-xl dark:bg-[var(--dark-primary-color)]">
      <div className="flex flex-col">
        <p className="text-sm text-[var(--secondary-color)] font-bold dark:text-[var(--dark-accent-color)]">
          #Adventures
        </p>
        <p className="text-base font-bold">Trip to Jerusalem</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <p className="font-bold">₱500</p>
          <p className="font-light">₱1000</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-[var(--secondary-color)] h-2.5 rounded-full dark:dark:bg-[var(--dark-accent-color)]"
            style={{ width: "45%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
