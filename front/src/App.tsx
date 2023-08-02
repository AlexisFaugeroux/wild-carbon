import { Routes, Route } from 'react-router-dom';
import './App.css';

import CanvasPage from './pages/CanvasPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import { Container, ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/canvas" element={<CanvasPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
