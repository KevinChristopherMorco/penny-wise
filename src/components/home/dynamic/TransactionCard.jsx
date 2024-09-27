import React from "react";

import useFormat from "../../../hooks/fetch/home/useFormat";

const TransactionCard = ({ transaction }) => {
  const { transactionName, dateCreated } = transaction;
  const {
    formatDate,
    formatName,
    checkTransactionAmount,
    checkTransactionAction,
    checkTransactionIcon,
  } = useFormat(transaction);

  return (
    <div className="px-4 py-6 shrink-0 basis-[45%] flex justify-between bg-[var(--primary-color)] text-[var(--text-color)] rounded-xl dark:bg-[var(--dark-neutral-color)] dark:text-[var(--dark-text-color)]">
      <div className="w-full flex flex-col gap-4 justify-around">
        <div className="w-full flex justify-between items-center">
          <p>{checkTransactionIcon()}</p>
          <div className="font-bold xl:text-lg">{checkTransactionAmount()}</div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold xl:text-base">
              {checkTransactionAction()}
            </div>
            <div className="text-[.8rem] font-bold xl:text-sm">
              {formatName(transactionName)}
            </div>
          </div>
          <p className="text-[.8rem] xl:text-[.9rem]">
            {formatDate(dateCreated)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
