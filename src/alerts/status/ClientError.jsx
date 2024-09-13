import React from "react";
import confusedPenguin from "../../assets/images/gif/confused-penguin.gif";
import { Link } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";

const ClientError = () => {
  return (
    <section className="h-full min-h-screen bg-white dark:bg-gray-900">
      <div className="py-8 px-4 flex flex-col mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="flex flex-col items-center gap-6 max-w-screen-sm text-center">
          <img
            src={confusedPenguin}
            className="mx-auto w-[8.5rem] h-[8.5rem]"
            alt="Page not found"
          />
          <p className="text-4xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Whoops!
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, the page doesn’t exist anymore.{" "}
            </p>
            <p className="text-lg font-light text-gray-500 dark:text-gray-400">
              No worries! You can head back to our homepage to continue
              exploring!{" "}
            </p>
          </div>
          <Link
            to="/"
            className="w-[55%] p-2 mx-auto flex justify-center items-center gap-2 text-sm text-[var(--accent-color)] font-bold border border-[var(--accent-color)] rounded-lg transition-colors hover:bg-[var(--accent-color)] hover:text-white dark:text-[var(--dark-accent-color)] dark:border-[var(--dark-accent-color)] hover:dark:bg-[var(--dark-accent-color)]"
          >
            <IconHome className="w-5 h-5" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClientError;
