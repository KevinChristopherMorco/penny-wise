import React from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

const SettingsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex items-center bg-[var(--accent-color)] text-[var(--text-accent)] border-b dark:bg-[var(--dark-primary-color)] dark:border-[var(--dark-accent-color)]">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IconChevronLeft className="w-5 h-5" />
      </div>
      <div className="w-full flex justify-center items-center font-bold">
        <p className="flex items-center">Settings</p>
      </div>
    </div>
  );
};

export default SettingsHeader;
