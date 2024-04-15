"use server";
import prismadb from "@/lib/prismadb";
const getAllUsers = async () => {
  const users = await prismadb.user.findMany();
  return users;
};

export default getAllUsers;
