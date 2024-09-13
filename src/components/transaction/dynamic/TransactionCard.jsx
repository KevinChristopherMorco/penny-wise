import React from "react";
import { IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import useTransactionTitle from "../../../hooks/fetch/transaction/useTransactionTitle";

const TransactionCard = ({ transaction }) => {
  const title = useTransactionTitle({ transaction });

  return (
    <Link
      to={`${transaction.transactionId}`}
      key={transaction.transactionId}
      className="w-full p-4 flex justify-between items-center shadow bg-[var(--primary-color)] rounded-lg cursor-pointer"
    >
      <div className="basis-[9%] flex justify-center items-center relative">
        <IconMail className="w-full h-full text-[var(--accent-color)]" />
        <span className="w-3 h-3 bg-red-500 top-0 -left-1 absolute rounded-full"></span>
      </div>
      <div className="basis-[85%] overflow-hidden truncate">
        <p className="text-[var(--accent-color)] font-extrabold">{title}</p>
        <p className="overflow-hidden truncate text-[0.9rem]">
          {transaction.transactionMessage}
        </p>
      </div>
    </Link>
  );
};

export default TransactionCard;
