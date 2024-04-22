"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { User } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserSwitcher({ users = [] }: { users: User[] }) {
  const params = useParams();
  const pathname = usePathname();
  const pathnameWithoutUserId = pathname.replace(`/${params.userId}`, "");

  const router = useRouter();
  const [position, setPosition] = useState(String(params.userId));
  const selectedUser = users.find((user) => user.id === position);
  useEffect(() => {
    router.push(`/${position}${pathnameWithoutUserId}`);
  }, [position]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="" asChild>
        <Button
          variant="outline"
          className="flex w-fit justify-center overflow-visible rounded-full p-0 hover:scale-105 md:h-14 md:w-56 md:items-center md:justify-normal md:gap-2 md:border-none md:px-2 md:pb-0 md:hover:scale-100"
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
