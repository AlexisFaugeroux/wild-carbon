import './App.css';

import HeaderBar from './components/Header';

import { Box, ThemeProvider } from '@mui/material';
import theme from './theme';
import Footer from './components/Footer';
import Navigator from './Navigator';
import { LoginContextProvider } from './hooks/useLoginContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginContextProvider>
        <Box>
          <HeaderBar />
          <Navigator />
          <Footer />
        </Box>
      </LoginContextProvider>
    </ThemeProvider>
  );
}

export default App;
