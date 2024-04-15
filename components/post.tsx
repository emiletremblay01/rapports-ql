import { cn, getInitials } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dedent from "dedent";
type PostProps = {
  className?: string;
};

export function Post({ className }: PostProps) {
  return (
    <section className={cn(className, "w-full border-b p-3")}>
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.co" />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        <section className="">
          <div className="inline-flex items-baseline gap-1">
            <h1 className="font-semibold text">Shayla Ngawala</h1>
            <p className="text-muted-foreground text-sm">· 22h</p>
          </div>
          <p className="text-sm">
            Coming shortly, 𝕏 will publish everything demanded by @Alexandre and
            how those requests violate Brazilian law.
            <br /> This judge has brazenly and repeatedly betrayed the
            constitution and people of Brazil. He should resign or be impeached.
            Shame @Alexandre , shame.
          </p>
        </section>
      </div>
    </section>
  );
}
