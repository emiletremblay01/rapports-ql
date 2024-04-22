"use server";
import { cookies } from "next/headers";
import prismadb from "@/lib/prismadb";
import { Post } from "@prisma/client";
export const createPost = async (post: Post) => {
  const response = await prismadb.post.create({
    data: post,
  });
  return response;
};
export const setCookie = async (userId: string) => {
  cookies().set("userId", userId);
};
