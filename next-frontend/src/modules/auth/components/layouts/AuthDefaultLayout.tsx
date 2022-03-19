import React from 'react';
import styled from 'styled-components';

const StyledAuthDefaultLayoutWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  
  width: 100vw;
  height: 100vh;
`;

export interface IAuthDefaultLayoutProps {

}

export const AuthDefaultLayout: React.FC<IAuthDefaultLayoutProps> = ({ children }) => {
  return (
    <StyledAuthDefaultLayoutWrapper>
      {children}
    </StyledAuthDefaultLayoutWrapper>
  );
};

export default AuthDefaultLayout;
