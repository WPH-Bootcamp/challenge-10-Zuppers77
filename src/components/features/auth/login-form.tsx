"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginValues } from "@/lib/validations/auth-schema";
import { useAuth } from "@/hooks/query/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm() {
  const { loginMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-sm shadow-md p-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="font-semibold text-sm">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={
                    errors.email
                      ? "border-destructive text-destructive placeholder:text-destructive/50"
                      : ""
                  }
                  {...register("email")}
                />
                <FieldError errors={[{ message: errors.email?.message }]} />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="font-semibold text-sm"
                >
                  Password
                </FieldLabel>
                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  className={
                    errors.password
                      ? "border-destructive text-destructive placeholder:text-destructive/50"
                      : ""
                  }
                  {...register("password")}
                />
                <FieldError errors={[{ message: errors.password?.message }]} />
              </Field>

              <Button
                variant="primary"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? <Spinner className="mr-2" /> : null}
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-brand-300 hover:underline"
          >
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
