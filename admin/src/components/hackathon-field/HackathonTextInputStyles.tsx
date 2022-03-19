import styled from "styled-components";
import DefaultTextInput from "../inputs/DefaultTextInput";

export const HackathonTextInputWrapper = styled.div`
  width: 317px;
  height: 31px;
  box-sizing: border-box;

  //background: rgba(0, 0, 0, 0.62);
  box-shadow: 0 4px 36px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(49px);
`;

export const HackathonTextInputStyled = styled(DefaultTextInput)`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  box-sizing: border-box;

  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid #FF0099;

  background-color: transparent;

  color: white;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;

  :focus {
    outline: none;
  }
`;