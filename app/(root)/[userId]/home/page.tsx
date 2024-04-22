import { Post } from "@/components/post";
import prismadb from "@/lib/prismadb";
export default async function Home() {
  const posts = await prismadb.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <main className="flex min-h-screen w-full max-w-2xl flex-col items-center">
      <Post />
      <Post />
    </main>
  );
}
