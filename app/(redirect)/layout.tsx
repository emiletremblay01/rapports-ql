import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function Set({ children }: { children: React.ReactNode }) {
  const userId = cookies().get("userId")?.value;
  console.log(userId);
  if (userId) {
    redirect(`/${userId}/home`);
  }

  const firstUser = await prismadb.user.findFirst();
  console.log(firstUser);
  if (firstUser) {
    redirect(`/${firstUser.id}/home`);
  }
  return <div>{children}</div>;
}
