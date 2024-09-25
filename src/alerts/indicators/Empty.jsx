import React from "react";
import { IconMessageExclamation } from "@tabler/icons-react";

const Empty = ({ title, subtext, warning }) => {
  return (
    <div className="py-4 px-2 flex flex-col items-center gap-4">
      {/* <div>
        <img src={sadPenguin} alt="" className="w-[7rem] h-[7rem]" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className={`${warning ? "text-red-600" : ""} text-base font-bold`}>
          {title}
        </p>
        <p className="text-[.8rem] font-medium italic">{subtext}</p>
      </div> */}
      <div>
        <IconMessageExclamation
          className={`${
            warning ? "text-red-600" : "text-[var(--accent-color)]"
          } w-12 h-12 text-base font-bold`}
        />
      </div>
      <div className="flex flex-col text-center gap-1">
        <p
          className={`${
            warning ? "text-red-600" : "text-[var(--accent-color)]"
          } text-base font-bold`}
        >
          {title}
        </p>
        <p className="text-sm">{subtext}</p>
      </div>
    </div>
  );
};

export default Empty;
