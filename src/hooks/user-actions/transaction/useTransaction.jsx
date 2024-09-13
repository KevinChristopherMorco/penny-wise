import { useStorageContext } from "../../storage/useStorage";
import { v4 as uuidv4 } from "uuid";

const useTransaction = () => {
  const { setStorage } = useStorageContext();

  const useAccountTransaction = (transaction) => {
    const {
      accountId,
      accountName,
      accountBalance,
      accountDeposit,
      accountAction,
    } = transaction;
    const dateNow = new Date().toUTCString();
    const depositFormat = parseFloat(accountDeposit).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const amountFormat = parseFloat(accountBalance).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    let transactionMessage = "";

    switch (accountAction) {
      case "deposit":
        transactionMessage = `Account "${accountName}" has been created successfully. Your current balance is "${amountFormat}".`;
        break;
      case "edit":
        transactionMessage = `Account "${accountName}" has been updated. A deposit of "${depositFormat}" has been made. Your new balance is "${amountFormat}".`;
        break;
      case "delete":
        transactionMessage = `Account "${accountName}" has been deleted. It had a balance of "${amountFormat}". All associated expenses have been removed.`;
        break;
      default:
        break;
    }

    const accountTransaction = {
      transactionId: `transac${uuidv4().split("-").join("")}${Date.now()}`,
      transactionAccountId: accountId,
      transactionAccountName: accountName,
      transactionType: accountAction,
      transactionAmount: accountBalance,
      transactionMessage: transactionMessage,
      dateCreated: dateNow,
    };

    setStorage((prev) => {
      return {
        ...prev,
        transactions: [...prev.transactions, accountTransaction],
      };
    });
  };

  const useExpenseTransaction = () => {};

  return { useAccountTransaction };
};

export default useTransaction;
