import { useState } from "react";

const useValidation = () => {
  const defaultError = { accountName: false, accountDeposit: false };
  const [error, setError] = useState(defaultError);

  const checkErrors = (inputs) => {
    const { accountName, accountDeposit } = inputs;

    const error = {
      errorAccountName: !Boolean(accountName),
      erroraccountDeposit:
        !Boolean(parseFloat(accountDeposit)) || parseFloat(accountDeposit) < 1,
    };

    setError(error);
    return error.errorAccountName || error.erroraccountDeposit;
  };

  return { defaultError, error, setError, checkErrors };
};

export default useValidation;
