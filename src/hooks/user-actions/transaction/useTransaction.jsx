import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";

const amountFormat = (amount) =>
  parseFloat(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const createTransaction = (type, transaction, action) => {
  const {
    accountId,
    accountName,
    accountBalance,
    accountDeposit,
    expenseId,
    expenseName,
    expenseAmount,
    expenseCategory,
  } = transaction;

  const transactionId = `transac${uuidv4().split("-").join("")}${Date.now()}`;
  const dateNow = new Date().toUTCString();
  let transactionMessage = "";

  if (type === "account") {
    const transactionType = "account";
    switch (action) {
      case "deposit":
        transactionMessage = `Account "${accountName}" has been created successfully. Your current balance is "${amountFormat(
          accountBalance
        )}".`;
        break;
      case "edit":
        transactionMessage = `Account "${accountName}" has been updated. A deposit of "${amountFormat(
          accountDeposit
        )}" has been made. Your new balance is "${amountFormat(
          accountBalance
        )}".`;
        break;
      case "delete":
        transactionMessage = `Account "${accountName}" has been deleted. It had a balance of "${amountFormat(
          accountBalance
        )}". All associated expenses have been removed.`;
        break;
      default:
        break;
    }
    return {
      transactionId,
      transactionAccountId: accountId,
      transactionAccountName: accountName,
      transactionAction: action,
      transactionType: transactionType,
      transactionAmount: accountBalance,
      transactionMessage,
      dateCreated: dateNow,
      isRead: false,
    };
  } else if (type === "expense") {
    const transactionType = "expense";
    switch (action) {
      case "addExpense":
        transactionMessage = `An expense named "${expenseName}" at ${expenseCategory} has been added to account "${amountFormat(
          accountBalance
        )}".`;
        break;
      case "editExpense":
        transactionMessage = `Expense "${expenseName}" associated with account "${accountName}" has been updated. The new expense amount is "${amountFormat(
          expenseAmount
        )}". Your updated balance is "${amountFormat(accountBalance)}".`;
        break;
      case "deleteExpense":
        transactionMessage = `Expense "${expenseName}" associated with account "${accountName}" has been deleted. It was "${amountFormat(
          expenseAmount
        )}". Your updated balance is "${amountFormat(accountBalance)}".`;
        break;
      default:
        break;
    }
    return {
      transactionId,
      transactionExpenseId: expenseId,
      transactionExpenseName: expenseName,
      transactionAction: action,
      transactionType: transactionType,
      transactionAmount: expenseAmount,
      transactionMessage,
      dateCreated: dateNow,
      isRead: false,
    };
  }
  return {};
};

const useTransaction = () => {
  const { setStorage } = useStorageContext();
  const processTransaction = (type, transaction) => {
    const transactionData = createTransaction(
      type,
      transaction,
      transaction.accountAction || transaction.expenseAction
    );

    setStorage((prev) => {
      return {
        ...prev,
        transactions: [...prev.transactions, transactionData],
      };
    });
  };

  const useAccountTransaction = (transaction) =>
    processTransaction("account", transaction);
  const useExpenseTransaction = (transaction) =>
    processTransaction("expense", transaction);

  const setIsRead = (id) => {
    setStorage((prev) => ({
      ...prev,
      transactions: prev.transactions.map((transaction) =>
        transaction.transactionId === id
          ? { ...transaction, isRead: true }
          : transaction
      ),
    }));
  };

  return { useAccountTransaction, useExpenseTransaction, setIsRead };
};

export default useTransaction;
