import Link from "next/link";

export default function PostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full min-w-max max-w-2xl">
      pinned posts
      <Link href="/">back home</Link>
    </main>
  );
}
