import React from "react";
import PlanCard from "./dynamic/PlanCard";

const Plan = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
        <p className="text-lg font-bold px-4">You'll Love This</p>
      </div>
      <div className="planCarousel flex items-center overflow-x-scroll text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
        <div className="flex flex-col gap-2 px-4">
          <div className="w-[20rem]">
            <img
              src="/src/assets/images/sample-images/image1.jpg"
              alt=""
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-extrabold">
              Take Control of Your Finances
            </p>
            <p className="text-[.9rem]">
              Track your spending, set budgets, and watch your savings grow.
              Your financial freedom starts here!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <div className="w-[20rem]">
            <img
              src="/src/assets/images/sample-images/image2.jpg"
              alt=""
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Budgeting Made Simple</p>
            <p className="text-[.9rem]">
              Easily manage your expenses and goals with intuitive tools.
              Achieve your financial dreams one step at a time!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <div className="w-[20rem]">
            <img
              src="/src/assets/images/sample-images/image3.png"
              alt=""
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Master Your Money</p>
            <p className="text-[.9rem]">
              Gain insights into your spending habits and plan for the future.
              Stay organized and make every cent count!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
