import Link from "next/link";

export default function PostPage() {
  return (
    <main className="flex min-h-screen w-full min-w-max max-w-2xl flex-col items-center">
      pinned posts
      <Link href="/home">back home</Link>
    </main>
  );
}
