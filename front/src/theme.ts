import { createTheme } from '@mui/material/styles';

// Needed to add variables to theme
declare module '@mui/material/styles' {
  interface Theme {
    styleInputBase: {
      [key: string]: string | number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    styleInputBase?: {
      [key: string]: string | number;
    };
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    input: {
      primary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    input?: {
      primary?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1CAF68',
    },
    secondary: {
      main: '#3C8962',
    },
    background: {
      default: '#3C8962',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Roboto mono',
    },
  },
  styleInputBase: {
    border: '1px solid',
    height: '6vh',
    borderColor: '#1CAF68',
  },
});

export default theme;
