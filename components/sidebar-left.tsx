"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SquarePen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function SidebarLeft({ className }: { className?: string }) {
  return (
    <div id="sidebar" className={cn(className)}>
      <div className="flex flex-col gap-2 items-center">
        <ModeToggle />
        <Button size="icon">
          <SquarePen className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <div>
        <DropdownMenuRadioGroupDemo />
      </div>
    </div>
  );
}
const users = [
  {
    id: 1,
    name: "Emile Tremblay",
    avatar_src: "efe",
    password: "",
  },
  {
    id: 2,
    name: "Shayla Ngawala",
    avatar_src: "efe",
    password: "",
  },
  {
    id: 3,
    name: "Jean-René Gagnon",
    avatar_src: "efe",
    password: "",
  },
];
export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = useState("1");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const user = users.find((user) => String(user.id) === position);
    setSelectedUser(user);
  }, [position]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-0 rounded-full hover:scale-105">
          <Avatar>
            <AvatarImage src="https://github.co" />
            <AvatarFallback>
              {selectedUser ? getInitials(selectedUser.name) : ""}
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
              value={String(user.id)}
              className="gap-2"
            >
              {/* <Avatar>
                <AvatarImage src={user.avatar_src} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar> */}
              <div>{user.name}</div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
