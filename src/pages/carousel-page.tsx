import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import CarouselViewer from "../components/carousel-viewer";
import type { ImageMeta } from "../api/handlers";

export default function CarouselPage() {
  const { data = [], isLoading } = useQuery<ImageMeta[]>({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch("/api/images");
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Carousel
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : data.length ? (
        <CarouselViewer
          images={data.map((d) => ({ id: d.id, url: d.url, alt: d.alt }))}
        />
      ) : (
        <div>No images</div>
      )}
    </Box>
  );
}
