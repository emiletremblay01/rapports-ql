"use server";
import prismadb from "@/lib/prismadb";
import { Post } from "@prisma/client";
export const createPost = async (post: Post) => {
  const response = await prismadb.post.create({
    data: post,
  });
  return response;
};
