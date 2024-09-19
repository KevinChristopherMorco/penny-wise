import { useState } from "react";
import useTransactionFilter from "../filter/useTransactionFilter";

const usePaginate = () => {
  const [paginationState, setPaginationState] = useState({
    readItems: 3,
    readLimit: false,
    unreadItems: 3,
    unreadLimit: false,
  });

  const {
    totalTransaction: {
      true: totalReadTransactions,
      false: totalUnreadTransactions,
    },
  } = useTransactionFilter();

  const handlePaginateMore = (type) => {
    if (type === "unread") {
      setPaginationState((prev) => {
        if (totalUnreadTransactions >= prev.unreadItems + 3) {
          return { ...prev, unreadItems: prev.unreadItems + 3 };
        }

        return {
          ...prev,
          unreadItems: totalUnreadTransactions,
          unreadLimit: true,
        };
      });
    } else {
      setPaginationState((prev) => {
        if (totalReadTransactions >= prev.readItems + 3) {
          return { ...prev, readItems: prev.readItems + 3 };
        }

        return { ...prev, readItems: totalReadTransactions, readLimit: true };
      });
    }
  };

  const handlePaginateLess = (type) => {
    if (type === "unread") {
      setPaginationState((prev) => {
        return { ...prev, unreadItems: 3, unreadLimit: false };
      });
    } else {
      setPaginationState((prev) => {
        return { ...prev, readItems: 3, readLimit: false };
      });
    }
  };

  return { paginationState, handlePaginateMore, handlePaginateLess };
};

export default usePaginate;
