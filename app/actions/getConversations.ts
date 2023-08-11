import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc", //Order by last message
      },
      where: {
        userIds: {
          has: currentUser.id, //Where this conversation include current user
        },
      },
      include: {
        users: true, //Populate users
        messages: {
          //Populate messages only include sender and seen
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
