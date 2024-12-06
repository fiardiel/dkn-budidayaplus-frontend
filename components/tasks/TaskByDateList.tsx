'use client';

import React, { useEffect, useState } from 'react';
import { Task } from "@/types/tasks";
import { fetchTaskByDate } from "@/lib/tasks/fetchTaskByDate";
import TaskByDateCard from './TaskByDateCard';

const TaskByDateList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTaskByDate();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  if (loading) {
    return <p className='text-start w-[80%]'>Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className='text-start w-[80%]'>Tidak ada tugas untuk hari ini.</p>;
  }

  return (
    <div className="w-[80%] flex flex-wrap gap-4">
      {tasks.map((task) => (
        <TaskByDateCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskByDateList;
