"use client";

import { User } from "@prisma/client";
import React, { FC } from "react";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: FC<UserListProps> = ({ items }) => {
  return (
    <aside
      className="fixed block inset-y-0 left-0 w-full overflow-y-auto border-r border-gray-200 pb-20  
    lg:pb-0
    lg:left-20 
    lg:w-80 
    lg:block 
    "
    >
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">Users</div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
