import React, { useState } from "react";

const TaskInput = ({ handleAddTask, newTask, setNewTask }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-4">Add A Task</h3>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Task name"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 p-2 bg-gray-900 text-white rounded-lg border border-gray-700"
                />
                <button
                    onClick={handleAddTask}
                    className="p-2 rounded-lg bg-green-600 hover:bg-green-500"
                >
                    ADD TASK
                </button>
            </div>
        </div>
    );
};

export default TaskInput;
