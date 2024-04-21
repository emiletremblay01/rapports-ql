import SidebarLeft from "@/components/sidebar-left";
import SidebarRight from "@/components/sidebar-right";
import { getAllUsers } from "@/actions/get/get-actions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getAllUsers();
  const props = { users };
  return (
    <div className="flex xl:container">
      <SidebarLeft {...props} className=" lg:w-full lg:max-w-lg" />
      {children}
      <SidebarRight className="hidden p-4 md:flex lg:flex-auto lg:basis-2/3" />
    </div>
  );
}
