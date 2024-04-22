import { Post } from "@/components/post";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-2xl flex-col items-center">
      <Post />
      <Post />
    </main>
  );
}
