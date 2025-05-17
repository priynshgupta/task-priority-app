import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {darkMode ? <FiSun /> : <FiMoon />}
      <ToggleText>{darkMode ? 'Light Mode' : 'Dark Mode'}</ToggleText>
    </ToggleButton>
  );
};

const ToggleButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: var(--toggle-bg);
  color: var(--toggle-text);

  svg {
    font-size: 16px;
  }

  @media (max-width: 600px) {
    top: 15px;
    right: 15px;
    padding: 6px 10px;
  }
`;

const ToggleText = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`;

export default ThemeToggle;
