import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar, { getBackgroundStyle } from "./components/Navbar";
import { useColorMode } from "./hooks/use-color";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // Using theme mode
  const { colorMode } = useColorMode();

  return (
    <Box minH={"100vh"} style={getBackgroundStyle(colorMode)}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CreatePage" element={<CreatePage />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
};

export default App;
