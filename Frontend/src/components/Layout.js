import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navigation from "./Navigation";

const Layout = ({ children }) => (
  <Box sx={{ flexGrow: 1 }}>
    <Navigation />
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {children}
    </Container>
  </Box>
);

export default Layout;
