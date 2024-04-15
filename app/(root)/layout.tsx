import SidebarLeft from "@/components/sidebar-left";
import getAllUsers from "@/actions/get/get-all-users";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getAllUsers();
  const props = { users };
  return (
    <div className="flex">
      <SidebarLeft
        {...props}
        className="border-r p-4 h-screen flex flex-col items-center justify-between"
      />
      {children}
    </div>
  );
}
