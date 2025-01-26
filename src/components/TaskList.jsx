import React from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTask, setPriority } from "../features/tasksSlice";

const TaskList = ({ tasks }) => {
    const dispatch = useDispatch();

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-semibold">To Do</h3>
            <ul className="space-y-4">
                {tasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <FiCircle
                                    onClick={() => dispatch(toggleComplete(task.id))}
                                    className="text-xl text-green-500 cursor-pointer"
                                />
                                <span>{task.name}</span>
                            </div>
                            <FaStar
                                className={`cursor-pointer ${task.priority === "high" ? "text-yellow-500" : "text-gray-400"}`}
                                onClick={() => dispatch(setPriority({ id: task.id, priority: "high" }))}
                            />
                        </li>
                    ))}
            </ul>

            <h3 className="text-lg font-semibold mt-8">Completed</h3>
            <ul className="space-y-4">
                {tasks
                    .filter((task) => task.completed)
                    .map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <FaCheckCircle
                                    onClick={() => dispatch(toggleComplete(task.id))}
                                    className="text-xl text-green-500 cursor-pointer"
                                />
                                <span>{task.name}</span>
                            </div>
                            <button
                                onClick={() => dispatch(deleteTask(task.id))}
                                className="text-red-500 hover:text-red-400"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TaskList;
