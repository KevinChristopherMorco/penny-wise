import { useState } from "react";

const useValidation = () => {
  const defaultError = { accountName: false, accountDeposit: false };
  const [error, setError] = useState(defaultError);

  const checkErrors = (inputs, action, populate) => {
    const { accountName, accountDeposit } = inputs;

    if (action === "add") {
      const error = {
        errorAccountName: !Boolean(accountName),
        errorAccountDeposit:
          !Boolean(accountDeposit) || parseFloat(accountDeposit) < 1,
      };

      setError(error);
      return error.errorAccountName || error.errorAccountDeposit;
    }

    if (action === "edit") {
      const error = {
        errorAccountName: !Boolean(accountName),
        errorAccountDeposit:
          !Boolean(accountDeposit) || parseFloat(accountDeposit) < 0,
      };

      let isValueChange = false;

      if (populate) {
        isValueChange =
          parseFloat(accountDeposit) === 0 &&
          accountName === populate.accountName;
      }

      error.isValueChange = isValueChange;
      setError(error);

      return error.errorAccountName || error.isValueChange;
    }
  };

  return { defaultError, error, setError, checkErrors };
};

export default useValidation;
