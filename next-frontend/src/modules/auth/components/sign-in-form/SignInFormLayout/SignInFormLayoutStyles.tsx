import styled from "styled-components";

export const StyledSignInFormLayout = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  
  max-width: 317px;

  transition: height linear .15s;
`;

export const StyledSignInFormLogoSlotWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const StyledSignInFormFieldsSlotWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  
  & > * {
    margin-bottom: 19px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const StyledSignInFormButtonsSlotWrapper = styled.div`

`;
