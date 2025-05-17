import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import useTaskManager from '../hooks/useTaskManager';
import useTheme from '../hooks/useTheme';

const TaskForm = () => {
  const { addTask } = useTaskManager();
  const { darkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, description, priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  return (
    <FormContainer>
      <AddButtonWrapper>
        <AddButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FiPlus />
          <span>Add Task</span>
        </AddButton>
      </AddButtonWrapper>

      {isExpanded && (
        <StyledForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FormGroup>
            <Label>Task Title</Label>
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              placeholder="Add details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </FormGroup>

          <FormGroup>
            <Label>Priority</Label>
            <PrioritySelector>
              <PriorityOption
                selected={priority === 'low'}
                color="#47A992"
                onClick={() => setPriority('low')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Low
              </PriorityOption>
              <PriorityOption
                selected={priority === 'medium'}
                color="#F3AA60"
                onClick={() => setPriority('medium')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Medium
              </PriorityOption>
              <PriorityOption
                selected={priority === 'high'}
                color="#D04848"
                onClick={() => setPriority('high')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                High
              </PriorityOption>
            </PrioritySelector>
          </FormGroup>

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={() => setIsExpanded(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </CancelButton>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!title.trim()}
            >
              Add Task
            </SubmitButton>
          </ButtonGroup>
        </StyledForm>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const AddButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(67, 97, 238, 0.2);

  svg {
    font-size: 20px;
  }
`;

const StyledForm = styled(motion.form)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 16px var(--shadow-color);
  margin-bottom: 20px;
  overflow: hidden;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  background-color: var(--card-bg);
  color: var(--text-primary);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1);
  }
`;

const PrioritySelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const PriorityOption = styled(motion.button)`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.selected ? props.color : 'var(--filter-bg)'};
  color: ${props => props.selected ? '#fff' : 'var(--text-primary)'};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: ${props => props.selected ? `0 4px 8px var(--shadow-color)` : 'none'};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const CancelButton = styled(motion.button)`
  background: transparent;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
`;

const SubmitButton = styled(motion.button)`
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 6px var(--shadow-color);
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

export default TaskForm;
