import React from "react";
import { IconPigMoney } from "@tabler/icons-react";

const TransactionCard = () => {
  return (
    <div className="px-4 shrink-0 basis-[45%] flex justify-between bg-[var(--neutral-color)] border-b-[3px] border-b-[var(--accent-color)] rounded-xl dark:bg-[var(--dark-neutral-color)] dark:border-b-[var(--dark-accent-color)]">
      <div className="w-full flex flex-col justify-around">
        <div className="w-full flex justify-between">
          <p>
            <IconPigMoney className="w-8 h-8" />
          </p>
          <p className="font-bold">$29.00</p>

          {/* <div>
            <p className="text-sm text-bold">Deposit</p>
            <p className="font-bold">Trip to Jerusalem</p>
          </div> */}
        </div>
        <div className="w-full flex justify-between">
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
