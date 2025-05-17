import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import TaskItem from './TaskItem';
import useTaskManager from '../hooks/useTaskManager';
import useTheme from '../hooks/useTheme';

const TaskList = () => {
  const { tasks } = useTaskManager();
  const { darkMode } = useTheme();
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
              color="var(--accent-color)"
              onClick={() => setPriorityFilter('all')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              All Priorities
            </PriorityFilterButton>
            <PriorityFilterButton
              active={priorityFilter === 'high'}
              color="var(--task-high)"
              onClick={() => setPriorityFilter('high')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              High
            </PriorityFilterButton>
            <PriorityFilterButton
              active={priorityFilter === 'medium'}
              color="var(--task-medium)"
              onClick={() => setPriorityFilter('medium')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Medium
            </PriorityFilterButton>
            <PriorityFilterButton
              active={priorityFilter === 'low'}
              color="var(--task-low)"
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
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TaskCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  background: var(--filter-bg);
  color: var(--accent-color);
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
  color: var(--text-secondary);
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? 'var(--filter-active-bg)' : 'var(--filter-bg)'};
  color: ${props => props.active ? 'var(--filter-active-text)' : 'var(--filter-text)'};
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
  color: ${props => props.active ? 'var(--card-bg)' : props.color};
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
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-color);
`;

const EmptyText = styled.h3`
  margin: 0 0 8px 0;
  color: var(--text-primary);
  font-size: 18px;
`;

const EmptySubtext = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
`;

export default TaskList;
