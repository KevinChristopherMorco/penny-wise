import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconCurrencyPeso,
  IconDots,
  IconTrash,
  IconEdit,
  IconEye,
  IconContract,
  IconCategory,
} from "@tabler/icons-react";

import { useNavigateContext } from "../../../hooks/general/navigation/useActiveNavigation";
import { useAccountContext } from "../../../hooks/user-actions/account/useManageAccount";

const IncomeCard = ({
  accountProps: { id, accountName, accountBalance, icon },
}) => {
  const [toggle, setToggle] = useState(false);
  const { setCurrentActive } = useNavigateContext();
  const { setPopulateFields, handleDeleteAccount } = useAccountContext();

  const handleOnClickEdit = () => {
    setPopulateFields(id);
    setCurrentActive("modal", {
      modalName: "editAccount",
      type: "edit",
    });
  };

  return (
    <div className="h-[4.5rem] px-4 flex justify-between items-center shadow-md bg-[var(--neutral-color)] rounded-lg dark:bg-[var(--dark-neutral-color)] relative">
      <div className="basis-[20%] w-14 h-14 p-2 flex justify-center items-center bg-[var(--accent-color)] rounded-xl dark:bg-[var(--dark-accent-color)]">
        <img
          src={`/src/assets/flaticons/${icon}.png`}
          alt=""
          className="w-10 h-10 rounded-lg"
        />
      </div>
      <div className="basis-[60%] flex flex-col gap-1 text-sm">
        <p className="text-base font-bold">{accountName}</p>
        <div className="flex items-center gap-1">
          <p>Balance :</p>
          <p className="flex items-center text-green-600 font-bold dark:text-green-400">
            <IconCurrencyPeso className="w-5 h-5" />
            {parseFloat(accountBalance).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div
        className="basis-[10%] cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <IconDots />
      </div>
      {toggle && (
        <div className="w-fit px-4 py-2 absolute right-0 -bottom-[5rem] bg-[var(--primary-color)] shadow-lg z-[99] animate-fadeIn rounded-lg dark:bg-[var(--dark-primary-color)]">
          <ul className="flex flex-col gap-2 font-medium">
            <li
              className="flex items-center gap-1 text-orange-400 font-bold"
              onClick={() => handleOnClickEdit()}
            >
              <IconEdit className="w-5 h-5" />
              Edit
            </li>
            <li
              className="flex items-center gap-1 text-red-500 font-bold"
              onClick={() => handleDeleteAccount(id)}
            >
              <IconTrash className="w-5 h-5" />
              Delete
            </li>
            <li className="flex gap-1 text-[var(--accent-color)] dark:text-[var(--dark-accent-color)] font-bold">
              <Link
                className="flex items-center gap-1"
                to={`/manage-account/${id}`}
              >
                <IconCategory className="w-5 h-5" />
                Expenses
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncomeCard;
