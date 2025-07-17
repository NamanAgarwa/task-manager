import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const filterLabels = {
  search: "Search",
  status: "Status",
  sortBy: "Sort By",
  sortOrder: "Order",
  limit: "Rows",
};

const statusLabels = {
  all: "All",
  completed: "Completed",
  pending: "Pending",
};

const sortByLabels = {
  dueDate: "Due Date",
  priority: "Priority",
};

const sortOrderLabels = {
  asc: "Ascending",
  desc: "Descending",
};

export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  limit,
  setLimit,
  onCreate,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  // Debounced search state
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== search) setSearch(searchInput);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const activeFilters = [];
  if (search) activeFilters.push({ key: "search", label: `Search: ${search}` });
  if (status !== "all")
    activeFilters.push({
      key: "status",
      label: `Status: ${statusLabels[status]}`,
    });
  if (sortBy !== "dueDate")
    activeFilters.push({
      key: "sortBy",
      label: `Sort: ${sortByLabels[sortBy]}`,
    });
  if (sortOrder !== "asc")
    activeFilters.push({
      key: "sortOrder",
      label: `Order: ${sortOrderLabels[sortOrder]}`,
    });
  if (limit !== 10)
    activeFilters.push({ key: "limit", label: `Rows: ${limit}` });

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleDelete = (key) => {
    switch (key) {
      case "search":
        setSearch("");
        break;
      case "status":
        setStatus("all");
        break;
      case "sortBy":
        setSortBy("dueDate");
        break;
      case "sortOrder":
        setSortOrder("asc");
        break;
      case "limit":
        setLimit(10);
        break;
      default:
        break;
    }
  };

  const handleClearAll = () => {
    setSearch("");
    setStatus("all");
    setSortBy("dueDate");
    setSortOrder("asc");
    setLimit(10);
  };

  return (
    <Stack spacing={2} mb={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search tasks..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 4,
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.10)",
            fontSize: 18,
          },
        }}
        sx={{
          mb: 1,
          borderRadius: 4,
          input: { fontWeight: 500, fontSize: 18 },
        }}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="contained"
          onClick={onCreate}
          startIcon={<AddIcon />}
          sx={{ minWidth: 120 }}>
          Create Task
        </Button>
        <IconButton color="primary" onClick={handleOpen} aria-label="Filter">
          <FilterListIcon />
        </IconButton>
        {activeFilters
          .filter((f) => f.key !== "search")
          .map((filter) => (
            <Chip
              key={filter.key}
              label={filter.label}
              onDelete={() => handleDelete(filter.key)}
              color="primary"
              variant="outlined"
              sx={{ ml: 0.5 }}
            />
          ))}
        {activeFilters.length > 1 && (
          <Button size="small" onClick={handleClearAll} sx={{ ml: 1 }}>
            Clear All
          </Button>
        )}
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Stack spacing={2} p={2} minWidth={260}>
          {/* Remove search from popover */}
          <FormControl size="small" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="dueDate">Due Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              label="Order"
              onChange={(e) => setSortOrder(e.target.value)}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel>Rows</InputLabel>
            <Select
              value={limit}
              label="Rows"
              onChange={(e) => setLimit(Number(e.target.value))}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button onClick={handleClearAll} size="small">
              Clear All
            </Button>
            <Button onClick={handleClose} variant="contained" size="small">
              Apply
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
}
