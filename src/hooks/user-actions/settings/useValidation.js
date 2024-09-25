import React, { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({ errorUsername: false });

  const checkErrors = (inputs) => {
    const { username } = inputs;

    const error = {
      errorUsername: !Boolean(username),
    };

    setError(error);

    return error.errorUsername;
  };

  return { error, checkErrors };
};

export default useValidation;
