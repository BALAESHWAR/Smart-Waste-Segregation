import { useState, useCallback } from "react";
import { Upload, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface WasteUploaderProps {
  onImageSelected: (file: File) => void;
}

export const WasteUploader = ({ onImageSelected }: WasteUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        onImageSelected(imageFile);
      } else {
        toast.error("Please upload an image file");
      }
    },
    [onImageSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          onImageSelected(file);
        } else {
          toast.error("Please upload an image file");
        }
      }
    },
    [onImageSelected]
  );

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${
        isDragging ? "border-primary bg-primary/5 scale-105" : "bg-gradient-card border-border"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="p-12 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          {isDragging ? (
            <Sparkles className="h-12 w-12 text-primary animate-pulse-glow" />
          ) : (
            <Upload className="h-12 w-12 text-primary" />
          )}
        </div>

        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Upload Waste Image
        </h3>
        <p className="mb-6 text-sm text-muted-foreground max-w-md mx-auto">
          Drag and drop an image here, or click to browse your files
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button
            variant="hero"
            size="lg"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <Camera className="h-5 w-5" />
            Choose Image
          </Button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Supported formats: JPG, PNG, WEBP (max 10MB)
        </p>
      </div>
    </Card>
  );
};
