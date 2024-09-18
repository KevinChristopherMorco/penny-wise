import React from "react";
import { IconMail, IconMailOpened } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import useTransactionTitle from "../../../hooks/fetch/transaction/useTransactionTitle";
import useTransaction from "../../../hooks/user-actions/transaction/useTransaction";

const TransactionCard = ({ transaction, isRead }) => {
  const title = useTransactionTitle({ transaction });
  const { setIsRead } = useTransaction();

  return (
    <Link
      to={`${transaction.transactionId}`}
      key={transaction.transactionId}
      onClick={() => setIsRead(transaction.transactionId)}
      className="w-full p-4 flex justify-between items-center shadow bg-[var(--primary-color)] rounded-lg cursor-pointer"
    >
      {!isRead ? (
        <div className="basis-[9%] flex justify-center items-center relative">
          <IconMail className="w-full h-full text-[var(--accent-color)]" />
          <span className="w-3 h-3 bg-red-500 top-0 -left-1 absolute rounded-full"></span>
        </div>
      ) : (
        <div className="basis-[9%] flex justify-center items-center">
          <IconMailOpened className="w-full h-full text-[var(--accent-color)]" />
        </div>
      )}

      <div className="basis-[85%] overflow-hidden truncate">
        <div className="flex justify-between items-center">
          <p
            className={`${
              !isRead ? "font-extrabold" : ""
            } text-[var(--accent-color)]`}
          >
            {title}
          </p>
          <p className="text-[.7rem] text-gray-400 font-bold">
            {new Date(transaction.dateCreated).toLocaleDateString("en-US")}
          </p>
        </div>

        <p className="overflow-hidden truncate text-[0.9rem]">
          {transaction.transactionMessage}
        </p>
      </div>
    </Link>
  );
};

export default TransactionCard;
