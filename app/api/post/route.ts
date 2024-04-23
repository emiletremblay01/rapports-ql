import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, userId } = body;

    if (!content) {
      return new NextResponse("Post content is required.", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("User ID is required.", { status: 400 });
    }

    const user = await prismadb.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse("User not found in database.", { status: 404 });
    }

    const { id, name } = user;
    const post = await prismadb.post.create({
      data: {
        content,
        user: {
          userId: id,
          name: name,
        },
      },
    });
    revalidatePath(`/[userId]/home`, "page");
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return new NextResponse("error", { status: 500 });
  }
}
