import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function Set({ children }: { children: React.ReactNode }) {
  const userId = cookies().get("userId")?.value;

  if (userId) {
    redirect(`/${userId}/home`);
  }

  const firstUser = await prismadb.user.findFirst();

  if (firstUser) {
    redirect(`/${firstUser.id}/home`);
  }
  return <div>{children}</div>;
}
