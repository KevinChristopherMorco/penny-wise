import React from "react";
import SettingsHeader from "../settings/SettingsHeader";
import SettingContainer from "../settings/SettingContainer";

const Settings = () => {
  return (
    <div className="grow flex flex-col">
      <SettingsHeader />
      <SettingContainer />
    </div>
  );
};

export default Settings;
