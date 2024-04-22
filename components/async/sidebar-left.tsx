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
        "flex h-[calc(100dvh)] max-w-lg flex-col items-center justify-between border-r px-2 py-4 md:items-end md:px-4  ",
      )}
    >
      <Navbar />
      <UserSwitcher users={users} />
    </div>
  );
}
