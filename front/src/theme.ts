import { createTheme } from '@mui/material/styles';
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

const theme = createTheme({
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
  },
  styleInputBase: {
    border: '1px solid',
    height: '6vh',
    borderColor: '#1CAF68',
    padding: '10px',
    backgroundColor:'#FFF'
  },
});

export default theme;
