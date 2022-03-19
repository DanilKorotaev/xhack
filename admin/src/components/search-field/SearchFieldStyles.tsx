import styled from "styled-components";
import SearchIcon from "./SearchIcon";

export const StyledSearchFieldWrapper = styled.div`
  position: relative;
  
  width: 317px;
  height: 31px;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.62);
  box-shadow: 0px 4px 36px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(49px);

  border-radius: 10px;
`;

export const StyledSearchField = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  box-sizing: border-box;
  border: none;

  background-color: transparent;

  color: white;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 13px;
  
  :focus {
    outline: none;
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: 15px;
  
  transform: translateY(-50%);
`;
