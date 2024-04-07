import { cn } from "@/lib/utils";

type PostProps = {
  className?: string;
};

export function Post({ className }: PostProps) {
  return (
    <section className={cn(className)}>
      <h1>Post</h1>
    </section>
  );
}
