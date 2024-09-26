import React from "react";
import {
  IconBasket,
  IconBasketOff,
  IconCurrencyPeso,
  IconMessageExclamation,
  IconMinus,
  IconPigMoney,
  IconPigOff,
  IconPlus,
} from "@tabler/icons-react";

const useFormat = (transaction) => {
  const {
    transactionDeposit,
    transactionAction,
    transactionType,
    transactionAmount,
  } = transaction;

  const formatAmount = (amount) => {
    if (!Boolean(amount)) return;
    return parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const checkTransactionAmount = () => {
    if (transactionType === "account") {
      return (
        <p className="flex items-center text-[var(--accent-color)]">
          <IconPlus className="w-3 h-3 font-bold" />
          <IconCurrencyPeso className="w-5 h-5" />
          {formatAmount(transactionDeposit) || formatAmount(transactionAmount)}
        </p>
      );
    }

    if (transactionType === "expense") {
      return (
        <p className="flex items-center text-[#FF0000]">
          <IconMinus className="w-3 h-3 font-bold" />
          <IconCurrencyPeso className="w-5 h-5" />
          {formatAmount(transactionAmount)}
        </p>
      );
    }
  };

  const checkTransactionAction = () => {
    if (transactionType === "account") {
      if (transactionAction === "deposit") {
        return (
          <p className="flex items-center text-[var(--accent-color)]">
            Opened an Account
          </p>
        );
      }

      if (transactionAction === "edit") {
        if (parseFloat(transactionDeposit) > 0) {
          return (
            <p className="flex items-center text-[var(--accent-color)]">
              New Deposit
            </p>
          );
        }
        return <p className="flex items-center">Modified an Account</p>;
      }

      if (transactionAction === "delete") {
        return (
          <p className="flex items-center text-[#FF0000]">Closed an Account</p>
        );
      }
    }

    if (transactionType === "expense") {
      if (transactionAction === "addExpense") {
        return <p className="flex items-center text-[#FF0000]">New Expense</p>;
      }

      if (transactionAction === "editExpense") {
        return <p className="flex items-center">Modified an Expense</p>;
      }

      if (transactionAction === "deleteExpense") {
        return (
          <p className="flex items-center text-[#FF0000]">Remove an Expense</p>
        );
      }
    }
  };

  const checkTransactionIcon = () => {
    if (transactionType === "account") {
      if (transactionAction === "deposit") {
        return <IconPigMoney className="w-8 h-8" />;
      }

      if (transactionAction === "edit") {
        if (parseFloat(transactionDeposit) > 0) {
          return <IconPigMoney className="w-8 h-8" />;
        }
        return <IconMessageExclamation className="w-8 h-8" />;
      }

      if (transactionAction === "delete") {
        return <IconPigOff className="w-8 h-8" />;
      }
    }

    if (transactionType === "expense") {
      if (transactionAction === "addExpense") {
        return <IconBasket className="w-8 h-8" />;
      }

      if (transactionAction === "editExpense") {
        return <IconMessageExclamation className="w-8 h-8" />;
      }

      if (transactionAction === "deleteExpense") {
        return <IconBasketOff className="w-8 h-8" />;
      }
    }
  };

  const formatName = (name) => {
    if (!Boolean(name)) return;
    return name
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
  };

  return {
    formatAmount,
    formatDate,
    formatName,
    checkTransactionAmount,
    checkTransactionAction,
    checkTransactionIcon,
  };
};

export default useFormat;
