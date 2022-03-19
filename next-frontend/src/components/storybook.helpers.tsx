import {createGlobalStyle} from "styled-components";
import React from "react";
import {GlobalStyles} from "./globalStyles";

export const withGlobalStyles = <T extends {}>(Child: React.FC<T>): React.FC<T> => {
  return (props) => {
    return <>
      <GlobalStyles />
      <Child {...props} />
    </>
  }
}
