import styled from 'styled-components';

export const Button = styled.button`
  padding: 8px 20px;
  box-sizing: border-box;
  border: 0;
  border-radius: 11px;

  background-color: #373737;

  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 600;

  :hover {
    background-color: #323232;
  }

  :active {
    background-color: #292929;
  }

  :focus {
    outline: none;

    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: #0148ff;
  box-shadow: 0px -4px 20px rgba(0, 209, 255, 0.25);

  :hover {
    background-color: #003ddb;
  }

  :active {
    background-color: #0035bc;
  }

  :focus {
    outline: none;

    box-shadow: 0 0 0 4px rgba(200, 200, 255, 0.4);
  }
`;

export const LinkButton = styled.button`
  box-sizing: border-box;
  border: none;
  
  background-color: transparent;
  
  color: #00FFFF;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 900;
  
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
  
  :focus {
    outline: none;
    color: white;
    text-decoration: underline;
  }
  
  :active {
    color: white;
  }
`;
