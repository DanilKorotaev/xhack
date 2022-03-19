import styled from "styled-components";
import ArrowIcon from "./ArrowIcon";

export const HackathonListItemWrapper = styled.article`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: stretch;
  
  width: 568px;
  height: 172px;
  padding: 16px;
  border-radius: 25px;
  box-sizing: border-box;

  background: #1A1A1A;
  /* skeuomorphism */
  box-shadow: -6px -11px 15px -5px rgba(255, 255, 255, 0.03), 5px 10px 15px rgba(0, 0, 0, 0.15);
`;

export const FirstRow = styled.div`
  position: relative;
  
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
  
  width: 100%;
  height: 76px;
`;

export const HackImage = styled.img`
  width: 119px;
  height: 76px;
  border-radius: 15px;
`;

export const HackInfo = styled.div`
  position: relative;
  
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  
  width: 100%;
  margin-left: 18px;
  box-sizing: border-box;
`;

export const HackTitle = styled.h1`
  color: white;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
`;

export const DescriptionRow = styled.div`
  color: rgba(255, 255, 255, 0.75);
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 155%;
`;

export const StyledArrowIcon = styled(ArrowIcon)`
  position: absolute;
  top: 35px;
  right: 20px;
  
  cursor: pointer;
  
  :hover {
    color: white;
  }
`;
