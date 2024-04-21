"use client";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
const formSchema = z.object({
  post: z
    .string()
    .min(2, {
      message: "Post must be at least 2 characters.",
    })
    .max(160, {
      message: "Post must not be longer than 160 characters.",
    }),
});

export default async function PostPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main className="flex min-h-screen w-full min-w-max max-w-2xl flex-col items-center gap-2 px-4 py-2">
      <div className="w-full pb-10">
        <Button asChild variant="outline" className="p-2">
          <Link href="/">
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
          <Button type="submit" className=" float-right">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
