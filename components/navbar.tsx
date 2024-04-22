"use client";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Home, Pin, Settings, SquarePen } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Navbar({ className }: { className?: string }) {
  const params = useParams();

  const routes = [
    { name: "Home", href: `/${params.userId}/home`, icon: Home },
    {
      name: "Pinned",
      href: `/${params.userId}/pinned-posts`,
      icon: Pin,
      additionalClassName: "lg:hidden",
    },
    { name: "Settings", href: `/${params.userId}/settings`, icon: Settings },
  ];
  return (
    <div className="w-18 flex flex-col items-stretch md:w-56">
      <NavigationMenu className="block max-w-full flex-1">
        <NavigationMenuList className="flex-col items-center gap-2 space-x-0 md:items-stretch">
          {routes.map((route, index) => (
            <NavigationMenuItem
              key={index}
              className={cn(route.additionalClassName)}
            >
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 rounded-xl px-4 py-6 md:w-full md:justify-normal",
                  )}
                >
                  <route.icon className="size-6" />
                  <p className="hidden md:block">{route.name}</p>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
          <NavigationMenuItem className="mt-40">
            <Link href={`/${params.userId}/post`} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "group inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-6 text-sm font-medium transition-colors hover:bg-primary-foreground hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <SquarePen className="size-6" />
                <p className="hidden md:block">Post</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
