"use client";

import React, { useState } from "react";
import { Task } from "@/types/tasks";

interface TaskStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: string) => void;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ task, onStatusChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStatusClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div data-testid={`task-status-${task.id}`} className="relative inline-block">
      <div
        data-testid={`status-badge-${task.id}`}
        className={`px-3 py-1 text-white font-medium rounded cursor-pointer ${
          task.status === "DONE" ? "bg-green-500" : "bg-gray-500"
        }`}
        onClick={handleStatusClick}
      >
        {task.status}
      </div>
      {isDropdownOpen && (
        <div className="absolute mt-1 bg-white border rounded shadow-md">
          {task.status === "TODO" && (
            <button
              data-testid={`dropdown-done-${task.id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleStatusChange("DONE")}
            >
              DONE
            </button>
          )}
          {task.status === "DONE" && (
            <button
              data-testid={`dropdown-todo-${task.id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleStatusChange("TODO")}
            >
              TODO
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskStatus;