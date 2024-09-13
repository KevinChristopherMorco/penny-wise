import React from "react";
import Header from "../partials/Header";
import BudgetCard from "../home/BudgetCard";
import Plan from "../home/Plan";
import Transaction from "../home/Transaction";

const Home = () => {
  return (
    <div className="flex flex-col gap-6 bg-[var(--secondary-color)] animate-fadeIn">
      <Header />
      <BudgetCard />
      <Plan />
      <Transaction />
    </div>
  );
};

export default Home;
