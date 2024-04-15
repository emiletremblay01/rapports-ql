"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SquarePen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { useEffect, useState } from "react";
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
    <div id="sidebar" className={cn(className)}>
      <div className="flex flex-col gap-2 items-center">
        <ModeToggle />
        <Button size="icon">
          <SquarePen className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <div>
        <DropdownMenuRadioGroupDemo users={users} />
      </div>
    </div>
  );
}

function DropdownMenuRadioGroupDemo({ users }: { users: User[] }) {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    return <div>No logged in user!</div>;
  }
  const [selectedUser, setSelectedUser] = useState(loggedInUser);
  const [position, setPosition] = useState(loggedInUser.id);

  useEffect(() => {
    const user = users.find((user) => user.id === position);
    if (user) {
      setLoggedInUser(user);
      setSelectedUser(user);
    }
  }, [position]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-0 rounded-full hover:scale-105">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{getInitials(selectedUser.name)}</AvatarFallback>
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
