import React, { useState, useRef } from "react";
import { Label } from "../ui/label";
import UploadIcon from "../../assets/upload-icon.svg";
import { Input } from "../ui/input";

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const imageUploaderRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE_MB = 5;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const triggerImageUploader = () => {
    imageUploaderRef.current?.click();
  };

  const uploadImage = (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(
        `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller file.`
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "events");
    formData.append("tags", "browser_upload");

    fetch(`https://api.cloudinary.com/v1_1/digsmgagj/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url) {
          onImageUpload(data.secure_url);
        } else {
          throw new Error("Upload failed. Please try again.");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error uploading image:", error);
      });
  };

  return (
    <section className="flex flex-col gap-4 p-6 bg-card border border-progress-background bg-section-background rounded-md md:pb-12">
      <Label className="text-base font-secondary font-normal">
        Upload Profile Photo
      </Label>
      <div className="bg-transparent w-full md:bg-uploader-background md:h-50">
        <div className="md:relative">
          <div
            className={`inset-0 w-full flex flex-col justify-center mx-auto  border-4 rounded-lg bg-progress-background/50 h-60 -top-5 cursor-pointer overflow-hidden md:w-60 md:absolute ${
              !image && "p-6"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={triggerImageUploader}
          >
            {image ? (
              <img
                src={image as string}
                alt="Uploaded"
                className="w-full h-auto"
              />
            ) : (
              <div>
                <img src={UploadIcon} alt="Upload Icon" className="mx-auto" />
                <p className="font-secondary font-normal text-base text-center">
                  Drag & Drop or Click to upload
                </p>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              ref={imageUploaderRef}
              id="imageUploader"
            />
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </section>
  );
}
