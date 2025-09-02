import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type ImageMeta = { id: string; url: string; alt: string };

export default function CarouselViewer({ images }: { images: ImageMeta[] }) {
  const theme = useTheme()
  const [index, setIndex] = React.useState(0);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <IconButton
        aria-label="prev"
        onClick={() => go(-1)}
        sx={{
          position: "absolute", 
          left: 8, 
          color:theme.palette.custom.main, 
          zIndex: 3
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        aria-label="next"
        onClick={() => go(1)}
        sx={{
          position: "absolute", right: 8, color:
            theme.palette.custom.main
          , zIndex: 3
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          perspective: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {images.map((img, i) => {
          const offset = i - index;
          const absOffset = Math.abs(offset);
          const rotateY = offset * -25;
          const translateX = offset * 320;
          const scale = absOffset === 0 ? 1 : 0.9;

          return (
            <Box
              key={img.id}
              sx={{
                position: "absolute",
                width: 300,
                height: 250,
                borderRadius: 2,
                textAlign: "center",
                boxShadow:
                  absOffset === 0
                    ? "0 10px 30px rgba(0,0,0,0.4)"
                    : "0 5px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.6s, opacity 0.6s",
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity: absOffset > 2 ? 0 : 1,
                zIndex: absOffset === 0 ? 2 : 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={img.url}
                alt={img.alt}
                style={{
                  width: 300,
                  height: 250,
                  borderRadius: "5%",
                  objectFit: "cover",
                }}
              />

            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

