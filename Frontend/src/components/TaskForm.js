import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import FlagIcon from "@mui/icons-material/Flag";
import { format } from "date-fns";

const priorities = ["High", "Medium", "Low"];

export default function TaskForm({ initialData = {}, onSubmit, loading }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate
      ? format(new Date(initialData.dueDate), "yyyy-MM-dd")
      : ""
  );
  const [priority, setPriority] = useState(initialData?.priority || "Medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate || !priority) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    onSubmit({ title, description, dueDate, priority });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
        minWidth: { xs: 300, sm: 400 },
        maxWidth: 480,
        mx: "auto",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(40,40,50,0.95)"
            : "rgba(255,255,255,0.98)",
      }}>
      <Typography variant="h5" fontWeight={700} align="center" mb={1}>
        {initialData?._id ? "Edit Task" : "Create Task"}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color="primary" />
                </InputAdornment>
              ),
            }}
            autoFocus
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlagIcon color="warning" />
                  </InputAdornment>
                ),
              }}>
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          {error && (
            <Typography color="error" fontSize={14} align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              py: 1.2,
              fontSize: 18,
              boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.10)",
            }}
            fullWidth>
            {loading
              ? "Saving..."
              : initialData?._id
              ? "Update Task"
              : "Create Task"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
