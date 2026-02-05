"use client";

import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  passwordSchema,
  PasswordFormValues,
} from "@/lib/validations/user-schema";
import { useUpdatePassword } from "@/hooks/query/use-users";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";

export function ChangePasswordForm() {
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordFormValues) => {
    updatePassword(data, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        reset();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const message =
          axiosError.response?.data?.message || "Failed to update password";
        toast.error(message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <PasswordInput id="currentPassword" {...register("currentPassword")} />
        {errors.currentPassword && (
          <p className="text-sm text-destructive">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <PasswordInput id="newPassword" {...register("newPassword")} />
        {errors.newPassword && (
          <p className="text-sm text-destructive">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <PasswordInput id="confirmPassword" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        variant="primary"
        type="submit"
        className="w-full py-5"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
