import React from "react";
import { IconAlertCircleFilled, IconCircleX } from "@tabler/icons-react";
import { useNavigateContext } from "../../../hooks/general/navigation/useActiveNavigation";
import { useBudgetContext } from "../../../hooks/user-actions/budget/useManageBudget";

const BudgetForm = () => {
  const {
    currentActive: {
      modal: { type },
    },
    setCurrentActive,
  } = useNavigateContext();

  const {
    defaultInput,
    currentInput: { budgetAmount = "" } = {},
    setInput,
    defaultError,
    error: { errorBudgetAmount } = {},
    setError,
    setPopulateFields,
    handleAddBudget,
    handleEditBudget,
    handleInputChange,
  } = useBudgetContext();

  const { category: { imagePath, colorCode, altText } = {} } =
    JSON.parse(localStorage.getItem("categoryChoice")) || {};

  const handleOnClose = () => {
    setInput(defaultInput);
    setError(defaultError);
    setCurrentActive("modal", {
      modalName: null,
      type: null,
    });
    setPopulateFields(defaultInput);
  };

  return (
    <div className="w-full h-full fixed flex justify-center items-center bg-[#000] bg-opacity-80 animate-fadeIn z-[999]">
      <div className="w-[85%] h-fit px-4 pt-2 pb-6 mb-[5rem] flex flex-col gap-8 bg-[var(--primary-color)] text-[var(--accent-color)] rounded-xl dark:bg-[var(--dark-primary-color)] dark:text-[var(--dark-text-color)]">
        <div className="py-2 flex justify-between items-center font-bold border-b border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]">
          <p>{type === "add" ? "Set a budget" : "Edit a budget"}</p>
          <IconCircleX className="w-6 h-6" onClick={() => handleOnClose()} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="py-3 px-4 flex items-center gap-2 bg-[var(--neutral-color)] rounded-lg dark:bg-[var(--dark-neutral-color)]">
            <div
              className="w-10 h-10 flex justify-center items-center rounded-full"
              style={{ backgroundColor: colorCode }}
            >
              <img
                src={imagePath}
                alt={altText}
                className="w-7 h-7 rounded-full"
              />
            </div>
            <p className="font-bold">{altText}</p>
          </div>
          <form
            onSubmit={type === "add" ? handleAddBudget : handleEditBudget}
            className="flex flex-col gap-8"
            method="POST"
          >
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-col gap-2 text-sm font-bold">
                <label htmlFor="accountName" className="basis-[60%]">
                  Budget Limit
                </label>
                <input
                  type="number"
                  id="budgetAmount"
                  name="budgetAmount"
                  className={`${
                    errorBudgetAmount ? "border border-red-500" : ""
                  } w-full p-2 text-black bg-[var(--neutral-color)] rounded-lg dark:bg-[var(--dark-neutral-color)] dark:text-[#fff]`}
                  placeholder="1.00"
                  onChange={handleInputChange}
                  value={budgetAmount}
                />
              </div>
              {errorBudgetAmount && (
                <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                  <IconAlertCircleFilled className="w-4 h-4" />
                  Please include a valid amount.
                </p>
              )}
            </div>
            <input
              type="submit"
              className="w-full p-2 text-base text-[var(--text-accent)] font-bold rounded-xl bg-[var(--accent-color)] cursor-pointer dark:bg-[var(--dark-accent-color)] dark:text-[var(--dark-primary-color)]"
              value={type === "add" ? "Add" : "Save"}
            />{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetForm;
