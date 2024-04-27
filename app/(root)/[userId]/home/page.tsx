import { Post } from "@/components/post";
import { TooltipProvider } from "@/components/ui/tooltip";
import prismadb from "@/lib/prismadb";
export default async function Home() {
  const posts = await prismadb.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <main className="flex h-screen w-full max-w-2xl flex-col items-center overflow-scroll">
      <TooltipProvider>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </TooltipProvider>
    </main>
  );
}
