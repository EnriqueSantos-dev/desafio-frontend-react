"use client";

import React, { useId, useState } from "react";
import Image from "next/image";

import { XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { TextField } from "@/components/shared/ui/text-input";
import { getBase64 } from "@/utils/get-base64";

const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024,
  SUPPORTED_FORMATS: ["image/jpeg", "image/jpg", "image/png"],
};

type UploadImageProps = React.InputHTMLAttributes<HTMLInputElement> & {
  defaultFileUrl?: string;
  onResetField: () => void;
  onChangeValue: (base64: string) => void;
};

const validateImage = (file: File): { error: string } | { file: File } => {
  if (!FILE_CONSTRAINTS.SUPPORTED_FORMATS.includes(file.type))
    return { error: "Invalid file type" };

  if (file.size > FILE_CONSTRAINTS.MAX_SIZE)
    return { error: "File is too large, max size (5MB)." };
  return { file };
};

export const UploadImage = React.forwardRef<HTMLInputElement, UploadImageProps>(
  ({ onResetField, onChangeValue, defaultFileUrl, ...props }, ref) => {
    const [_, setBase64] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | undefined>(
      file && !defaultFileUrl ? URL.createObjectURL(file) : defaultFileUrl
    );
    const randomId = useId();
    const inputId = props.id ?? randomId;

    const onClearInput = () => {
      setFile(null);
      setError(null);
      setPreview(undefined);
      onResetField();
      onChangeValue("");
    };

    const handleError = (error: string) => {
      setError(error);
      onResetField();
    };

    const onHandleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      try {
        if (e.dataTransfer.items && e.dataTransfer.items[0].kind === "file") {
          const validationFileObject = validateImage(
            e.dataTransfer.items[0].getAsFile()!
          );

          if ("error" in validationFileObject) {
            setError(validationFileObject.error);
            return;
          }

          const base64 = (await getBase64(validationFileObject.file)) as string;
          setBase64(base64 as string);
          setPreview(URL.createObjectURL(validationFileObject.file));
          setFile(validationFileObject.file);
          onChangeValue(base64);
        } else {
          const validationFileObject = validateImage(e.dataTransfer.files[0]);
          if ("error" in validationFileObject) {
            setError(validationFileObject.error);
            return;
          }

          const base64 = (await getBase64(validationFileObject.file)) as string;
          setBase64(base64);
          setPreview(URL.createObjectURL(validationFileObject.file));
          setFile(validationFileObject.file);
          onChangeValue(base64);
        }
      } catch (error: any) {
        handleError(error.message);
      }
    };

    const onHandleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const files = e.target.files;

        if (!files || files.length === 0) return;

        const file = files[0];
        const validationFileObject = validateImage(file);

        if ("error" in validationFileObject) {
          handleError(validationFileObject.error);
          return;
        }

        const base64 = (await getBase64(file)) as string;
        setBase64(base64);

        setFile(file);
        setPreview(URL.createObjectURL(file));
        onChangeValue(base64);
      } catch (error: any) {
        handleError(error.message);
      }
    };

    return (
      <div className="mx-auto flex flex-col items-center justify-center">
        {!file && !preview && (
          <>
            <div
              onDrop={onHandleDrop}
              onDragOver={onHandleDragOver}
              tabIndex={0}
              className={cn(
                "flex items-center justify-center rounded-md border border-dashed p-8 transition-colors focus:outline-none",
                {
                  "border-red-500 hover:border-red-600 focus-visible:border-red-500":
                    error,
                  "border-neutral-300 focus-visible:border-blue-500 hover:border-neutral-500":
                    !error,
                }
              )}
            >
              <label
                htmlFor={inputId}
                className={cn(
                  "w-full h-full",
                  !error
                    ? "text-neutral-900 dark:text-neutral-100 cursor-pointer"
                    : "text-red-500"
                )}
              >
                Drag and drop your file here or click bellow
              </label>
            </div>

            {error && (
              <span className="my-3 inline-block text-center text-sm text-red-500">
                {error}
              </span>
            )}

            <TextField.Root className="mt-4 max-w-xs">
              <TextField.Field
                {...props}
                id={inputId}
                onChange={handleChange}
                ref={ref}
                placeholder="file"
                type="file"
                accept="image/*"
                className="w-3/6 appearance-none"
              />
            </TextField.Root>
          </>
        )}

        {preview && (
          <div className="flex items-start gap-2">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={preview}
                className="rounded-full"
                alt="preview user avatar"
                fill
              />
            </div>

            <button
              type="button"
              aria-label="clear input"
              className="h-6 w-6 p-0 text-red-500 transition-colors hover:text-red-600"
              onClick={onClearInput}
            >
              <XCircle size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }
);

UploadImage.displayName = "UploadImage";
