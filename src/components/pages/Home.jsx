import React from "react";
import Header from "../partials/Header";
import BudgetCard from "../home/BudgetCard";
import Plan from "../home/Plan";
import Transaction from "../home/Transaction";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 bg-[var(--primary-color)] animate-fadeIn dark:bg-[var(--dark-primary-color)]">
      <Header />
      <BudgetCard />
      <Plan />
      <Transaction />
    </div>
  );
};

export default Home;
