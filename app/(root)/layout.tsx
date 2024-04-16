import SidebarLeft from "@/components/sidebar-left";
import SidebarRight from "@/components/sidebar-right";
import getAllUsers from "@/actions/get/get-all-users";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getAllUsers();
  const props = { users };
  return (
    <div className="flex ">
      <SidebarLeft {...props} className="" />
      {children}
      <SidebarRight className="flex-1 p-4" {...props} />
    </div>
  );
}
