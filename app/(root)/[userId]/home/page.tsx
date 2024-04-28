import { Post } from "@/components/post";
import prismadb from "@/lib/prismadb";
export default async function Home() {
  const posts = await prismadb.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <main className="flex h-screen w-full max-w-2xl flex-col items-center overflow-y-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
