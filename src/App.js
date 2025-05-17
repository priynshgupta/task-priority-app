import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TaskProvider } from './contexts/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Summary from './components/Summary';

function App() {
  return (
    <TaskProvider>
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
  );
}

const AppContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f5f7ff 0%, #f0f4ff 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
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
  color: #777;
  font-size: 14px;
`;

export default App;
