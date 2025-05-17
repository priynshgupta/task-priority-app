import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import TaskItem from './TaskItem';
import useTaskManager from '../hooks/useTaskManager';

const TaskList = () => {
  const { tasks } = useTaskManager();
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [priorityFilter, setPriorityFilter] = useState('all'); // all, high, medium, low

  const filteredTasks = tasks.filter(task => {
    // First filter by completion status
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;

    // Then filter by priority
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    return true;
  });

  // Sort tasks: high priority first, then by completion status (incomplete first)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ListContainer>
      <ListHeader>
        <Title>My Tasks <TaskCount>{filteredTasks.length}</TaskCount></Title>
        <FilterSection>
          <FilterIcon>
            <FiFilter />
          </FilterIcon>
          <FilterButtons>
            <FilterButton
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              All
            </FilterButton>
            <FilterButton
              active={filter === 'active'}
              onClick={() => setFilter('active')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Active
            </FilterButton>
            <FilterButton
              active={filter === 'completed'}
              onClick={() => setFilter('completed')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Completed
            </FilterButton>
          </FilterButtons>
        </FilterSection>
        <PriorityFilterSection>
          <PriorityFilterButtons>
            <PriorityFilterButton
              active={priorityFilter === 'all'}
              color="#4361EE"
              onClick={() => setPriorityFilter('all')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              All Priorities
            </PriorityFilterButton>
            <PriorityFilterButton
              active={priorityFilter === 'high'}
              color="#D04848"
              onClick={() => setPriorityFilter('high')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              High
            </PriorityFilterButton>
            <PriorityFilterButton
              active={priorityFilter === 'medium'}
              color="#F3AA60"
              onClick={() => setPriorityFilter('medium')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Medium
            </PriorityFilterButton>
            <PriorityFilterButton
              active={priorityFilter === 'low'}
              color="#47A992"
              onClick={() => setPriorityFilter('low')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Low
            </PriorityFilterButton>
          </PriorityFilterButtons>
        </PriorityFilterSection>
      </ListHeader>

      <AnimatePresence>
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <EmptyState
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <EmptyText>No tasks found</EmptyText>
            <EmptySubtext>
              {filter !== 'all' || priorityFilter !== 'all'
                ? 'Try changing your filters'
                : 'Add your first task using the button above'}
            </EmptySubtext>
          </EmptyState>
        )}
      </AnimatePresence>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
`;

const ListHeader = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0 0 16px 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TaskCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  background: #f0f4ff;
  color: #4361EE;
  padding: 4px 8px;
  border-radius: 12px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const FilterIcon = styled.div`
  margin-right: 12px;
  color: #777;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? '#4361EE' : '#f0f4ff'};
  color: ${props => props.active ? 'white' : '#4361EE'};
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const PriorityFilterSection = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const PriorityFilterButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const PriorityFilterButton = styled(motion.button)`
  background: ${props => props.active ? props.color : 'transparent'};
  color: ${props => props.active ? 'white' : props.color};
  border: 1px solid ${props => props.color};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  background: #f9f9f9;
  border-radius: 12px;
`;

const EmptyText = styled.h3`
  margin: 0 0 8px 0;
  color: #555;
  font-size: 18px;
`;

const EmptySubtext = styled.p`
  margin: 0;
  color: #888;
  font-size: 14px;
`;

export default TaskList;
