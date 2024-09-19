import React from "react";
import AccountCard from "./dynamic/AccountCard";
import { IconPlus } from "@tabler/icons-react";
import Empty from "../../alerts/indicators/Empty";
import { useNavigateContext } from "../../hooks/general/navigation/useActiveNavigation";
import { useAccountContext } from "../../hooks/user-actions/account/useManageAccount";

const Account = () => {
  const { setCurrentActive } = useNavigateContext();
  const { accounts } = useAccountContext();

  return (
    <div className="px-4 py-2 flex flex-col gap-3 bg-[var(--primary-color)] dark:bg-[var(--dark-primary-color)]">
      <p className="text-lg font-bold">Accounts</p>
      <div className="mb-[5rem] flex flex-col gap-4">
        {Boolean(accounts) && accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard key={account.id} accountProps={account} />
          ))
        ) : (
          <Empty
            title={"Account Setup Required"}
            subtext={
              "It looks like you haven't set up any financial accounts yet. Start by adding your first account to get started!"
            }
          />
        )}

        <button
          className="mx-auto p-2 flex justify-center items-center text-sm text-[var(--accent-color)] font-bold border border-[var(--accent-color)] rounded-lg transition-colors hover:bg-[var(--accent-color)] hover:text-white dark:text-[var(--dark-accent-color)] dark:border-[var(--dark-accent-color)] hover:dark:bg-[var(--dark-accent-color)]"
          onClick={() =>
            setCurrentActive("modal", {
              modalName: "addAccount",
              type: "add",
            })
          }
        >
          <p className="flex items-center gap-1 font-bold">
            <span>
              <IconPlus />
            </span>
            Add an Account
          </p>
        </button>
      </div>
    </div>
  );
};

export default Account;
