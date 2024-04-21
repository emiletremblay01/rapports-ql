"use server";
import prismadb from "@/lib/prismadb";
export const getAllUsers = async () => {
  const users = await prismadb.user.findMany();
  return users;
};
