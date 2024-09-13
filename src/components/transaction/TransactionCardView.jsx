import React from "react";
import { useParams } from "react-router-dom";
import { IconMailOpened } from "@tabler/icons-react";
import TransactionHeader from "./TransactionHeader";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import useTransactionTitle from "../../hooks/fetch/transaction/useTransactionTitle";

const TransactionCardView = () => {
  const { transactionId } = useParams();
  const { transactions } = useFetchStorage();

  const transaction = transactions.find(
    (transaction) => transaction.transactionId === transactionId
  );

  const title = useTransactionTitle({ transaction });

  const { transactionId: id, transactionMessage, dateCreated } = transaction;

  return (
    <div className="h-full min-h-screen flex flex-col text-black transition duration-100 delay-0 bg-[var(--secondary-color)] dark:bg-[var(--dark-primary-color)] dark:text-white">
      <TransactionHeader />
      <div className="px-5 flex-1">
        <div className="w-full h-fit py-10 bg-[var(--primary-color)] translate-y-[40%] flex flex-col items-center gap-8 relative rounded-lg">
          <div className="p-3 bg-[var(--accent-color)] text-[var(--text-accent)] absolute -top-6 rounded-full ">
            <IconMailOpened className="w-8 h-8" />
          </div>
          <div className="w-full py-4 flex flex-col gap-2 items-center shadow-[0_1px_3px_-2px] shadow-[var(--accent-color)]">
            <p className="flex gap-1 text-[.75rem] text-gray-500 font-bold">
              <span>
                {new Date(dateCreated).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span>
                {new Date(dateCreated).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                  timeZoneName: "short",
                })}
              </span>
            </p>
            <p className="text-lg font-bold">{title}</p>
          </div>

          <div className="px-4 text-base text-center">{transactionMessage}</div>
          <p className="w-full text-[.65rem] text-center text-wrap text-gray-400 break-words">
            {id}
          </p>
          {console.log(transactionMessage.split(' "" '))}
        </div>
      </div>
    </div>
  );
};

export default TransactionCardView;
