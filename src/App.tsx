

import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ThemeProviderWrapper, {
  ColorModeContext,
} from "./app/theme-provider";
import UploadPage from "./pages/upload-page";
import CarouselPage from "./pages/carousel-page";

export default function App() {
  return (
    <ThemeProviderWrapper>
      <Shell />
    </ThemeProviderWrapper>
  );
}

function Shell() {
  const { pathname } = useLocation();
  const { mode, toggle } = React.useContext(ColorModeContext);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky" color="primary" >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: "inherit" }}
          >
            Image Gallery
          </Typography>

          <Button color={pathname === "/" ? "inherit" : "secondary"}
           component={Link} to="/">
            Upload
          </Button>
          <Button color={pathname.includes("/carousel") ? "inherit" : "secondary"} component={Link} to="/carousel">
            Carousel
          </Button>

          <IconButton onClick={toggle} aria-label="toggle theme" sx={{ ml: 1 }}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 2, flex: 1 }}>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/carousel" element={<CarouselPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
