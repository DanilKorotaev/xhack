import styled from 'styled-components';

export const StyledInputWithIconLabel = styled.label`
  position: relative;

  display: block;

  width: 317px;
  height: 31px;
  border-radius: 10px;
  box-sizing: border-box;

  background-color: black;
`;

export const StyledInputWithIconInput = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 0;
  
  background-color: transparent;

  color: white;
  font-size: 15px;
  
  transition: box-shadow 0.1s;
  
  :focus {
    outline: none;

    box-shadow: 0 0 0 2px rgba(3,73,255,1), 0px -4px 20px rgba(0, 209, 255, 0.25);
  }
`;

export const StyledInputWithIconInputCentered = styled(StyledInputWithIconInput)`
  padding-left: 0;

  text-align: center;
`;

export const StyledInputWithIconIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);

  color: white;
  font-size: 15px;
`;
