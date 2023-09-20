import './App.css';

import HeaderBar from './components/Header';

import { Box, ThemeProvider } from '@mui/material';
import theme from './theme';
import Footer from './components/Footer';
import Navigator from './Navigator';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <HeaderBar />
        <Navigator />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
