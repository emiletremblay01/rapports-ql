"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";
type PostProps = {
  className?: string;
  post: Post;
};

export function Post({ className, post }: PostProps) {
  const { content, createdAt, user } = post;

  return (
    <section
      className={cn(
        className,
        "w-full border-b p-3 transition-colors hover:bg-muted hover:bg-opacity-10",
      )}
    >
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.co" />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        <section className="">
          <div className="inline-flex items-baseline gap-1">
            <h1 className="text font-semibold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{String(createdAt)}</p>
          </div>
          <p className="text-sm">{content}</p>
        </section>
      </div>
    </section>
  );
}
