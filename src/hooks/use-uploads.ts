import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ImageMeta } from "../api/handlers"; 

export type UploadState = {
  id: string;
  file: File;
  progress: number;
  status: "idle" | "uploading" | "paused" | "error" | "done";
  error?: string;
  controller?: { pause: () => void; resume: () => void; cancel: () => void };
};

export function useUploads() {
  const [uploads, setUploads] = React.useState<UploadState[]>([]);
  const qc = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Upload failed");
      }
      return (await res.json()) as ImageMeta;
    },
    onSuccess: (meta) => {
      qc.setQueryData<ImageMeta[]>(["images"], (old = []) => [meta, ...old]);
    },
  });

  const addFiles = (files: File[]) => {
    const newItems: UploadState[] = files.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      progress: 0,
      status: "idle",
    }));
    setUploads((p) => [...newItems, ...p]);
    newItems.forEach((it) => startUpload(it));
  };

  const startUpload = (upload: UploadState) => {
    let progress = 0;
    let timer: number | undefined;

    const tick = () => {
      progress = Math.min(100, progress + Math.floor(5 + Math.random() * 15));
      setUploads((prev) =>
        prev.map((u) => (u.id === upload.id ? { ...u, progress } : u))
      );
      if (progress >= 100) {
        if (timer) {
          clearInterval(timer);
          timer = undefined;
        }
        setUploads((prev) =>
          prev.map((u) =>
            u.id === upload.id ? { ...u, status: "uploading", progress: 100 } : u
          )
        );
        uploadMutation.mutate(upload.file, {
          onSuccess: () => {
            setUploads((prev) =>
              prev.map((u) =>
                u.id === upload.id ? { ...u, status: "done" } : u
              )
            );
          },
          onError: (err: any) => {
            setUploads((prev) =>
              prev.map((u) =>
                u.id === upload.id
                  ? { ...u, status: "error", error: err?.message }
                  : u
              )
            );
          },
        });
      }
    };

    timer = window.setInterval(tick, 300);

    const controller = {
      pause() {
        if (timer) {
          clearInterval(timer);
          timer = undefined;
          setUploads((prev) =>
            prev.map((u) =>
              u.id === upload.id ? { ...u, status: "paused" } : u
            )
          );
        }
      },
      resume() {
        if (!timer) {
          setUploads((prev) =>
            prev.map((u) =>
              u.id === upload.id ? { ...u, status: "uploading" } : u
            )
          );
          timer = window.setInterval(tick, 300);
        }
      },
      cancel() {
        if (timer) {
          clearInterval(timer);
          timer = undefined;
        }
        setUploads((prev) => prev.filter((u) => u.id !== upload.id));
      },
    };

    setUploads((prev) =>
      prev.map((u) =>
        u.id === upload.id ? { ...u, status: "uploading", controller } : u
      )
    );
  };

  const retry = (id: string) => {
    const u = uploads.find((x) => x.id === id);
    if (!u) return;
    setUploads((prev) =>
      prev.map((x) =>
        x.id === id
          ? { ...x, progress: 0, status: "idle", error: undefined }
          : x
      )
    );
    startUpload({ ...u, progress: 0, status: "idle", error: undefined });
  };

  return { uploads, addFiles, retry, setUploads };
}
