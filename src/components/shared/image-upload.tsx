"use client";

import { useState, useRef } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, validateImage } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useDragDrop } from "@/hooks/use-drag-drop";

interface ImageUploadProps {
  value?: string | File | null;
  onChange: (file: File | null) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(() => {
    if (typeof value === "string") return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return null;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const { valid, error } = validateImage(file);
    if (!valid) {
      toast.error(error);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
    useDragDrop({
      onFileDrop: processFile,
      allowedTypes: ["image/"],
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onRemove();
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-md transition-colors cursor-pointer hover:bg-muted/50",
        disabled && "opacity-50 cursor-not-allowed",
        isDragging && "border-brand-300 bg-brand-100/50",
        preview
          ? "h-auto border-muted-foreground/25"
          : "h-48 border-muted-foreground/25",
      )}
    >
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {preview ? (
        <div className="flex flex-col gap-4 w-full p-4 items-center">
          <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted/30">
            <Image
              src={preview}
              alt="Upload preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex gap-4 w-full max-w-sm">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2 bg-background shadow-xs hover:bg-muted/50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                disabled={disabled}
              >
                <Upload className="h-4 w-4" />
                Change Image
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 text-destructive bg-background shadow-xs"
                onClick={handleRemove}
                disabled={disabled}
              >
                <Trash2 className="h-4 w-4" />
                Delete Image
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              PNG or JPG (max. 5mb)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground py-10">
          <div className="p-4 bg-background rounded-full shadow-sm">
            <ImagePlus className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="font-medium">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG or JPG (max. 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
