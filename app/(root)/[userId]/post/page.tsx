"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formSchema = z.object({
  post: z
    .string()
    .min(2, {
      message: "Post must be at least 2 characters.",
    })
    .max(500, {
      message: "Post must not be longer than 500 characters.",
    }),
});

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { post } = values;
      const data = {
        content: post,
        userId: params.userId,
      };
      const res = await axios.post(`/api/post`, data);
      if (res.status === 200) {
        toast("Post created successfully.");
        router.push(`/${params.userId}/home`);
        router.refresh();

        return;
      }
      toast("the response status is " + res.status);
    } catch (error) {
      toast("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="flex min-h-screen w-full min-w-max max-w-2xl flex-col items-center gap-2 px-4 py-2">
      <div className="w-full pb-10">
        <Button asChild variant="outline" className="p-2">
          <Link href={`/${params.userId}/home`}>
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what's up..."
                    className="h-52 resize-none"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="float-right" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
