import React, { useState, useRef } from "react";
import { Label } from "../ui/label";
import UploadIcon from "../../assets/upload-icon.svg";
import { Input } from "../ui/input";

export default function ImageUploader() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const imageUploaderRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const triggerimageUploader = () => {
    imageUploaderRef.current?.click();
  };

  return (
    <section className="flex flex-col gap-8 p-6 bg-card border border-progress-background bg-section-background rounded-md xl:pb-12">
      <Label className="text-base font-secondary font-normal">
        Upload Profile Photo
      </Label>
      <div className="bg-transparent w-full xl:bg-uploader-background xl:h-50">
        <div className="xl:relative">
          <div
            className="xl:absolute inset-0 w-full flex flex-col justify-center mx-auto p-6 border-4 rounded-lg bg-progress-background/50 h-60 xl:w-60 -top-5"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={triggerimageUploader}
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
    </section>
  );
}
