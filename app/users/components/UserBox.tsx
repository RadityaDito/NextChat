"use client";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="hover:bg-neutral-100 cursor-pointer relative w-full flex items-center space-x-3 bg-white p-3 rounded-lg transition"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-sm font-medium text-gray-900">{data.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
