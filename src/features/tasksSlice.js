import { createSlice } from "@reduxjs/toolkit";

// Helper function to save tasks to localStorage
const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Helper function to retrieve tasks from localStorage
const loadFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: loadFromLocalStorage(), // Load tasks from localStorage on initial load
    filteredTasks: loadFromLocalStorage(), // Also load filtered tasks from localStorage
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
      state.filteredTasks = state.list; // Update filteredTasks
      saveToLocalStorage(state.list); // Save tasks to localStorage
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      state.filteredTasks = state.list; // Update filteredTasks
      saveToLocalStorage(state.list); // Save tasks to localStorage
    },
    toggleComplete: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      state.filteredTasks = state.list; // Update filteredTasks
      saveToLocalStorage(state.list); // Save tasks to localStorage
    },
    setPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.list.find((task) => task.id === id);
      if (task) {
        task.priority = task.priority === priority ? "low" : priority; // Toggle priority
      }
      state.filteredTasks = state.list; // Update filteredTasks
      saveToLocalStorage(state.list); // Save tasks to localStorage
    },
    filterTasks: (state, action) => {
      if (action.payload === "ALL") {
        state.filteredTasks = state.list;
      } else if (action.payload === "IMPORTANT") {
        state.filteredTasks = state.list.filter(
          (task) => task.priority === "high"
        );
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleComplete,
  setPriority,
  filterTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
