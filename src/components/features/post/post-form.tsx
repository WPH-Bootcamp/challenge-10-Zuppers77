"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ImageUpload } from "@/components/shared/image-upload";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { useCreatePost, useUpdatePost } from "@/hooks/query/use-posts";
import { Post } from "@/types/post-types";
import { postSchema, PostFormValues } from "@/lib/validations/post-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface PostFormProps {
  initialData?: Post;
  isEditing?: boolean;
}

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
  const router = useRouter();
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      tags: initialData?.tags || [],
    },
  });

  const tags = useWatch({ control, name: "tags" });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, "");
      if (newTag && !tags.includes(newTag)) {
        setValue("tags", [...tags, newTag], { shouldValidate: true });
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true },
    );
  };

  const onSubmit = (data: PostFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", JSON.stringify(data.tags));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing && initialData) {
      if (isImageRemoved && !imageFile) {
        formData.append("removeImage", "true");
      }

      updatePost(
        { id: initialData.id, data: formData },
        {
          onSuccess: (updatedPost) => {
            toast.success("Post updated successfully");
            router.push(`/post/${updatedPost.id}`);
            router.refresh();
          },
          onError: () => {
            toast.error("Failed to update post");
          },
        },
      );
    } else {
      if (!imageFile) {
        toast.error("Please upload a cover image");
        return;
      }

      createPost(formData, {
        onSuccess: (newPost) => {
          toast.success("Post created successfully");
          router.push(`/post/${newPost.id}`);
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to create post");
        },
      });
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent px-4">
      <CardContent className="p-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter your title"
                disabled={isPending}
                className="text-lg h-12"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your content"
                  />
                )}
              />
              {errors.content && (
                <p className="text-sm text-destructive">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload
                value={
                  isImageRemoved ? null : imageFile || initialData?.imageUrl
                }
                onChange={(file) => {
                  setImageFile(file);
                  setIsImageRemoved(false);
                }}
                onRemove={() => {
                  setImageFile(null);
                  setIsImageRemoved(true);
                }}
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div
                className={cn(
                  "flex flex-wrap gap-2 p-3 border rounded-md bg-transparent min-h-12 items-center transition-all",
                  "border-input focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] ring-offset-background",
                )}
              >
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="border border-input bg-transparent rounded-sm px-2 py-1 text-sm flex gap-1 items-center h-7"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-muted-foreground/20 rounded-full p-0.5 transition-colors"
                      disabled={isPending}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
                <input
                  placeholder={
                    tags.length === 0
                      ? "Enter your tags (press Enter or comma)"
                      : "Add a tag..."
                  }
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  disabled={isPending}
                  className={cn(
                    "flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-sm min-w-[120px] h-7",
                    "border-none ring-0 focus:ring-0",
                  )}
                />
              </div>
              {errors.tags && (
                <p className="text-sm text-destructive">
                  {errors.tags.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {isPending ? (
                <>
                  <Spinner />
                  Publishing...
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
