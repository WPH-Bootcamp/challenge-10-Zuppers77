import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DeletePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeletePostDialog({
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeletePostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-4xl py-8 w-[95%] md:max-w-[600px] gap-6"
      >
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Delete</DialogTitle>
            <DialogClose className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="size-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <DialogDescription className="text-base text-muted-foreground">
            Are you sure to delete?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end justify-end gap-3 mt-2">
          <DialogClose asChild>
            <Button
              disabled={isDeleting}
              variant="outline"
              className="flex-1 md:flex-0 px-10 border-none rounded-full shadow-none text-foreground"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            variant="destructive"
            className="flex-1 md:flex-0 px-10 rounded-full h-11 bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
