import { http, HttpResponse, delay } from "msw";
import { v4 as uuidv4 } from "uuid";

export type ImageMeta = {
  id: string;
  name: string;
  url: string;
  size: number;
  alt: string;
};

let images: ImageMeta[] = Array.from({ length: 28 }).map((_, i) => {
  const id = `seed-${i + 1}`;
  return {
    id,
    name: `seed_${i + 1}.jpg`,
    url: `https://picsum.photos/id/${i + 10}/1200/800`,
    size: 100000 + i,
    alt: `Sample ${i + 1}`,
  };
});

export const handlers = [
  http.get("/api/images", async () => {
    await delay(300);
    return HttpResponse.json(images, { status: 200 });
  }),

  http.post("/api/upload", async ({ request }) => {
    const form = await request.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    if (!/jpe?g$/i.test(file.name) || file.size > 5 * 1024 * 1024) {
      return new Response("Invalid file", { status: 400 });
    }

    const id = uuidv4();
    const meta: ImageMeta = {
      id,
      name: file.name,
      url: `https://picsum.photos/seed/${id}/1200/800`,
      size: file.size,
      alt: file.name,
    };

    images = [meta, ...images];
    return HttpResponse.json(meta, { status: 201 });
  }),
];
