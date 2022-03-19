import React from "react";
import {HackathonTextInputWrapper, HackathonTextInputStyled} from "./HackathonTextInputStyles";

export interface IHackathonTextInputProps {
    name: string;
    value: string;
    placeholder: string;

    onChange(e: any): void;
}

export const HackathonTextInput: React.FC<IHackathonTextInputProps> = (props) => {
    return (
        <HackathonTextInputWrapper>
            <HackathonTextInputStyled {...props}/>
        </HackathonTextInputWrapper>
    );
}