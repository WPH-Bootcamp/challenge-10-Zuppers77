import { LoginForm } from "@/components/features/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Blog App",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return <LoginForm />;
}
