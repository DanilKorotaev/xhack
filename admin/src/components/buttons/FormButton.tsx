import React from "react";
import styled from "styled-components";

const FormButtonBase = styled.button`
  width: 150px;
  height: 28px;

  border-radius: 15px;
  border: none;

  color: white;

  outline: none;

  &.cancel {
    background-color: #373737;

    :hover {
      background: #303030;
    }
  }

  &.confirm {
    background: #0148FF;

    :hover {
      background: #0138df
    }
  }
`;

export interface IFormButtonProps {
    className?: string;

    onClick?(e: any): void;
}

export const FormButton: React.FC<IFormButtonProps> = (props) => {
    function onButtonClickHandler(e: any) {
        e.preventDefault();
        if (props.onClick !== undefined) {
            props.onClick(e);
        }
    }

    return (
        <FormButtonBase className={props.className}
                        onClick={onButtonClickHandler}>{props.children}</FormButtonBase>);
}