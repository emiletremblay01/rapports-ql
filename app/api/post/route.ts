import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { post } = body;
    if (!post) {
      return new NextResponse("no post", { status: 400 });
    }
    const res = await prismadb.post.create({
      data: {
        post,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return new NextResponse("error", { status: 500 });
  }
}
