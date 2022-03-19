import React from 'react';
import styled from 'styled-components';

const DefaultPageLayoutWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  
  padding: 40px;
`;

const DefaultPageLayoutNavSlot = styled.div`
  margin-right: 150px;
`;

const DefaultPageLayoutContentWrapper = styled.div`

`;

const DefaultPageLayoutTitleSlot = styled.div`

`;

const DefaultPageLayoutContentSlot = styled.div`

`;

export interface IDefaultPageLayoutProps {
  navSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  contentSlot: React.ReactNode;
}

export const DefaultPageLayout: React.FC<IDefaultPageLayoutProps> = ({ navSlot, titleSlot, contentSlot }) => {
  return (
    <DefaultPageLayoutWrapper>
      <DefaultPageLayoutNavSlot>
        {navSlot}
      </DefaultPageLayoutNavSlot>
      <DefaultPageLayoutContentWrapper>
        <DefaultPageLayoutTitleSlot>
          {titleSlot}
        </DefaultPageLayoutTitleSlot>
        <DefaultPageLayoutContentSlot>
          {contentSlot}
        </DefaultPageLayoutContentSlot>
      </DefaultPageLayoutContentWrapper>
    </DefaultPageLayoutWrapper>
  );
};

export default DefaultPageLayout;
