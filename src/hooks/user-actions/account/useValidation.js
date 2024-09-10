import { useEffect, useState } from "react";

const useValidation = () => {
  const defaultError = { accountName: false, accountBalance: false };
  const [error, setError] = useState(defaultError);

  const checkErrors = (inputs) => {
    const { accountName, accountBalance } = inputs;

    const error = {
      errorAccountName: !Boolean(accountName),
      errorAccountBalance:
        !Boolean(parseFloat(accountBalance)) || parseFloat(accountBalance) < 1,
    };

    setError(error);
    return error.errorAccountName || error.errorAccountBalance;
  };

  return { defaultError, error, setError, checkErrors };
};

export default useValidation;
