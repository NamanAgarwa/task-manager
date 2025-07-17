import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import EventIcon from "@mui/icons-material/Event";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import LinearProgress from "@mui/material/LinearProgress";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function DashboardContent({ toggleTheme, mode }) {
  const [analytics, setAnalytics] = useState(null);
  const [recent, setRecent] = useState([]);
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAnalytics();
    fetchRecent();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/tasks/analytics/dashboard");
      setAnalytics(res.data);
    } catch (err) {}
  };

  const fetchRecent = async () => {
    try {
      const res = await api.get(
        "/tasks?sortBy=updatedAt&sortOrder=desc&limit=5"
      );
      setRecent(res.data.tasks || []);
    } catch (err) {}
  };

  const pieData =
    analytics?.priorityDist?.map((d) => ({ name: d._id, value: d.count })) ||
    [];
  const completionRate = analytics?.completionRate || 0;
  const upcoming = analytics?.upcoming || [];
  const totalTasks = analytics?.total || 0;
  const completedTasks = analytics?.completed || 0;
  const pendingTasks = totalTasks - completedTasks;
  const isEmpty = totalTasks === 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #232526 0%, #414345 100%)"
            : "linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)",
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 3 },
        transition: "background 0.5s",
        position: "relative",
        overflowX: "hidden",
      }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ maxWidth: 1400, width: "100%", mx: "auto" }}>
        <Grid item xs={12} md={9}>
          <Paper
            elevation={4}
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              p: { xs: 2, sm: 4 },
              borderRadius: 5,
              backdropFilter: "blur(8px)",
              background:
                mode === "dark"
                  ? "rgba(40,40,50,0.85)"
                  : "rgba(255,255,255,0.7)",
              border: mode === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 64,
                height: 64,
                mr: { xs: 0, sm: 4 },
                mb: { xs: 2, sm: 0 },
                fontSize: 36,
                boxShadow: "0 4px 16px 0 rgba(25, 118, 210, 0.15)",
              }}>
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Welcome, {user?.name || "User"}!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Here’s your task analytics dashboard.
              </Typography>
              {isEmpty && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<AddCircleOutlineIcon />}
                    href="/tasks"
                    sx={{ borderRadius: 3, fontWeight: 700 }}>
                    Create Your First Task
                  </Button>
                </Box>
              )}
            </Box>
            <IconButton
              onClick={toggleTheme}
              sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
              {mode === "dark" ? <WbSunnyIcon /> : <DarkModeIcon />}
            </IconButton>
          </Paper>
          <Grid container spacing={4} mb={4}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: 120,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(25, 118, 210, 0.10)",
                  boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.10)",
                  transition: "box-shadow 0.3s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.18)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                }}>
                <ListAltIcon color="primary" sx={{ fontSize: 44, mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {totalTasks}
                </Typography>
                <Typography color="text.secondary">Total Tasks</Typography>
                {isEmpty && (
                  <Typography color="text.secondary" fontSize={14}>
                    No tasks yet
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: 120,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(46, 125, 50, 0.10)",
                  boxShadow: "0 2px 8px 0 rgba(46, 125, 50, 0.10)",
                  transition: "box-shadow 0.3s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(46, 125, 50, 0.18)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                }}>
                <AssignmentTurnedInIcon
                  color="success"
                  sx={{ fontSize: 44, mb: 1 }}
                />
                <Typography variant="h4" fontWeight={700}>
                  {completedTasks}
                </Typography>
                <Typography color="text.secondary">Completed</Typography>
                {isEmpty && (
                  <Typography color="text.secondary" fontSize={14}>
                    —
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: 120,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255, 193, 7, 0.10)",
                  boxShadow: "0 2px 8px 0 rgba(255, 193, 7, 0.10)",
                  transition: "box-shadow 0.3s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(255, 193, 7, 0.18)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                }}>
                <PendingActionsIcon
                  color="warning"
                  sx={{ fontSize: 44, mb: 1 }}
                />
                <Typography variant="h4" fontWeight={700}>
                  {pendingTasks}
                </Typography>
                <Typography color="text.secondary">Pending</Typography>
                {isEmpty && (
                  <Typography color="text.secondary" fontSize={14}>
                    —
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={4} mb={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(2px)",
                  background:
                    mode === "dark"
                      ? "rgba(40,40,50,0.85)"
                      : "rgba(255,255,255,0.92)",
                  border:
                    mode === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
                  transition: "box-shadow 0.3s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <PieChartIcon color="primary" fontSize="large" />
                  <Typography variant="h6">Task Distribution</Typography>
                </Stack>
                {isEmpty ? (
                  <Typography color="text.secondary" align="center">
                    No data to display yet.
                  </Typography>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label>
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(2px)",
                  background:
                    mode === "dark"
                      ? "rgba(40,40,50,0.85)"
                      : "rgba(255,255,255,0.92)",
                  border:
                    mode === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
                  transition: "box-shadow 0.3s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <TimelineIcon color="success" fontSize="large" />
                  <Typography variant="h6">Completion Rate</Typography>
                </Stack>
                {isEmpty ? (
                  <Typography color="text.secondary" align="center">
                    No data to display yet.
                  </Typography>
                ) : (
                  <>
                    <Typography
                      variant="h3"
                      fontWeight={700}
                      color="success.main"
                      align="center"
                      mb={2}>
                      {completionRate}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={completionRate}
                      sx={{ height: 12, borderRadius: 5, mb: 2 }}
                    />
                    <Typography align="center" color="text.secondary">
                      of your tasks are completed
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(2px)",
                  background:
                    mode === "dark"
                      ? "rgba(40,40,50,0.85)"
                      : "rgba(255,255,255,0.92)",
                  border:
                    mode === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
                  transition: "box-shadow 0.3s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <EventIcon color="warning" fontSize="large" />
                  <Typography variant="h6">Upcoming Deadlines</Typography>
                </Stack>
                {isEmpty ? (
                  <Typography color="text.secondary" align="center">
                    No upcoming deadlines.
                  </Typography>
                ) : (
                  <Stack spacing={1} width="100%">
                    {upcoming.map((task) => (
                      <Paper
                        key={task._id}
                        elevation={1}
                        sx={{
                          p: 1.5,
                          background: mode === "dark" ? "#232526" : "#f5f5f5",
                          mb: 1,
                          borderRadius: 2,
                          boxShadow: 1,
                        }}>
                        <Typography variant="subtitle1">
                          {task.title}
                        </Typography>
                        <Typography variant="body2">
                          Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}
                        </Typography>
                        <Typography variant="body2">
                          Priority: {task.priority}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 4,
              minHeight: 320,
              boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
              background:
                mode === "dark"
                  ? "rgba(40,40,50,0.85)"
                  : "rgba(255,255,255,0.92)",
              border: mode === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              position: { md: "sticky" },
              top: { md: 32 },
              mt: { xs: 4, md: 0 },
              transition: "box-shadow 0.3s, transform 0.2s",
              "&:hover": {
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                transform: "translateY(-2px) scale(1.01)",
              },
            }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <HistoryIcon color="info" fontSize="large" />
              <Typography variant="h6">Recent Activity</Typography>
            </Stack>
            {recent.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography color="text.secondary">
                  No recent activity yet. Start by creating or updating a task!
                </Typography>
              </Box>
            ) : (
              <Stack spacing={1} width="100%">
                {recent.map((task) => (
                  <Paper
                    key={task._id}
                    elevation={1}
                    sx={{
                      p: 1.5,
                      background: mode === "dark" ? "#232526" : "#f5f5f5",
                      mb: 1,
                      borderRadius: 2,
                      boxShadow: 1,
                    }}>
                    <Typography variant="subtitle2">{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.completed ? "Completed" : "Pending"} | Due:{" "}
                      {format(new Date(task.dueDate), "yyyy-MM-dd")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last updated:{" "}
                      {format(new Date(task.updatedAt), "yyyy-MM-dd HH:mm")}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function DashboardPage() {
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      background: {
        default: mode === "dark" ? "#232526" : "#f5f7fa",
        paper: mode === "dark" ? "#232526" : "#fff",
      },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: "Roboto, Arial, sans-serif" },
  });
  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  return (
    <ThemeProvider theme={theme}>
      <DashboardContent toggleTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
}
