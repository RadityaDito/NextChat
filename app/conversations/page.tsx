"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div className={clsx("h-full lg:pl-80 lg:block")}>
      <EmptyState />
    </div>
  );
};

export default Home;
