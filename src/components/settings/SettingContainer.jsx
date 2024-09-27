import React from "react";
import { IconAlertCircleFilled, IconUser } from "@tabler/icons-react";
import useForm from "../../hooks/user-actions/settings/useForm";
import useValidation from "../../hooks/user-actions/settings/useValidation";

const SettingContainer = () => {
  const {
    error: { errorUsername },
    handleAddSetting,
    handleInputChange,
  } = useForm();

  return (
    <div className="grow flex">
      <div className="basis-[25%] xl:basis-[20%]">
        <ul className="w-full p-2 flex flex-col items-center font-bold">
          <li className="w-full py-1 px-2 flex justify-center items-center gap-2  text-[var(--primary-color)] bg-[var(--accent-color)] rounded-lg dark:text-[var(--dark-primary-color)] dark:bg-[var(--dark-accent-color)]">
            <IconUser className="w-4 h-4" />
            User
          </li>
        </ul>
      </div>
      <div className="py-2 px-6 grow">
        <form
          method="POST"
          onSubmit={handleAddSetting}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-bold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`${
                errorUsername ? "border border-red-500" : ""
              } w-full py-2 px-4 text-sm rounded-lg bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]`}
              placeholder="Type your username here"
              onChange={handleInputChange}
            />
            {errorUsername && (
              <p className="flex items-center gap-1 text-[.8rem] font-bold text-red-500">
                <IconAlertCircleFilled className="w-4 h-4" />
                Please include a username.
              </p>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Save"
              className="w-full p-2 text-base text-[var(--text-accent)] font-bold rounded-xl bg-[var(--accent-color)] cursor-pointer dark:bg-[var(--dark-accent-color)] dark:text-[var(--dark-primary-color)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingContainer;
