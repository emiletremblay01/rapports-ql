"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SidebarRight({ className }: { className?: string }) {
  return (
    <div
      id="sidebar-right"
      className={cn(className, "h-screen max-w-lg border-l")}
    >
      <div className="hidden flex-col items-baseline gap-2 lg:flex">
        <h1 className="w-full py-4 text-center text-xl font-bold">
          PINNED POSTS
        </h1>
        <Card className="rounded-xl">
          <CardContent className="py-4 text-sm">
            <p className="pb-2 text-sm">
              Coming shortly, 𝕏 will publish everything demanded by @Alexandre
              and how those requests violate Brazilian law.
              <br /> This judge has brazenly and repeatedly betrayed the
              constitution and people of Brazil. He should resign or be
              impeached. Shame @Alexandre, shame.
            </p>
            <div className="flex w-full">
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
