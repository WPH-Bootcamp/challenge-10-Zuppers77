import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  headline: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
