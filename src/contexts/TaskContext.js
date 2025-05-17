import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TaskContext = createContext();

const LOCAL_STORAGE_KEY = 'taskManager.tasks';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (title, description, priority) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      priority, // 'high', 'medium', 'low'
      completed: false,
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
          progress: task.completed ? task.progress : 100
        };
      }
      return task;
    }));
  };

  // Update task progress
  const updateProgress = (id, progress) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const completed = progress >= 100;
        return {
          ...task,
          progress: Math.min(Math.max(0, progress), 100), // Clamp between 0-100
          completed: completed,
        };
      }
      return task;
    }));
  };

  // Update task details
  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      deleteTask,
      toggleComplete,
      updateProgress,
      updateTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};
