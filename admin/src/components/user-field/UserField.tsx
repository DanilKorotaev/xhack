import React from "react";
import {UserFieldInput, UserFieldWrapper} from "./UserFieldStyles";

export interface IUserFieldProps {
    className?: string;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;

    onChangeCallback?(e: any): void;
}

export const UserField: React.FC<IUserFieldProps> = (props) => {
    function onChangeHandler(e: any) {
        if (props.onChangeCallback !== undefined)
            props.onChangeCallback(e.target.value);
    }

    return (
        <UserFieldWrapper className={props.className} >
            <UserFieldInput type={props.type} value={props.value}
                            placeholder={props.placeholder} onChange={onChangeHandler}/>
        </UserFieldWrapper>
    );
}