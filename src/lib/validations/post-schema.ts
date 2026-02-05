import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
});

export type PostFormValues = z.infer<typeof postSchema>;
