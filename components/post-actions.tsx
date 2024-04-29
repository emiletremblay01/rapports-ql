"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Edit2, Ellipsis, Pin, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import type { Post } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
type PostActionsProps = {
  className?: string;
  post: Post;
};
export default function PostActions({ className, post }: PostActionsProps) {
  const params = useParams();
  const router = useRouter();
  const { userId } = params;
  const { id } = post;
  const handleDelete = async () => {
    try {
      const res = await axios.delete("/api/post", {
        data: {
          postId: id,
          userId: userId,
        },
      });
      toast("Post deleted successfully.");
      router.refresh();
    } catch (error: any | AxiosError) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        toast("Error deleting post:\n" + response?.data);
        return;
      }
      toast("Error deleting post. Check the console for more details.");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          className,
          "h-fit rounded px-1 py-0.5 transition-colors hover:bg-muted",
        )}
      >
        <Ellipsis className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Edit2 className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pin className="mr-2 size-4" />
          Pin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
