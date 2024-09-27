import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconCurrencyPeso,
  IconX,
  IconAlertCircleFilled,
} from "@tabler/icons-react";

import category from "../../json/expenseCategory.json";
import useFetchStorage from "../../hooks/fetch/useFetchStorage";
import { useExpenseContext } from "../../hooks/user-actions/expense/useManageExpense";

import Empty from "../../alerts/indicators/Empty";

const Expense = () => {
  const [viewAccount, setViewAccount] = useState(false);
  const [isAmount, setIsAmount] = useState(false);

  const {
    defaultInput,
    currentInput: {
      expenseName = "",
      expenseCategory = "",
      expenseAmount = "",
      expenseAccount = "",
    },
    error: {
      errorExpenseName,
      errorExpenseAmount,
      errorExpenseCategory,
      errorExpenseAccount,
    },
    setInput,
    handleAddExpense,
    handleInputChange,
  } = useExpenseContext();
  const { accounts } = useFetchStorage();

  const checkSufficientBalance = (balance, amount) => {
    return parseFloat(amount) > parseFloat(balance);
  };

  const handleAccountList = () => {
    if (!Boolean(expenseAmount)) {
      setIsAmount(true);
      return;
    }
    setIsAmount(false);
    setViewAccount(true);
  };

  useEffect(() => {
    if (Boolean(expenseAmount)) {
      setIsAmount(false);
    }
  }, [expenseAmount]);

  useEffect(() => {
    setInput(defaultInput);
  }, []);

  return (
    <div className="relative mb-[5rem] flex flex-col gap-6">
      <div className="px-4 py-5 flex justify-center items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/421/244/non_2x/e-wallet-technology-payment-concept-with-team-people-and-gold-free-vector.jpg"
          alt=""
          className="xl:w-full xl:h-[20rem] rounded-lg"
        />
      </div>
      <div className="py-4 bg-[var(--primary-color)] dark:bg-[var(--dark-primary-color)]">
        <form
          method="POST"
          className="px-4 flex flex-col gap-6 bg-[var(--primary-color) dark:bg-[var(--dark-primary-color)]"
          onSubmit={handleAddExpense}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="font-bold">
              Name
            </label>
            <input
              type="text"
              id="expenseName"
              name="expenseName"
              data-name="expenseName"
              className={`${
                errorExpenseName ? "border border-red-500 bg-[#F2E0E4]" : ""
              } py-2 px-4 text-sm rounded-lg bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]`}
              placeholder="Type expense name"
              onChange={handleInputChange}
              value={expenseName}
            />
            {errorExpenseName && (
              <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                <span className="w-4 h-4">
                  <IconAlertCircleFilled className="w-4 h-4" />
                </span>
                Please include an expense name.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="expenseCategory" className="font-bold">
              Category
            </label>
            <div
              className={`${
                errorExpenseCategory ? "border border-red-500 bg-[#F2E0E4]" : ""
              } horizontalFilter w-full py-2 px-4 flex gap-8 overflow-y-scroll bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)] rounded-xl`}
            >
              <ul className="flex gap-8">
                {category.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                    data-name="expenseCategory"
                    data-category={category.label}
                    onClick={handleInputChange}
                  >
                    <p
                      className={`${
                        expenseCategory === category.label ? "font-bold" : ""
                      } flex items-center gap-2 text-sm`}
                    >
                      <span
                        className={`${
                          expenseCategory === category.label
                            ? "border-4 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]  transition-colors"
                            : ""
                        }  w-10 h-10 flex justify-center items-center rounded-lg`}
                        style={{ backgroundColor: category.colorCode }}
                      >
                        <img
                          src={category.imagePath}
                          className="w-7 h-7"
                          alt="Icon"
                        />
                      </span>
                      {category.label.charAt(0).toUpperCase() +
                        category.label.slice(1)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {errorExpenseCategory && (
              <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                <span className="w-4 h-4">
                  <IconAlertCircleFilled className="w-4 h-4" />
                </span>
                Please include an expense category.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="expenseAmount" className="font-bold">
              Amount
            </label>
            <input
              type="number"
              id="expenseAmount"
              name="expenseAmount"
              data-name="expenseAmount"
              className={`${
                errorExpenseAmount ? "border border-red-500 bg-[#F2E0E4]" : ""
              } py-2 px-4 text-sm rounded-lg bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]`}
              placeholder="Type expense amount"
              onChange={handleInputChange}
              value={expenseAmount}
            />
            {errorExpenseAmount && (
              <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                <span className="w-4 h-4">
                  <IconAlertCircleFilled className="w-4 h-4" />
                </span>
                Please include an amount for the expense.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="expenseAccount" className="font-bold">
              Select an account
            </label>
            <div
              className={`${
                errorExpenseAccount || isAmount
                  ? "border border-red-500 bg-[#F2E0E4]"
                  : ""
              } py-2 px-4 text-sm rounded-lg bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]`}
              onClick={handleAccountList}
            >
              <p
                className={`${
                  expenseAccount
                    ? "text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
                    : "text-[#B2A3B3]"
                }`}
              >
                {expenseAccount
                  ? accounts.find((account) => account.id === expenseAccount)
                      .accountName
                  : "Browse from the saved accounts"}
              </p>
            </div>
            {errorExpenseAccount && (
              <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                <span className="w-4 h-4">
                  <IconAlertCircleFilled className="w-4 h-4" />
                </span>
                Please include the account on where the expense would be
                deducted.
              </p>
            )}

            {isAmount && (
              <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                <span className="w-4 h-4">
                  <IconAlertCircleFilled className="w-4 h-4" />
                </span>
                Please include the expense amount first.
              </p>
            )}
          </div>
          <input
            type="submit"
            value="Save"
            className="w-full p-3 text-base text-[var(--text-accent)] font-bold rounded-xl bg-[var(--accent-color)] cursor-pointer dark:bg-[var(--dark-accent-color)] dark:text-[var(--dark-primary-color)]"
          />
        </form>
      </div>
      {viewAccount && (
        <div className="w-full h-full top-0 absolute bg-black bg-opacity-50  z-[999]">
          <div className="w-full h-[70%] p-4 flex flex-col absolute gap-4 -bottom-20 bg-[var(--primary-color)] dark:bg-[var(--dark-primary-color)] animate-slideUp">
            <div className="flex justify-between items-center">
              <p className="font-bold">Choose an account</p>
              <span className="w-6 h-6">
                <IconX onClick={() => setViewAccount(false)} />
              </span>
            </div>
            <div className="flex flex-col gap-4 overflow-y-scroll">
              {Boolean(accounts) && accounts.length > 0 ? (
                accounts.map((account, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div
                      key={account.id}
                      className={`${
                        expenseAccount === account.id
                          ? "border-2 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]"
                          : checkSufficientBalance(
                              account.accountBalance,
                              expenseAmount
                            )
                          ? "bg-red-200 border border-red-400"
                          : ""
                      } h-[4.5rem] px-4 flex justify-between items-center bg-[var(--neutral-color)] rounded-lg dark:bg-[var(--dark-neutral-color)] relative cursor-pointer`}
                      data-name="expenseAccount"
                      data-account={account.id}
                      onClick={
                        checkSufficientBalance(
                          account.accountBalance,
                          expenseAmount
                        )
                          ? () => {}
                          : handleInputChange
                      }
                    >
                      <div
                        className={`${
                          checkSufficientBalance(
                            account.accountBalance,
                            expenseAmount
                          )
                            ? "border-red-500"
                            : "border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]"
                        } basis-[20%] w-14 h-14 p-2 flex justify-center items-center border rounded-xl`}
                      >
                        <img
                          src={`/src/assets/flaticons/${account.icon}.png`}
                          alt=""
                          className="w-10 h-10 rounded-lg"
                        />
                      </div>
                      <div className="basis-[70%] flex flex-col gap-1 text-sm">
                        <p className="text-base font-bold">
                          {account.accountName}
                        </p>
                        <div className="flex items-center gap-1">
                          <p>Balance :</p>
                          <p
                            className={`${
                              checkSufficientBalance(
                                account.accountBalance,
                                expenseAmount
                              )
                                ? "text-red-500"
                                : "text-green-600 dark:text-green-400"
                            } flex items-center  font-bold `}
                          >
                            <span className="w-4 h-4">
                              <IconCurrencyPeso className="w-full h-full" />
                            </span>
                            {parseFloat(account.accountBalance).toLocaleString(
                              "en",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    {checkSufficientBalance(
                      account.accountBalance,
                      expenseAmount
                    ) && (
                      <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                        <IconAlertCircleFilled className="w-4 h-4" />
                        Insufficient Funds
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <Empty
                  title="No Opened Accounts"
                  subtext="Please set up an account first!"
                />
              )}
            </div>
            <Link
              to="/manage-account"
              className="mx-auto p-2 flex justify-center items-center text-sm text-[var(--accent-color)] font-bold border border-[var(--accent-color)] rounded transition-colors hover:bg-[var(--accent-color)] hover:text-white dark:text-[var(--dark-accent-color)] dark:border-[var(--dark-accent-color)] hover:dark:bg-[var(--dark-accent-color)]"
            >
              <p className="flex items-center gap-1 font-bold">
                <span className="w-4 h-4">+</span>
                Add an Account
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
