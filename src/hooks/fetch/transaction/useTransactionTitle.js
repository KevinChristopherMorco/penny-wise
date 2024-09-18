const useTransactionTitle = ({ transaction }) => {
  let title = "";
  switch (transaction.transactionAction) {
    case "deposit":
      title = "New Account Created!";
      break;
    case "edit":
      title = "Account Updated!";
      break;
    case "delete":
      title = "Account Deleted!";
      break;
    case "addExpense":
      title = "New Expense!";
      break;
    case "editExpense":
      title = "Updated Expense!";
      break;
    case "deleteExpense":
      title = "Deleted Expense!";
      break;
    default:
      break;
  }

  return title;
};

export default useTransactionTitle;
