import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { Conversation, User } from "@prisma/client";

const useOtherUser = (
  conversation:
    | (Conversation & {
        users: User[];
      })
    | FullConversationType
) => {
  const session = useSession();

  //Find other user exclude current user in the conversation
  const otherUser = useMemo(() => {
    //Get current user email
    const currentUserEmail = session?.data?.user?.email;

    //get all the user in the conversation except the current user
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    //Return only the first otherUser
    return otherUser[0];
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
