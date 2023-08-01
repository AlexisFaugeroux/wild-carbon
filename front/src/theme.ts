import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: "#1CAF68"
      },
      secondary: {
        main: "#3C8962"
      },
      background: {
        default: "#3C8962"
      },
    },
    typography: {
        allVariants: {
            fontFamily: "Roboto mono"
        }
    },
    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': '#1CAF68',
              '--TextField-brandBorderHoverColor': '#3C8962',
              '--TextField-brandBorderFocusedColor': '#3C8962',
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
    }
});

export default theme;