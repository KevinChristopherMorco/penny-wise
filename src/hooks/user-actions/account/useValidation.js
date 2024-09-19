import { useState } from "react";

const useValidation = () => {
  const defaultError = { accountName: false, accountDeposit: false };
  const [error, setError] = useState(defaultError);

  const checkErrors = (inputs, action) => {
    const { accountName, accountDeposit } = inputs;

    if (action === "add") {
      const error = {
        errorAccountName: !Boolean(accountName),
        errorAccountDeposit:
          !Boolean(parseFloat(accountDeposit)) ||
          parseFloat(accountDeposit) < 1,
      };

      setError(error);
      return error.errorAccountName || error.errorAccountDeposit;
    }

    if (action === "edit") {
      const error = {
        errorAccountName: !Boolean(accountName),
      };

      setError(error);
      return error.errorAccountName;
    }
  };

  return { defaultError, error, setError, checkErrors };
};

export default useValidation;
