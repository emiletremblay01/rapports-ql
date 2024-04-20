"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, Pin, Settings, SquarePen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { use, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import {
  setLoggedInUser,
  getLoggedInUser,
} from "@/context/useLoggedInUserStore";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const pages = [
  { name: "Home", href: "/", icon: Home },
  { name: "Pinned", href: "/pinned-posts", icon: Pin },
  { name: "Settings", href: "/settings", icon: Settings },
];
export default function SidebarLeft({
  users,
  className,
}: {
  users: User[];
  className?: string;
}) {
  if (!getLoggedInUser()) {
    setLoggedInUser(users[0]);
  }

  return (
    <div
      id="sidebar-left"
      className={cn(
        className,
        "flex h-screen flex-1 flex-row-reverse border-r "
      )}
    >
      <div className="flex flex-col w-118 md:p-4 p-2 items-stretch">
        <NavigationMenu className="flex-1 block max-w-full">
          <NavigationMenuList className="flex-col items-center gap-2 space-x-0">
            {pages.map((page) => (
              <NavigationMenuItem>
                <Link href={page.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "flex gap-2 rounded-xl py-6 px-4"
                    )}
                  >
                    <page.icon className="size-6" />
                    <p className="hidden md:block">{page.name}</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem className="mt-40">
              <Link href="/post" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-full gap-2 items-center justify-center rounded-full bg-primary px-4 py-6 text-sm font-medium transition-colors hover:bg-primary-foreground hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  <SquarePen className="size-6" />
                  <p className="hidden md:block">Post</p>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="md:flex-none">
          <DropdownMenuRadioGroupDemo users={users} />
        </div>
      </div>
    </div>
  );
}

function DropdownMenuRadioGroupDemo({ users }: { users: User[] }) {
  const loggedInUser = getLoggedInUser();
  const [selectedUser, setSelectedUser] = useState(loggedInUser);
  const [position, setPosition] = useState("");
  useEffect(() => {
    if (loggedInUser) {
      setSelectedUser(loggedInUser);
      setPosition(loggedInUser.id);
    }
  }, []);
  useEffect(() => {
    const user = users.find((user) => user.id === position);
    if (user) {
      setLoggedInUser(user);
      setSelectedUser(user);
    }
  }, [position]);
  if (!loggedInUser) {
    return <div>No logged in user!</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="" asChild>
        <Button
          variant="outline"
          className="w-fit p-0 flex overflow-visible justify-center mx-auto rounded-full hover:scale-105"
        >
          <Avatar className="">
            <AvatarImage src="" />
            <AvatarFallback>
              {selectedUser && getInitials(selectedUser.name)}
            </AvatarFallback>
          </Avatar>
          <p className="hidden md:block">{selectedUser && selectedUser.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Utilisateur</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {users.map((user) => (
            <DropdownMenuRadioItem
              key={user.id}
              value={user.id}
              className="gap-2"
            >
              <div>{user.name}</div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
