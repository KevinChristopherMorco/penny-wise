import React, { useState } from "react";
import AccountHeader from "../account/AccountHeader";
import Account from "../account/Account";
import AccountForm from "../modal/account/AccountForm";
import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";
import AccountProvider from "../../hooks/user-actions/account/useManageAccount";

const Income = () => {
  const {
    currentActive: {
      modal: { modalName },
    },
  } = useNavigateContext();
  return (
    <AccountProvider>
      <div className="flex flex-col gap-5 animate-fadeIn">
        <AccountHeader />
        <Account />
        {(modalName === "addAccount" || modalName === "editAccount") && (
          <AccountForm />
        )}
      </div>
    </AccountProvider>
  );
};

export default Income;
