import { fucsiaGlowCss, fucsiaGradientCss } from "../primitives/colors";
import styled from "styled-components";

export const Tags = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;

  list-style: none;
  padding: 0;
  
  & > * {
    margin-left: 10px;
  }
`;

export const Tag = styled.li`
  font-size: 16px;
  padding: 2px 15px;
  box-sizing: border-box;
  border-radius: 38px;

  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  
  ${fucsiaGradientCss};
  ${fucsiaGlowCss};
`;
