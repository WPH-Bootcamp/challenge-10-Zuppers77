import { Badge } from "../ui/badge";

export function Tag({ tag }: { tag: string }) {
  return (
    <Badge
      variant="secondary"
      className="text-xs font-normal px-2 py-1 text-muted-foreground bg-white border-border rounded-sm"
    >
      {tag}
    </Badge>
  );
}
