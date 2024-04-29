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

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, userId } = body;

    if (!postId) {
      return new NextResponse("Post ID is required.", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("User ID is required.", { status: 400 });
    }

    const post = await prismadb.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return new NextResponse("Post not found in database.", { status: 404 });
    }

    if (post.user.userId !== userId) {
      return new NextResponse("Unauthorized to delete", { status: 401 });
    }

    await prismadb.post.delete({
      where: { id: postId },
    });
    revalidatePath(`/[userId]/home`, "page");
    return new NextResponse("Post deleted successfully.");
  } catch (error) {
    console.error(error);
    return new NextResponse("error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, content, isPinned } = body.data;

    if (!postId) {
      return new NextResponse("Post ID is required.", { status: 400 });
    }

    const post = await prismadb.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return new NextResponse("Post not found in database.", { status: 404 });
    }

    await prismadb.post.update({
      where: { id: postId },
      data: { content, isPinned },
    });
    revalidatePath(`/[userId]/home`, "page");
    return new NextResponse("Post pinned successfully.");
  } catch (error) {
    console.error(error);
    return new NextResponse("error", { status: 500 });
  }
}
