import { useRouter } from "next/navigation";

export default function PostPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center w-full max-w-2xl">
      post something
    </main>
  );
}
