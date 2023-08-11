"use client";

import { FullConversationType } from "@/app/types";
import { Conversation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    //if current user has seen this message
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
      w-full
      relative
      flex
      items-center
      rounded-lg
      hover:bg-neutral-100
      transition
      gap-x-3
      cursor-pointer
      p-3
    `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold">{otherUser.name}</p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
          text-sm
          `,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {" "}
            {lastMessageText}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
