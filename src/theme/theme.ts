import { createTheme } from "@mui/material/styles";
import "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      main: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      main: string;
    };
  }
}


export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#08979D" : "#85eef1ff", 
      },
      background: {
        default: mode === "light" ? "#fafafa" : "#121212",
      },
      custom: {
        main: mode === "light" ? "#000000" : "#ffffff", 
      },
    },
    shape: {
      borderRadius: 12,
    },
  });


