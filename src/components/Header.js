import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <FiCheckCircle />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          TaskPriority
        </motion.div>
      </Logo>
      <SubTitle>Organize. Prioritize. Progress.</SubTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  padding: 20px 0;
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0;

  svg {
    font-size: 36px;
  }
`;

const SubTitle = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  margin: 8px 0 0;
`;

export default Header;
