import SidebarLeft from "@/components/async/sidebar-left";
import SidebarRight from "@/components/sidebar-right";
import { getAllUsers } from "@/actions/get/get-actions";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const user = await prismadb.user.findFirst({
    where: { id: params.userId },
  });
  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex xl:container">
      <SidebarLeft className=" lg:w-full lg:max-w-lg" />
      {children}
      <SidebarRight className="hidden p-4 md:flex lg:flex-auto lg:basis-2/3" />
    </div>
  );
}
