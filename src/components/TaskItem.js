import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiTrash, FiEdit2, FiChevronDown } from 'react-icons/fi';
import useTaskManager from '../hooks/useTaskManager';
import useTheme from '../hooks/useTheme';

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete, updateProgress, updateTask } = useTaskManager();
  const { darkMode } = useTheme();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedProgress, setEditedProgress] = useState(task.progress);
  const priorityColors = {
    low: 'var(--task-low)',
    medium: 'var(--task-medium)',
    high: 'var(--task-high)'
  };

  const handleProgressChange = (e) => {
    const newProgress = Number(e.target.value);
    setEditedProgress(newProgress);
    updateProgress(task.id, newProgress);
  };

  const handleEditSubmit = () => {
    updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority
    });
    setIsEditing(false);
  };

  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible);

  return (
    <TaskContainer
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      completed={task.completed}
      priority={task.priority}
    >
      <TaskHeader>
        <LeftSection>
          <Checkbox
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleComplete(task.id)}
            completed={task.completed}
          >
            {task.completed && <FiCheck />}
          </Checkbox>

          {isEditing ? (
            <TitleInput
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <Title completed={task.completed} onClick={() => toggleComplete(task.id)}>
              {task.title}
            </Title>
          )}
        </LeftSection>

        <RightSection>
          {!isEditing && (
            <PriorityBadge color={priorityColors[task.priority]}>
              {task.priority}
            </PriorityBadge>
          )}

          {!isEditing ? (
            <>
              <ActionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
              >
                <FiEdit2 />
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTask(task.id)}
              >
                <FiTrash />
              </ActionButton>
            </>
          ) : (
            <ActionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEditSubmit}
            >
              <FiCheck />
            </ActionButton>
          )}

          <ToggleButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDetails}
            $rotated={isDetailsVisible}
          >
            <FiChevronDown />
          </ToggleButton>
        </RightSection>
      </TaskHeader>

      <ProgressContainer>
        <ProgressBar>
          <ProgressFill
            style={{ width: `${task.progress}%` }}
            priority={task.priority}
          />
        </ProgressBar>
        <ProgressText>{task.progress}%</ProgressText>
      </ProgressContainer>

      <AnimatePresence>
        {isDetailsVisible && (
          <DetailsSection
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isEditing ? (
              <>
                <DetailGroup>
                  <DetailLabel>Description:</DetailLabel>
                  <TextAreaInput
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows="3"
                  />
                </DetailGroup>
                <DetailGroup>
                  <DetailLabel>Priority:</DetailLabel>
                  <PrioritySelector>
                    <PriorityOption
                      selected={editedPriority === 'low'}
                      color={priorityColors.low}
                      onClick={() => setEditedPriority('low')}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      Low
                    </PriorityOption>
                    <PriorityOption
                      selected={editedPriority === 'medium'}
                      color={priorityColors.medium}
                      onClick={() => setEditedPriority('medium')}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      Medium
                    </PriorityOption>
                    <PriorityOption
                      selected={editedPriority === 'high'}
                      color={priorityColors.high}
                      onClick={() => setEditedPriority('high')}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      High
                    </PriorityOption>
                  </PrioritySelector>
                </DetailGroup>
              </>
            ) : (
              task.description && (
                <DetailGroup>
                  <DetailLabel>Description:</DetailLabel>
                  <Description>{task.description}</Description>
                </DetailGroup>
              )
            )}

            <DetailGroup>
              <DetailLabel>Progress:</DetailLabel>
              <ProgressSlider
                type="range"
                min="0"
                max="100"
                value={editedProgress}
                onChange={handleProgressChange}
                priority={task.priority}
              />
            </DetailGroup>

            <DetailGroup>
              <DetailLabel>Created:</DetailLabel>
              <DateInfo>{new Date(task.createdAt).toLocaleDateString()} at {new Date(task.createdAt).toLocaleTimeString()}</DateInfo>
            </DetailGroup>
          </DetailsSection>
        )}
      </AnimatePresence>
    </TaskContainer>
  );
};

const TaskContainer = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px var(--shadow-color);
  border-left: 4px solid ${props => {
    if (props.completed) return 'var(--completed-color)';
    switch(props.priority) {
      case 'high': return 'var(--task-high)';
      case 'medium': return 'var(--task-medium)';
      case 'low': return 'var(--task-low)';
      default: return 'var(--accent-color)';
    }
  }};
  opacity: ${props => props.completed ? 0.7 : 1};
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid ${props => props.completed ? 'var(--completed-color)' : 'var(--border-color)'};
  background: ${props => props.completed ? 'var(--completed-color)' : 'var(--card-bg)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  flex-shrink: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
  cursor: pointer;
`;

const TitleInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  background-color: var(--card-bg);
  color: var(--text-primary);
`;

const PriorityBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  color: white;
  background-color: ${props => props.color};
`;

const ActionButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7ff;
  border: none;
  cursor: pointer;
  color: #4361ee;
`;

const ToggleButton = styled(ActionButton)`
  svg {
    transform: ${props => props.$rotated ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.3s ease;
  }
`;

const ProgressContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  transition: width 0.3s ease-out;
  background-color: ${props => {
    switch(props.priority) {
      case 'high': return '#D04848';
      case 'medium': return '#F3AA60';
      case 'low': return '#47A992';
      default: return '#4361EE';
    }
  }};
`;

const ProgressText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #777;
  min-width: 40px;
  text-align: right;
`;

const DetailsSection = styled(motion.div)`
  margin-top: 16px;
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
  overflow: hidden;
`;

const DetailGroup = styled.div`
  margin-bottom: 12px;
`;

const DetailLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #777;
  margin-bottom: 4px;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
`;

const PrioritySelector = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const PriorityOption = styled(motion.button)`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.selected ? props.color : '#f5f5f5'};
  color: ${props => props.selected ? '#fff' : '#333'};
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s ease;
`;

const ProgressSlider = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #f0f0f0;
  border-radius: 3px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background-color: ${props => {
      switch(props.priority) {
        case 'high': return '#D04848';
        case 'medium': return '#F3AA60';
        case 'low': return '#47A992';
        default: return '#4361EE';
      }
    }};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const DateInfo = styled.span`
  font-size: 13px;
  color: #777;
`;

export default TaskItem;
