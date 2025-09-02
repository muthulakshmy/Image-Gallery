import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UploadDropzone from "../components/upload-dropzone";

export default function UploadPage() {
  const nav = useNavigate();
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Upload Images</Typography>
      <UploadDropzone />
      <Box textAlign="center" mt={3}>
        <Button variant="outlined"  color="primary" 
          sx={{
            color: theme.palette.primary.main, 
            borderColor: theme.palette.primary.main,
            "&:hover": {
              borderColor: theme.palette.primary.dark, 
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(46, 125, 50, 0.08)"
                  : "rgba(102, 187, 106, 0.15)",
            },
          }}  onClick={() => nav("/carousel")}>Go to Carousel</Button>
      </Box>
    </Box>
  );
}
