import { Routes, Route } from "react-router-dom";
import "./App.css";

import CanvasPage from "./pages/CanvasPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import HeaderBar from "./components/Header";
import Dashboard from "./pages/Dashboard";

import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/canvas" element={<CanvasPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
