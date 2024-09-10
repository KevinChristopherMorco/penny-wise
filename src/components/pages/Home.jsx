import React from "react";
import Header from "../partials/Header";
import BudgetCard from "../home/BudgetCard";
import Plan from "../home/Plan";
import Transaction from "../home/Transaction";

const Home = () => {
  return (
    <div className="p-4 flex flex-col gap-8 animate-fadeIn">
      <Header />
      <BudgetCard />
      <Plan />
      <Transaction />
    </div>
  );
};

export default Home;
