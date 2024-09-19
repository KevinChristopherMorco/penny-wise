import React from "react";
import { IconCircleX } from "@tabler/icons-react";

import { useNavigateContext } from "../../../hooks/general/navigation/useActiveNavigation";
import { useExpenseContext } from "../../../hooks/user-actions/expense/useManageExpense";

import category from "../../../json/expenseCategory.json";

const ExpenseForm = () => {
  const {
    defaultInput,
    currentInput,
    setInput,
    setPopulateFields,
    handleEditExpense,
    handleInputChange,
  } = useExpenseContext();

  const { setCurrentActive } = useNavigateContext();

  const handleOnClose = () => {
    setPopulateFields(defaultInput);
    setInput(defaultInput);
    setCurrentActive("modal", {
      modalName: null,
      type: null,
    });
  };

  return (
    <div className="w-full h-full fixed flex justify-center items-center bg-[#000] bg-opacity-80 animate-fadeIn z-[999]">
      <div className="w-[85%] h-fit px-4 pt-2 pb-6 mb-[5rem] flex flex-col gap-8 bg-[var(--primary-color)] rounded-xl dark:bg-[var(--dark-primary-color)]">
        <div className="py-2 flex justify-between items-center font-bold border-b border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]">
          <p>Edit Expense</p>
          <IconCircleX className="w-6 h-6" onClick={() => handleOnClose()} />
        </div>
        <div>
          <form
            method="POST"
            className="flex flex-col gap-6"
            onSubmit={handleEditExpense}
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
                className="py-2 px-4 text-sm rounded-lg bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]"
                placeholder="Type expense name"
                onChange={handleInputChange}
                value={currentInput.expenseName}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="expenseCategory" className="font-bold">
                Category
              </label>
              <div className="horizontalFilter w-full py-2 px-4 flex gap-8 overflow-y-scroll bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)] rounded-xl">
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
                          currentInput.expenseCategory === category.label
                            ? "font-bold"
                            : ""
                        } flex items-center gap-2 text-sm`}
                      >
                        <span
                          className={`${
                            currentInput.expenseCategory === category.label
                              ? "border-4 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]  transition-colors"
                              : ""
                          } w-10 h-10 flex justify-center items-center rounded-lg`}
                          style={{ backgroundColor: category.colorCode }}
                        >
                          <img
                            src={`../${category.imagePath}`}
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
                className="py-2 px-4 text-sm rounded-lg bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]"
                placeholder="Type expense amount"
                onChange={handleInputChange}
                value={currentInput.expenseAmount}
              />
            </div>

            <input
              type="submit"
              value="Save"
              className="w-full p-3 text-base text-white font-bold rounded-xl bg-blue-600 cursor-pointer dark:bg-blue-800"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
