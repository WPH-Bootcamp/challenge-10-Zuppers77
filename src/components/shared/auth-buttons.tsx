import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AuthButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
      <Button variant="link" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button variant="primary" onClick={() => router.push("/register")}>
        Register
      </Button>
    </div>
  );
}
