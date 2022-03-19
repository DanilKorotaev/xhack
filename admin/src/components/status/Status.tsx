import React from 'react';
import styled from 'styled-components';
import { StyledOnlineIndicator } from "../online-indicator/OnlineIndicator";
import { Rectangle } from "../layout/Rectangle";

const StatusWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const StatusText = styled.p`
  color: white;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;

export interface IStatusProps {
  text: string;
}

export const Status: React.FC<IStatusProps> = ({ text }) => {
  return (
    <StatusWrapper>
      <StyledOnlineIndicator />
      <Rectangle width={6} />
      <StatusText>{text}</StatusText>
    </StatusWrapper>
  )
};

export default Status;
