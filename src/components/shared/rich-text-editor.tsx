"use client";
import { useState, useRef } from "react";
import { validateImage } from "@/lib/utils";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImageIcon,
  WrapText,
  RemoveFormatting,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter your content",
}: RichTextEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[200px] p-4",
      },
    },
    immediatelyRender: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { valid, error } = validateImage(file);
      if (!valid) {
        toast.error(error);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        if (src) {
          editor.chain().focus().setImage({ src }).run();
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`border rounded-md ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-2 flex items-center flex-wrap gap-2">
        <div className="flex items-center gap-0.5 flex-wrap">
          {/* Heading Dropdown */}
          <Select
            value={
              editor.isActive("heading", { level: 1 })
                ? "h1"
                : editor.isActive("heading", { level: 2 })
                  ? "h2"
                  : editor.isActive("heading", { level: 3 })
                    ? "h3"
                    : editor.isActive("heading", { level: 4 })
                      ? "h4"
                      : editor.isActive("heading", { level: 5 })
                        ? "h5"
                        : editor.isActive("heading", { level: 6 })
                          ? "h6"
                          : "paragraph"
            }
            onValueChange={(value) => {
              if (value === "paragraph") {
                editor.chain().focus().setParagraph().run();
              } else {
                const level = parseInt(value.replace("h", "")) as
                  | 1
                  | 2
                  | 3
                  | 4
                  | 5
                  | 6;
                editor.commands.setHeading({ level });
              }
            }}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Paragraph" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="h1">Heading 1</SelectItem>
              <SelectItem value="h2">Heading 2</SelectItem>
              <SelectItem value="h3">Heading 3</SelectItem>
              <SelectItem value="h4">Heading 4</SelectItem>
              <SelectItem value="h5">Heading 5</SelectItem>
              <SelectItem value="h6">Heading 6</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Text Formatting */}
          <Button
            type="button"
            variant={editor.isActive("bold") ? "secondary" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("strike") ? "secondary" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("italic") ? "secondary" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Lists */}
          <Button
            type="button"
            variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Text Alignment */}
          <Button
            type="button"
            variant={
              editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"
            }
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={
              editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"
            }
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={
              editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"
            }
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={
              editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"
            }
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Link */}
          <Button
            type="button"
            variant={editor.isActive("link") ? "secondary" : "ghost"}
            size="sm"
            className="h-8"
            onClick={setLink}
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <Unlink className="h-4 w-4" />
          </Button>

          {/* Image */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={addImage}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Hard Break */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <WrapText className="h-4 w-4" />
          </Button>

          {/* Clear Formatting */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
          >
            <RemoveFormatting className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Fullscreen Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div
        className={`tiptap-editor ${isFullscreen ? "h-[calc(100vh-60px)] overflow-y-auto" : ""}`}
      >
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .tiptap-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        .tiptap-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        .tiptap-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        .tiptap-editor h4 {
          font-size: 1.1em;
          font-weight: bold;
          margin: 1em 0;
        }
        .tiptap-editor h5 {
          font-size: 1em;
          font-weight: bold;
          margin: 1.17em 0;
        }
        .tiptap-editor h6 {
          font-size: 0.9em;
          font-weight: bold;
          margin: 1.33em 0;
        }
        .tiptap-editor ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 1em 0;
        }
        .tiptap-editor ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 1em 0;
        }
        .tiptap-editor li {
          margin: 0.25em 0;
        }
        .tiptap-editor p {
          margin: 0.5em 0;
        }
        .tiptap-editor strong {
          font-weight: bold;
        }
        .tiptap-editor em {
          font-style: italic;
        }
        .tiptap-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1em 0;
          display: block;
        }
        .tiptap-editor s {
          text-decoration: line-through;
        }
        .tiptap-editor u {
          text-decoration: underline;
        }
        .tiptap-editor code {
          background-color: #f4f4f5;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .tiptap-editor pre {
          background-color: #f4f4f5;
          padding: 1em;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1em 0;
        }
        .tiptap-editor pre code {
          background-color: transparent;
          padding: 0;
          font-size: 0.875em;
        }
        .tiptap-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
          font-style: italic;
        }
        .tiptap-editor [style*="text-align: left"] {
          text-align: left;
        }
        .tiptap-editor [style*="text-align: center"] {
          text-align: center;
        }
        .tiptap-editor [style*="text-align: right"] {
          text-align: right;
        }
        .tiptap-editor [style*="text-align: justify"] {
          text-align: justify;
        }
        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
