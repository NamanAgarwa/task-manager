import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          {user && (
            <Button color="inherit" component={Link} href="/tasks">
              Tasks
            </Button>
          )}
          {user && (
            <Button color="inherit" component={Link} href="/dashboard">
              Dashboard
            </Button>
          )}
          {!user && (
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
          )}
          {!user && (
            <Button color="inherit" component={Link} href="/signup">
              Signup
            </Button>
          )}
          {user && (
            <>
              <Avatar
                sx={{ bgcolor: "primary.main", cursor: "pointer" }}
                onClick={handleAvatarClick}>
                {user.name ? user.name[0].toUpperCase() : "U"}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}>
                <MenuItem disabled>{user.name || user.email}</MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    handleMenuClose();
                  }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
