import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseDragDropProps {
  onFileDrop: (file: File) => void;
  allowedTypes?: string[];
}

export function useDragDrop({
  onFileDrop,
  allowedTypes = [],
}: UseDragDropProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (!file) return;

      if (allowedTypes.length > 0) {
        const isValid = allowedTypes.some((type) => {
          if (type.endsWith("/*")) {
            return file.type.startsWith(type.replace("/*", ""));
          }
          return file.type.startsWith(type);
        });

        if (!isValid) {
          toast.error("Invalid file type. Please upload a valid file.");
          return;
        }
      }

      onFileDrop(file);
    },
    [onFileDrop, allowedTypes],
  );

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
