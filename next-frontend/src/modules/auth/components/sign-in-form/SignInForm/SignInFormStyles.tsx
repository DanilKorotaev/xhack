import styled from "styled-components";
import {LinkButton} from "../../../../../components/buttons/Button";

export const StyledSignInFormLogo = styled.img`
  width: 163px;
  height: 188px;
`;

export const StyledSignInFormTitle = styled.h1`
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 200;
  font-size: 36px;
  text-align: center;
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  
  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export const StyledButtonsSlotWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const ForgotPasswordButton = styled(LinkButton)`
  font-size: 12px;
`;

export const FormErrorField = styled.span`
  display: block;
  
  width: 100%;

  color: #ff0076;
  font-size: 12px;
  text-align: center;
`;
