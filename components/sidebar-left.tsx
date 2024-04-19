"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SquarePen } from "lucide-react";
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
      id="sidebar"
      className={cn(
        className,
        "flex flex-1 flex-row-reverse border-r bg-teal-200"
      )}
    >
      <div className="p-4 h-screen w-48 flex flex-col items-baseline flex-initial justify-between bg-red-400">
        <div className="flex flex-col gap-2 items-center">
          <ModeToggle />
          <Button asChild size="icon">
            <Link href="/post"><SquarePen className="h-[1.2rem] w-[1.2rem]" /></Link>
            
          </Button>
        </div>
        <div>
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
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-0 rounded-full hover:scale-105">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              {selectedUser && getInitials(selectedUser.name)}
            </AvatarFallback>
          </Avatar>
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
