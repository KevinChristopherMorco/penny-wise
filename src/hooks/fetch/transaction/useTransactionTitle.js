const useTransactionTitle = ({ transaction }) => {
  let title = "";
  switch (transaction.transactionType) {
    case "deposit":
      title = "New Account Created!";
      break;
    case "edit":
      title = "Account Updated!";
      break;
    case "delete":
      title = "Account Deleted!";
      break;
    default:
      break;
  }

  return title;
};

export default useTransactionTitle;
