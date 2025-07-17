import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { format } from "date-fns";

const priorityColors = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  loading,
}) {
  if (loading)
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  if (!tasks || tasks.length === 0)
    return (
      <Typography align="center" color="text.secondary" my={4}>
        No tasks found.
      </Typography>
    );
  return (
    <Stack spacing={3}>
      {tasks.map((task) => (
        <Card
          key={task._id}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderRadius: 4,
            boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.10)",
            background: task.completed
              ? "linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%)"
              : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            transition: "box-shadow 0.3s, transform 0.2s",
            "&:hover": {
              boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.18)",
              transform: "translateY(-2px) scale(1.01)",
            },
          }}>
          <Avatar
            sx={{
              bgcolor: task.completed ? "grey.400" : "primary.main",
              mr: 2,
              width: 56,
              height: 56,
              fontSize: 28,
              boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.10)",
            }}>
            {task.title[0]?.toUpperCase()}
          </Avatar>
          <CardContent sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              spacing={1}
              justifyContent="space-between">
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  fontWeight: 700,
                  color: task.completed ? "grey.600" : "text.primary",
                  wordBreak: "break-word",
                }}
                noWrap
                title={task.title}>
                {task.title}
              </Typography>
              <Chip
                label={task.priority}
                color={priorityColors[task.priority]}
                size="small"
                sx={{ fontWeight: 600, fontSize: 14 }}
              />
            </Stack>
            <Typography
              color="text.secondary"
              sx={{ mt: 0.5, mb: 1 }}
              noWrap
              title={task.description}>
              {task.description}
            </Typography>
            <Stack direction="row" spacing={2} mt={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}
              </Typography>
              <Chip
                icon={
                  task.completed ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <RadioButtonUncheckedIcon color="warning" />
                  )
                }
                label={task.completed ? "Completed" : "Pending"}
                color={task.completed ? "success" : "warning"}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Stack>
          </CardContent>
          <Tooltip
            title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}>
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon color="success" />}
              sx={{ mx: 1 }}
            />
          </Tooltip>
          <Tooltip title="Edit Task">
            <Button
              onClick={() => onEdit(task)}
              sx={{ mr: 1, minWidth: 40 }}
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}>
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete Task">
            <Button
              color="error"
              onClick={() => onDelete(task)}
              variant="outlined"
              size="small"
              sx={{ minWidth: 40 }}
              startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Tooltip>
        </Card>
      ))}
    </Stack>
  );
}
