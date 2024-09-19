import React from "react";
import sadPenguin from "../../assets/images/gif/sad-penguin.gif";

const Empty = ({ title, subtext, warning }) => {
  return (
    <div className="py-4 flex flex-col items-center gap-4 bg-[var(--neutral-color)] dark:bg-[var(--dark-neutral-color)]">
      <div>
        <img src={sadPenguin} alt="" className="w-[7rem] h-[7rem]" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className={`${warning ? "text-red-600" : ""} text-base font-bold`}>
          {title}
        </p>
        <p className="text-[.8rem] font-medium italic">{subtext}</p>
      </div>
    </div>
  );
};

export default Empty;
