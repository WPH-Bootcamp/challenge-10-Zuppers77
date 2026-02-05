"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/query/use-auth";
import { useUpdateProfile } from "@/hooks/query/use-users";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { User } from "@/types/user-types";
import {
  profileSchema,
  ProfileFormValues,
} from "@/lib/validations/user-schema";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProfileFormProps {
  user: User;
  onSuccess: () => void;
}

function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      headline: user.headline || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.headline) formData.append("headline", data.headline);

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        onSuccess();
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <label
          htmlFor="avatar-upload"
          className="relative cursor-pointer group"
        >
          <Avatar className="h-24 w-24 border-2 border-border group-hover:opacity-80 transition-opacity">
            <AvatarImage src={previewUrl || user.avatarUrl} />
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-brand-300 text-primary-foreground p-1.5 rounded-full shadow-sm hover:bg-primary/90 transition-colors">
            <Camera size={16} />
          </div>
        </label>
        <input
          id="avatar-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headline">Profile Headline</Label>
        <Input
          id="headline"
          placeholder="Frontend Developer"
          {...register("headline")}
        />
      </div>

      <Button
        variant="primary"
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}

export function EditProfileDialog({
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const { user } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        {open && user && (
          <ProfileForm
            user={user}
            onSuccess={() => onOpenChange(false)}
            key={`${user.id}-${open}`}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
