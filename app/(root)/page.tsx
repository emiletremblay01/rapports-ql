import { Post } from "@/components/post";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full max-w-2xl">
      <Post />
      <Post />
    </main>
  );
}
