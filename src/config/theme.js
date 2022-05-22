import { createTheme } from '@mui/material/styles';

const config = {
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: "#3b82f6",
        // light: "",
        // dark: "",
        contrastText: "#fff",
      },
      secondary: {
        main: "#ff8743",
        // light: "",
        // dark: "",
        contrastText: "#000",
      },
      background: {
        paper: "#1e293b",
        default: "#0f172a",
      },
      common: {
        black: '#0f172a',
        white: '#f1f5f9',
      }
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
      },
    },
  }),
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: "#3b82f6",
        // light: "",
        // dark: "",
        contrastText: "#fff",
      },
      secondary: {
        main: "#ff8743",
        // light: "",
        // dark: "",
        contrastText: "#000",
      },
      background: {
        paper: "#fff",
        default: "#f1f5f9",
      },
      common: {
        black: '#0f172a',
        white: '#f1f5f9',
      }
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
      },
    },
  })
}

export default config