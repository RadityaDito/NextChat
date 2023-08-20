"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

const Avatar: FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="profile"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block top-0 right-0 bg-green-500 h-2 w-2 md:h-3 md:w-3 rounded-full ring-white ring-2" />
      )}
    </div>
  );
};

export default Avatar;
