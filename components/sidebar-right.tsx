"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  getLoggedInUser,
  setLoggedInUser,
} from "@/context/useLoggedInUserStore";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { SquarePen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SidebarRight({
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
    <div id="sidebar-right" className={cn(className, "border-l h-screen")}>
      <div className="flex flex-col gap-2 items-baseline">
        <h1>PINNED</h1>
        <Card className="rounded-xl">
          <CardContent className="">
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
