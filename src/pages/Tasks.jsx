// import React, { useState, useEffect } from "react";
// import { FaStar, FaPlusCircle, FaCheckCircle } from "react-icons/fa";
// import { FiCheckSquare, FiCircle } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// import { addTask, toggleComplete, deleteTask, setPriority, filterTasks } from "../features/tasksSlice";

// const Tasks = ({ setIsAuthenticated }) => {
//     const tasks = useSelector((state) => state.tasks.filteredTasks);
//     const dispatch = useDispatch();

//     const [newTask, setNewTask] = useState("");
//     const [filter, setFilter] = useState("ALL");

//     useEffect(() => {
//         dispatch(filterTasks(filter));
//     }, [filter, dispatch]);

//     const handleAddTask = () => {
//         if (newTask.trim() === "") return;

//         const task = {
//             id: Date.now(),
//             name: newTask,
//             completed: false,
//             priority: "low",
//         };
//         dispatch(addTask(task));
//         setNewTask("");
//     };

//     const handleLogout = () => {
//         // Remove authentication status from localStorage
//         localStorage.removeItem("isAuthenticated");
//         setIsAuthenticated(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">
//             {/* Sidebar */}
//             <aside className="w-full lg:w-1/4 bg-gray-800 p-6 lg:p-8">
//                 {/* User Profile */}
//                 <div className="flex items-center space-x-4">
//                     <img
//                         src="https://via.placeholder.com/50"
//                         alt="User Avatar"
//                         className="w-12 h-12 rounded-full"
//                     />
//                     <div>
//                         <h2 className="text-lg font-semibold">Hey, ABCD</h2>
//                     </div>
//                 </div>

//                 {/* Navigation */}
//                 <nav className="mt-8">
//                     <ul className="space-y-4">
//                         <li
//                             className={`cursor-pointer ${filter === "ALL" ? "text-green-500 font-medium" : ""}`}
//                             onClick={() => setFilter("ALL")}
//                         >
//                             All Tasks
//                         </li>
//                         <li
//                             className={`cursor-pointer ${filter === "IMPORTANT" ? "text-green-500 font-medium" : ""}`}
//                             onClick={() => setFilter("IMPORTANT")}
//                         >
//                             Important
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* Add List and Summary */}
//                 <div className="mt-10">
//                     <button className="flex items-center space-x-2 text-green-500">
//                         <FaPlusCircle />
//                         <span>Add List</span>
//                     </button>

//                     <div className="mt-6">
//                         <h3 className="text-sm font-semibold">Today Tasks</h3>
//                         <div className="flex items-center justify-between mt-2">
//                             <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
//                                 <span className="text-lg font-bold">{tasks.filter(task => !task.completed).length}</span>
//                             </div>
//                             <div className="text-sm">
//                                 <p>Pending: {tasks.filter(task => !task.completed).length}</p>
//                                 <p>Done: {tasks.filter(task => task.completed).length}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handleLogout}
//                         className="mt-4 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 w-auto">
//                         Logout
//                     </button>
//                 </div>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-6 lg:p-8">
//                 {/* Add Task Input */}
//                 <div className="bg-gray-800 p-4 rounded-lg mb-8">
//                     <h3 className="text-lg font-medium mb-4">Add A Task</h3>
//                     <div className="flex items-center space-x-4">
//                         <input
//                             type="text"
//                             placeholder="Task name"
//                             value={newTask}
//                             onChange={(e) => setNewTask(e.target.value)}
//                             className="flex-1 p-2 bg-gray-900 text-white rounded-lg border border-gray-700"
//                         />
//                         <button
//                             onClick={handleAddTask}
//                             className="p-2 rounded-lg bg-green-600 hover:bg-green-500"
//                         >
//                             ADD TASK
//                         </button>
//                     </div>
//                 </div>

//                 {/* Task List */}
//                 <div className="space-y-8">
//                     <h3 className="text-lg font-semibold">To Do</h3>
//                     <ul className="space-y-4">
//                         {tasks
//                             .filter((task) => !task.completed)
//                             .map((task) => (
//                                 <li
//                                     key={task.id}
//                                     className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
//                                 >
//                                     <div className="flex items-center space-x-4">
//                                         <FiCircle
//                                             onClick={() => dispatch(toggleComplete(task.id))}
//                                             className="text-xl text-green-500 cursor-pointer"
//                                         />
//                                         <span>{task.name}</span>
//                                     </div>
//                                     <FaStar
//                                         className={`cursor-pointer ${task.priority === "high" ? "text-yellow-500" : "text-gray-400"}`}
//                                         onClick={() => dispatch(setPriority({ id: task.id, priority: "high" }))}
//                                     />
//                                 </li>
//                             ))}
//                     </ul>

//                     <h3 className="text-lg font-semibold mt-8">Completed</h3>
//                     <ul className="space-y-4">
//                         {tasks
//                             .filter((task) => task.completed)
//                             .map((task) => (
//                                 <li
//                                     key={task.id}
//                                     className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
//                                 >
//                                     <div className="flex items-center space-x-4">
//                                         <FaCheckCircle
//                                             onClick={() => dispatch(toggleComplete(task.id))}
//                                             className="text-xl text-green-500 cursor-pointer"
//                                         />
//                                         <span>{task.name}</span>
//                                     </div>
//                                     <button
//                                         onClick={() => dispatch(deleteTask(task.id))}
//                                         className="text-red-500 hover:text-red-400"
//                                     >
//                                         Delete
//                                     </button>
//                                 </li>
//                             ))}
//                     </ul>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Tasks;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, filterTasks } from "../features/tasksSlice";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { FaPlusCircle } from "react-icons/fa";

const Tasks = ({ setIsAuthenticated }) => {
    const tasks = useSelector((state) => state.tasks.filteredTasks);
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        dispatch(filterTasks(filter));
    }, [filter, dispatch]);

    useEffect(() => {
        const fetchWeather = async (city) => {
            try {
                const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setWeather({
                        temperature: data.main.temp,
                        description: data.weather[0].description,
                        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    });
                    setError("");
                } else {
                    setError("Failed to fetch weather data. Please check the city name.");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("An error occurred while fetching weather data.");
            }
        };

        if (location) {
            fetchWeather(location);
        }
    }, [location]);

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your API key
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                            // `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
                        );
                        if (response.ok) {
                            const data = await response.json();
                            setWeather({
                                temperature: data.main.temp,
                                description: data.weather[0].description,
                                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                            });
                            setLocation(data.name); // Update location based on geolocation
                            setError("");
                        } else {
                            setError("Failed to fetch weather data for your location.");
                        }
                    } catch (error) {
                        console.error("Error fetching geolocation weather data:", error);
                        setError("An error occurred while fetching weather data.");
                    }
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                    setError("Failed to detect location. Please allow location access.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    };

    const handleAddTask = () => {
        if (newTask.trim() === "") return;

        const task = {
            id: Date.now(),
            name: newTask,
            completed: false,
            priority: "low",
        };
        dispatch(addTask(task));
        setNewTask("");
    };

    const handleLogout = () => {
        // Remove authentication status from localStorage
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 bg-gray-800 p-6 lg:p-8">
                {/* Weather Section */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">Today's Weather</h3>
                    <div className="flex flex-col items-center mt-4">
                        {weather ? (
                            <>
                                <img src={weather.icon} alt="Weather Icon" className="w-16 h-16" />
                                <p className="text-xl">{weather.temperature}°C</p>
                                <p className="capitalize">{weather.description}</p>
                                <p className="mt-2 text-sm text-gray-400">{location}</p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-400">No weather data available</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2 text-gray-900 rounded-lg"
                        />
                        <button
                            onClick={handleGeolocation}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 w-full"
                        >
                            Detect My Location
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">Hey, ABCD</h2>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li
                            className={`cursor-pointer ${filter === "ALL" ? "text-green-500 font-medium" : ""}`}
                            onClick={() => setFilter("ALL")}
                        >
                            All Tasks
                        </li>
                        <li
                            className={`cursor-pointer ${filter === "IMPORTANT" ? "text-green-500 font-medium" : ""}`}
                            onClick={() => setFilter("IMPORTANT")}
                        >
                            Important
                        </li>
                    </ul>
                </nav>

                {/* Add List and Summary */}
                <div className="mt-10">
                    <button className="flex items-center space-x-2 text-green-500">
                        <FaPlusCircle />
                        <span>Add List</span>
                    </button>

                    <div className="mt-6">
                        <h3 className="text-sm font-semibold">Today Tasks</h3>
                        <div className="flex items-center justify-between mt-2">
                            <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                                <span className="text-lg font-bold">{tasks.filter((task) => !task.completed).length}</span>
                            </div>
                            <div className="text-sm">
                                <p>Pending: {tasks.filter((task) => !task.completed).length}</p>
                                <p>Done: {tasks.filter((task) => task.completed).length}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 w-auto"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-8">
                {/* Add Task Input */}
                <TaskInput handleAddTask={handleAddTask} newTask={newTask} setNewTask={setNewTask} />

                {/* Task List */}
                <TaskList tasks={tasks} />
            </main>
        </div>
    );
};

export default Tasks;
