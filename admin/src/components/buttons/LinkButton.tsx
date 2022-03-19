import styled from 'styled-components';

export const LinkButton = styled.button`
  border: none;

  background: none;

  color: #0CC5FF;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  cursor: pointer;

  :hover {
    color: #50d3ff;
  }
  
  :active {
    outline: none;
    color: red;
  }
  
  :focus {
    outline: none;
  }
`;
