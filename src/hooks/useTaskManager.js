import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const useTaskManager = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskManager must be used within a TaskProvider');
  }

  return context;
};

export default useTaskManager;
