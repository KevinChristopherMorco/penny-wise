import React from "react";
import { IconPigMoney } from "@tabler/icons-react";

const TransactionCard = () => {
  return (
    <div className="px-4 py-6 shrink-0 basis-[45%] flex justify-between bg-[var(--primary-color)] text-[var(--text-color)] rounded-xl dark:bg-[var(--dark-neutral-color)] dark:text-[var(--dark-text-color)]">
      <div className="w-full flex flex-col gap-2 justify-around">
        <div className="w-full flex justify-between items-center">
          <p>
            <IconPigMoney className="w-8 h-8" />
          </p>
          <p className="font-bold text-[var(--accent-color)]">$29.00</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="text-sm text-bold">Deposit</p>
            <p className="font-bold">Trip to Jerusalem</p>
          </div>
          <p className="text-sm">Dec 2 ,2023</p>
          {/* <p>$29.00</p>
          <p className="text-sm">Dec 2 ,2023</p> */}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
