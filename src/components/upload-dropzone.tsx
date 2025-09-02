import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadItem from "./upload-item";
import { useUploads } from "../hooks/use-uploads";

const MAX_SIZE = 5 * 1024 * 1024;

export default function UploadDropzone() {
  const { uploads, addFiles } = useUploads();
  const theme = useTheme()
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
    e.currentTarget.value = "";
  };

  const handleFiles = (files: File[]) => {
    const valid = files.filter((f) => {
      if (!/jpe?g$/i.test(f.name)) return false;
      if (f.size > MAX_SIZE) return false;
      return true;
    });
    if (valid.length) addFiles(valid);
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          border: "2px dashed",
          borderColor: "divider",
          textAlign: "center",
          mb: 2,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        aria-label="Drop files here"
      >
        <CloudUploadIcon fontSize="large" />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Drag & drop JPG/JPEG images (≤ 5MB) or click to select
        </Typography>
        <Button variant="contained" component="label" sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }} >
          Select Files
          <input
            type="file"
            accept="image/jpeg,image/jpg"
            multiple
            hidden
            onChange={onPick}
          />
        </Button>
      </Paper>

      <Stack spacing={1}>
        {uploads.map((u) => (
          <UploadItem key={u.id} item={u} />
        ))}
      </Stack>
    </Box>
  );
}
