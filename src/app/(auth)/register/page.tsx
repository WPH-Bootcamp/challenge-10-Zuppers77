import { RegisterForm } from "@/components/features/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Blog App",
  description: "Create a new account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
