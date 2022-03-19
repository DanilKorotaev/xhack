import React from "react";
import {CheckboxText, CheckboxWrapper, UserCheckbox} from "./UserFieldCheckboxStyles";

interface IUserCheckboxProps {
    className?: string;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    text: string;

    onChangeCallback?(e: any): void;
}

export const UserFieldCheckbox: React.FC<IUserCheckboxProps> = (props) => {
    function onChangeHandler(e: any) {
        if (props.onChangeCallback !== undefined)
            props.onChangeCallback(e.target.checked);
    }

    return (
        <CheckboxWrapper>
            <UserCheckbox type={props.type} value={props.value}
                          placeholder={props.placeholder} onInput={onChangeHandler}/>
            <CheckboxText>{props.text}</CheckboxText>
        </CheckboxWrapper>
    );
}