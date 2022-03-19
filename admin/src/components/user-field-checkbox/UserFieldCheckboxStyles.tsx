import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  width: 317px;
  height: 31px;

  //background: rgba(0, 0, 0, 0.62);
  box-shadow: 0 4px 36px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(49px);

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: center;
`;

export const UserCheckbox = styled.input`
  justify-self: flex-start;
  align-self: center;

  width: 20px;
  height: 20px;

  margin: 0 0 0 30px;
`;

export const CheckboxText = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
  
  padding-left: 10px;
  
  color: #E2E2E2;
`;