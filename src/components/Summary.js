import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiFlag } from 'react-icons/fi';
import useTaskManager from '../hooks/useTaskManager';
import useTheme from '../hooks/useTheme';

const Summary = () => {
  const { tasks } = useTaskManager();
  const { darkMode } = useTheme();

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const high = tasks.filter(task => task.priority === 'high' && !task.completed).length;

    // Calculate overall progress
    const totalProgressPoints = tasks.reduce((sum, task) => sum + task.progress, 0);
    const overallProgress = total > 0 ? Math.round(totalProgressPoints / total) : 0;

    return {
      total,
      completed,
      active: total - completed,
      high,
      overallProgress
    };
  }, [tasks]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SummaryContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StatCard variants={itemVariants}>
        <StatIcon className="progress">
          <FiClock />
        </StatIcon>
        <StatInfo>
          <StatLabel>Overall Progress</StatLabel>
          <ProgressBarContainer>
            <ProgressBar>
              <ProgressFill style={{ width: `${stats.overallProgress}%` }} />
            </ProgressBar>
            <ProgressText>{stats.overallProgress}%</ProgressText>
          </ProgressBarContainer>
        </StatInfo>
      </StatCard>

      <StatCard variants={itemVariants}>
        <StatIcon className="completed">
          <FiCheckCircle />
        </StatIcon>
        <StatInfo>
          <StatLabel>Completed</StatLabel>
          <StatValue>
            {stats.completed}
            <StatTotal>/{stats.total}</StatTotal>
          </StatValue>
        </StatInfo>
      </StatCard>

      <StatCard variants={itemVariants}>
        <StatIcon className="high">
          <FiFlag />
        </StatIcon>
        <StatInfo>
          <StatLabel>High Priority</StatLabel>
          <StatValue>
            {stats.high}
            <StatTotal> pending</StatTotal>
          </StatValue>
        </StatInfo>
      </StatCard>
    </SummaryContainer>
  );
};

const SummaryContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 32px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px var(--shadow-color);
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;

  &.progress {
    background-color: var(--filter-bg);
    color: var(--accent-color);
  }

  &.completed {
    background-color: #e3f9ee;
    color: var(--completed-color);
  }

  &.high {
    background-color: #fdeeee;
    color: var(--task-high);
  }
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatLabel = styled.p`
  margin: 0 0 8px 0;
  color: var(--text-secondary);
  font-size: 14px;
`;

const StatValue = styled.h3`
  font-size: 24px;
  margin: 0;
  color: var(--text-primary);
  display: flex;
  align-items: baseline;
`;

const StatTotal = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
  margin-left: 4px;
  font-weight: normal;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--accent-color);
  transition: width 1s ease-out;
`;

const ProgressText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 40px;
`;

export default Summary;
