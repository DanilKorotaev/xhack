import React from 'react';

export interface IDefaultTextInputProps {
    name: string;
    value: string;
    placeholder: string;
    onChange(event: any): void;
}


const DefaultTextInput: React.FC<IDefaultTextInputProps> = (props) => {
    function onChangeHandler(event: any) {
        if (props.onChange !== null)
            props.onChange(event.target.value);
    }

    return (
        <input type={"text"} {...props} onChange={onChangeHandler}/>);
}

export default DefaultTextInput;