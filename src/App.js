import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Summary from './components/Summary';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeToggle />
          <Header />
          <ContentWrapper>
            <Summary />
            <TaskForm />
            <TaskList />
          </ContentWrapper>
          <Footer>
            <p>© {new Date().getFullYear()} TaskPriority App | Made with 💙 for CodeCircuit Hackathon</p>
          </Footer>
        </AppContainer>
      </TaskProvider>
    </ThemeProvider>
  );
}

const AppContainer = styled(motion.div)`
  min-height: 100vh;
  background: var(--background);
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentWrapper = styled.main`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0;
  color: var(--text-secondary);
  font-size: 14px;
`;

export default App;
