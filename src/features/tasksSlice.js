import { createSlice } from "@reduxjs/toolkit";


const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


const loadFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: loadFromLocalStorage(), 
    filteredTasks: loadFromLocalStorage(), 
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
      state.filteredTasks = state.list; 
      saveToLocalStorage(state.list); 
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      state.filteredTasks = state.list; 
      saveToLocalStorage(state.list); 
    },
    toggleComplete: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      state.filteredTasks = state.list; 
      saveToLocalStorage(state.list); 
    },
    setPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.list.find((task) => task.id === id);
      if (task) {
        task.priority = task.priority === priority ? "low" : priority;
      }
      state.filteredTasks = state.list;
      saveToLocalStorage(state.list); 
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
