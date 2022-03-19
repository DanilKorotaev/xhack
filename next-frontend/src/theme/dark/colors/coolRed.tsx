import { css } from "styled-components";

export const coolRedColor = css`box-shadow: 0px -2px 20px rgba(255, 1, 136, 0.37), 0px 4px 9px rgba(255, 0, 46, 0.19);`;
export const coolRedGlow = css`background: linear-gradient(108.47deg, #FF0099 -12.37%, #FF003D 97.29%);`;

export const coolRed = css`
  ${coolRedColor};
  ${coolRedGlow};
`;
