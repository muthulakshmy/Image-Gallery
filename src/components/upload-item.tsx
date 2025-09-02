import {
  Card,
  CardContent,
  LinearProgress,
  Typography,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import type { UploadState } from "../hooks/use-uploads";

export default function UploadItem({ item }: { item: UploadState }) {
  const { file, progress, status, controller, error } = item;

  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 6,
            flexShrink: 0, 
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" noWrap>
            {file.name}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            aria-label={`progress ${progress}%`}
            sx={{ mt: 1 }}
          />

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            {status === "done" && (
              <Chip
                icon={<CheckCircleIcon />}
                label="Uploaded"
                size="small"
                color="success"
              />
            )}
            {status === "error" && (
              <Chip
                icon={<ErrorIcon />}
                label={error || "Error"}
                size="small"
                color="error"
              />
            )}
            {status === "paused" && <Chip label="Paused" size="small" />}
            {status === "uploading" && (
              <Chip
                label={`Uploading ${Math.round(progress)}%`}
                size="small"
                color="primary"
              />
            )}
          </Stack>
        </div>

        <Stack direction="row" spacing={1} alignItems="center">
          {status === "uploading" && (
            <IconButton
              aria-label="pause"
              onClick={() => controller?.pause?.()}
            >
              <PauseIcon />
            </IconButton>
          )}
          {status === "paused" && (
            <IconButton
              aria-label="resume"
              onClick={() => controller?.resume?.()}
            >
              <PlayArrowIcon />
            </IconButton>
          )}
          {status === "error" && (
            <IconButton aria-label="retry">
              <ReplayIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="cancel"
            onClick={() => controller?.cancel?.()}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
