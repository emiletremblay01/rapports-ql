"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";
type PostProps = {
  className?: string;
  post: Post;
};
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { dateFormatter, getInitials } from "@/lib/utils";
export function Post({ className, post }: PostProps) {
  const { content, createdAt, user } = post;
  const { formattedDate, hoverDate } = dateFormatter(createdAt);
  const initials = getInitials(user.name);
  return (
    <section
      className={cn(
        className,
        "w-full border-b p-3 transition-colors hover:bg-muted hover:bg-opacity-10",
      )}
    >
      <TooltipProvider>
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.co" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <section className="">
            <div className="inline-flex items-baseline gap-1">
              <h1 className="text font-semibold">{user.name}</h1>
              <Tooltip>
                <TooltipTrigger className="text-sm text-muted-foreground">
                  · <span className="hover:underline">{formattedDate}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{hoverDate}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm">{content}</p>
          </section>
        </div>
      </TooltipProvider>
    </section>
  );
}
