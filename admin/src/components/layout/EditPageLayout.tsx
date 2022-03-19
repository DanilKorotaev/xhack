import React from 'react';
import {PageTitle} from "../typography/PageTitle";
import {Rectangle} from './Rectangle';
import styled from "styled-components";

const EditPageLayoutWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-content: flex-start;

  padding: 20px 30px;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  align-self: center;
  justify-self: center;
  
  height: 600px;
  width: 300px;
`;

export interface IEditPageLayoutProps {
    titleSlot: React.ReactNode;
    contentSlot: React.ReactNode;
}

export const EditPageLayout: React.FC<IEditPageLayoutProps> = (props) => {
    return (
        <EditPageLayoutWrapper>
            <PageTitle>{props.titleSlot}</PageTitle>
            <Rectangle height={40}/>
            <EditWrapper>{props.contentSlot}</EditWrapper>
        </EditPageLayoutWrapper>
    );
}

export default EditPageLayout;