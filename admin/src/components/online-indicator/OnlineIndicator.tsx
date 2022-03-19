import React from 'react';
import styled from "styled-components";
import { fucsiaGlowCss, fucsiaGradientCss, greenGlowCss, greenGradientCss } from "../primitives/colors";

export const StyledOnlineIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  ${greenGradientCss};
  ${greenGlowCss};
`;

export const StyledOfflineIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  
  ${fucsiaGradientCss};
  ${fucsiaGlowCss};
`;

