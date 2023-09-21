import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import variables from './variables';

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

let theme = createTheme({
  palette: {
    primary: {
      main: variables.primaryColor,
    },
    secondary: {
      main: variables.secondaryColor,
    },
    background: {
      default: variables.backgroundColor,
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Roboto mono',
    },
    fontSize: 16,
  },
  styleInputBase: {
    border: '1px solid',
    borderColor: '#1CAF68',
    borderRadius: '5px',
    backgroundColor: '#FFF',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
