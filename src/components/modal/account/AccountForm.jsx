import React from "react";
import { IconCircleX, IconAlertCircleFilled } from "@tabler/icons-react";
import savings from "../../../assets/flaticons/savings.png";
import salary from "../../../assets/flaticons/salary.png";
import { useNavigateContext } from "../../../hooks/general/navigation/useActiveNavigation";
import { useAccountContext } from "../../../hooks/user-actions/account/useManageAccount";

const AddAccount = () => {
  const {
    currentActive: {
      modal: { type },
    },
    handleCloseModal,
  } = useNavigateContext();

  const {
    defaultInput,
    currentInput: { accountName = "", accountDeposit = "", icon = "" } = {},
    error: { errorAccountName, errorAccountDeposit } = {},
    error,
    defaultError,
    setInput,
    setError,
    setPopulateFields,
    handleAddAccount,
    handleEditAccount,
    handleInputChange,
  } = useAccountContext();

  const handleOnClose = () => {
    handleCloseModal();
    setInput(defaultInput);
    setError(defaultError);
    setPopulateFields(defaultInput);
  };

  console.log(error);

  return (
    <div className="w-full h-full fixed flex justify-center items-center bg-[#000] bg-opacity-80 animate-fadeIn z-[999] md:bg-opacity-10 md:w-[70%] md:mx-auto xl:w-[60%] 2xl:w-[40%]">
      <div className="w-[85%] h-fit px-4 pt-2 pb-6 mb-[5rem] flex flex-col gap-8 bg-[var(--primary-color)] text-[var(--text-color)] rounded-xl dark:bg-[var(--dark-primary-color)] dark:text-[var(--dark-text-color)]">
        <div className="py-2 flex justify-between items-center font-bold border-b border-[var(--accent-color)] dark:border-[var(--dark-accent-color)]">
          <p>{type === "add" ? "Add an Account" : "Edit an Account"}</p>
          <IconCircleX
            className="w-6 h-6 cursor-pointer"
            onClick={() => handleOnClose()}
          />
        </div>
        <div>
          <form
            onSubmit={type === "add" ? handleAddAccount : handleEditAccount}
            className="flex flex-col gap-8"
            method="POST"
          >
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-col gap-2 text-sm font-bold">
                <label htmlFor="accountName" className="basis-[60%]">
                  Account Name
                </label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  className={`${
                    errorAccountName ? "border border-red-500" : ""
                  } w-full p-2 text-black bg-[var(--neutral-color)] rounded-lg dark:bg-[var(--dark-neutral-color)] dark:text-[#fff]`}
                  placeholder="My savings"
                  onChange={handleInputChange}
                  value={accountName}
                />
              </div>
              {errorAccountName && (
                <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                  <IconAlertCircleFilled className="w-4 h-4" />
                  Please include an account name.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-col gap-2 text-sm font-bold">
                <label htmlFor="accountBalance" className="basis-[55%]">
                  {type === "add" ? " Initial Amount" : "Deposit Amount"}
                </label>
                <input
                  type="number"
                  id="accountDeposit"
                  name="accountDeposit"
                  className={`${
                    errorAccountDeposit ? "border border-red-500" : ""
                  } w-full p-2 text-black bg-[var(--neutral-color)] rounded-lg dark:bg-[var(--dark-neutral-color)] dark:text-[#fff]`}
                  placeholder="1.00"
                  onChange={handleInputChange}
                  value={accountDeposit}
                />
              </div>
              {type === "edit" && (
                <div className="flex gap-1 self-end">
                  <input
                    type="checkbox"
                    id="isDeposit"
                    name="isDeposit"
                    checked
                  />
                  <label for="isDeposit" className="text-[.8rem]">
                    I don't want to deposit
                  </label>
                </div>
              )}
              {errorAccountDeposit && (
                <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                  <IconAlertCircleFilled className="w-4 h-4" />
                  Please include a valid amount.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Icons</p>
              <div className="p-2 flex gap-2 bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)] rounded-xl">
                <div
                  className={`${
                    icon === "savings"
                      ? "border-4 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)] "
                      : ""
                  } w-12 h-12 flex justify-center items-center bg-[var(--secondary-color)] dark:bg-[var(--dark-secondary-color)] rounded-xl cursor-pointer`}
                >
                  <img
                    src={savings}
                    name="icon"
                    className="w-10 h-10 rounded-xl"
                    data-accounttype="savings"
                    onClick={handleInputChange}
                  />
                </div>
                <div
                  className={`${
                    icon === "salary"
                      ? "border-4 border-[var(--accent-color)] dark:border-[var(--dark-accent-color)] "
                      : ""
                  } w-12 h-12 flex justify-center items-center bg-[var(--secondary-color)] dark:bg-[var(--dark-secondary-color)] rounded-xl cursor-pointer`}
                >
                  <img
                    src={salary}
                    name="icon"
                    alt=""
                    className="w-10 h-10 rounded-xl"
                    data-accounttype="salary"
                    onClick={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="w-full p-2 text-base text-[var(--text-accent)] font-bold rounded-xl bg-[var(--accent-color)] cursor-pointer xl:w-[30%] xl:self-end dark:bg-[var(--dark-accent-color)] dark:text-[var(--dark-primary-color)]"
              value={type === "add" ? "Add" : "Save"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
