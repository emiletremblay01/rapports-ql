"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  getLoggedInUser,
  setLoggedInUser,
} from "@/context/useLoggedInUserStore";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";

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
        <h1 className="w-full text-center text-xl font-bold py-4">
          PINNED POSTS
        </h1>
        <Card className="rounded-xl">
          <CardContent className="text-sm py-4">
            <p className="text-sm pb-2">
              Coming shortly, 𝕏 will publish everything demanded by @Alexandre
              and how those requests violate Brazilian law.
              <br /> This judge has brazenly and repeatedly betrayed the
              constitution and people of Brazil. He should resign or be
              impeached. Shame @Alexandre, shame.
            </p>
            <div className="w-full flex">
              <div className="inline-flex items-baseline gap-1">
                <h1 className="text-muted-foreground">Shayla Ngawala</h1>
                <p className="text-muted-foreground">· 22h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
