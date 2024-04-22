import Navbar from "@/components/navbar";
import UserSwitcher from "@/components/user-switcher";
import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
export default async function SidebarLeft({
  className,
}: {
  className?: string;
}) {
  const users = await prismadb.user.findMany();
  return (
    <div
      id="sidebar-left"
      className={cn(
        className,
        "flex h-screen max-w-lg flex-col items-center justify-between border-r p-4 md:items-end  ",
      )}
    >
      <Navbar />
      <UserSwitcher users={users} />
    </div>
  );
}
