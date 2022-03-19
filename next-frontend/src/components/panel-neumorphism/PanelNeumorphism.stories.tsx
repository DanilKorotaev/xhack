import React from "react";
import styled from "styled-components";
import { SPanelNeumorphism } from "./PanelNeumorphism";
import { coolRed } from "../../theme/dark/colors/coolRed";
import { Switch } from "monsters-ui/lib/components/switch";
import {GlobalStyles} from "../globalStyles";

const NeumorphismSquare = styled(SPanelNeumorphism)`
  width: 200px;
  height: 200px;
`;

export default {
  title: "Components/SPanelNeumorphism",
  component: SPanelNeumorphism,
};

export const PanelNeumorphismMain = () => (
  <>
    <GlobalStyles />
    <Switch/>
    <NeumorphismSquare />
  </>
);

const Color = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  
  ${coolRed}
`;

export const CoolRedColor = () => (
  <>
    <GlobalStyles />
    <Color />
  </>
);
