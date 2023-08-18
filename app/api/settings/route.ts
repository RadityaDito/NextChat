import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image } = body;

    //GetCurrentUser
    const currentUser = await getCurrentUser();
    //If no user return unauthorized
    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: name,
        image: image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error.message, "ERROR_SETTINGS");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
