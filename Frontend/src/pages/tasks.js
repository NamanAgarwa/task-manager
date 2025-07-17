import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import Pagination from "@mui/material/Pagination";
import { useSnackbar } from "notistack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import api from "../services/api";
import FilterBar from "../components/FilterBar";
import Paper from "@mui/material/Paper";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  minWidth: 350,
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    fetchTasks();
    // eslint-disable-next-line
  }, [search, status, sortBy, sortOrder, user, page, limit]);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `/tasks?`;
      if (search) url += `search=${search}&`;
      if (status !== "all") url += `status=${status}&`;
      if (sortBy) url += `sortBy=${sortBy}&sortOrder=${sortOrder}&`;
      url += `page=${page}&limit=${limit}`;
      const res = await api.get(url);
      const data = res.data;
      setTasks(data.tasks);
      setTotal(data.total);
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.msg || "Failed to fetch tasks";
      setError(msg);
      enqueueSnackbar(msg, { variant: "error" });
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (task) => {
    if (!window.confirm("Delete this task?")) return;
    setLoading(true);
    setError("");
    try {
      await api.delete(`/tasks/${task._id}`);
      fetchTasks();
      enqueueSnackbar("Task deleted", { variant: "success" });
    } catch (err) {
      setError("Failed to delete task");
      enqueueSnackbar("Failed to delete task", { variant: "error" });
    }
    setLoading(false);
  };

  const handleToggleComplete = async (task) => {
    setLoading(true);
    setError("");
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
      enqueueSnackbar("Task updated", { variant: "success" });
    } catch (err) {
      setError("Failed to update task");
      enqueueSnackbar("Failed to update task", { variant: "error" });
    }
    setLoading(false);
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError("");
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, formData);
        enqueueSnackbar("Task updated", { variant: "success" });
      } else {
        await api.post("/tasks", formData);
        enqueueSnackbar("Task created", { variant: "success" });
      }
      setModalOpen(false);
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || "Failed to save task";
      setError(msg);
      enqueueSnackbar(msg, { variant: "error" });
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 3 },
        transition: "background 0.5s",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Animated background effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 20% 40%, rgba(25,118,210,0.10) 0, transparent 60%), radial-gradient(circle at 80% 60%, rgba(255,193,7,0.10) 0, transparent 60%)",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom align="center">
          Task Manager
        </Typography>
        <Paper
          elevation={4}
          sx={{
            maxWidth: 800,
            mx: "auto",
            mt: 2,
            p: { xs: 2, sm: 4 },
            borderRadius: 5,
            backdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}>
          <FilterBar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            limit={limit}
            setLimit={setLimit}
            onCreate={handleCreate}
          />
          {error && <Typography color="error">{error}</Typography>}
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
          <Stack direction="row" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(total / limit) || 1}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        </Paper>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleCreate}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          display: { xs: "flex", sm: "none" },
        }}>
        <AddIcon />
      </Fab>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <TaskForm
            initialData={editingTask}
            onSubmit={handleFormSubmit}
            loading={loading}
          />
        </Box>
      </Modal>
    </Box>
  );
}
